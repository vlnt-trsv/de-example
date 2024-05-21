const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

// Функция для генерации уникального идентификатора длиной 11 чисел
const generateId = () => {
  const timestamp = Date.now().toString(); // Время в миллисекундах
  const randomPart = Math.floor(Math.random() * 100)
    .toString()
    .padStart(6, "0"); // Случайное число от 0 до 999999, дополненное нулями
  return timestamp.slice(-2) + randomPart; // Берем последние 5 цифр времени и добавляем случайное число
};

////////////////////////////////////////////////////////////
////////////////////   CONFIG   ////////////////////////////
////////////////////////////////////////////////////////////

app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "avoska",
  password: "root",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Включение CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

////////////////////////////////////////////////////////////
////////////////////   START GET REQUESTS   ////////////////
////////////////////////////////////////////////////////////

app.get("/api/users", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM `user`");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/user/:id_user", async (req, res) => {
  const { id_user } = req.params;
  try {
    const [results] = await db.query("SELECT * FROM `user` WHERE id = ?", [
      id_user,
    ]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM `order`");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/orders/:id_user", async (req, res) => {
  const { id_user } = req.params;
  try {
    const [results] = await db.query(
      "SELECT * FROM `order` WHERE id_user = ?",
      [id_user]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM `product`");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/status", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM `status`");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

////////////////////////////////////////////////////////////
////////////////////   START POST REQUESTS   ///////////////
////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////// Маршрут для входа
app.post("/api/login", async (req, res) => {
  const { login, password } = req.body;

  // Проверка, что все поля переданы
  if (!login || !password) {
    return res
      .status(400)
      .json({ message: "Пожалуйста, введите логин и пароль" });
  }

  try {
    // Поиск пользователя по логину
    const [results] = await db.query("SELECT * FROM user WHERE login = ?", [
      login,
    ]);

    // Проверка, существует ли пользователь
    if (results.length === 0) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким логином не найден" });
    }

    const user = results[0];

    // // Проверка пароля
    // const isPasswordValid = bcrypt.compareSync(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(400).json({ message: "Неверный логин или пароль" });
    // }

    // JWT Токен
    const token = jwt.sign(
      { id: user.id, role: user.id_role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//////////////////////////////////////////////////////////// Маршрут для регистрации
app.post("/api/register", async (req, res) => {
  const { login, password, full_name, phone, email } = req.body;

  // Проверка, что все поля переданы
  if (!login || !password || !full_name || !phone || !email) {
    return res.status(400).json({ message: "Все поля должны быть заполнены" });
  }

  try {
    // Проверка, что пользователь с таким логином не существует
    const [results] = await db.query("SELECT * FROM user WHERE login = ?", [
      login,
    ]);
    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким логином уже существует" });
    }

    // // Хеширование пароля
    // const hashedPassword = bcrypt.hashSync(password, 10);

    // Создание нового пользователя
    const newUser = {
      login,
      password, // :hashedPassword
      full_name,
      phone,
      email,
      id_role: 1, // Изначально роль - Пользователь
    };

    // Внесение пользователя в базу данных
    await db.query("INSERT INTO user SET ?", newUser);

    res.status(201).json({ message: "Регистрация прошла успешно", newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//////////////////////////////////////////////////////////// Маршрут для выхода
app.post("/api/logout", (req, res) => {
  res.json({ message: "Выход выполнен успешно" });
});

//////////////////////////////////////////////////////////// Маршрут для работы с заказами
app.post("/api/order/", (req, res) => {
  const { id_user, id_product, count, address } = req.body;
  const newOrder = {
    id: generateId(),
    id_user,
    id_product,
    count,
    address,
    id_status: 1, // Статус "Новый"
  };

  db.query("INSERT INTO `order` SET ?", newOrder, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res
      .status(201)
      .json({ message: "Заказ успешно создан", id: results.insertId });
  });
});

app.put("/api/order/:id", (req, res) => {
  const { id } = req.params;
  const { id_status } = req.body;

  db.query(
    "UPDATE `order` SET id_status = ? WHERE id = ?",
    [id_status, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Статус успешно обновлен" });
    }
  );
});

////////////////////////////////////////////////////////////
////////////////////   START SERVER   //////////////////////
////////////////////////////////////////////////////////////

app.listen(port, (err) => {
  if (err) {
    return console.log("Ошибка: " + err);
  } else {
    console.log(`Сервер запущен на http://localhost:${port}`);
  }
});
