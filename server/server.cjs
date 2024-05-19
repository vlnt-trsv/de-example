const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

////////////////////////////////////////////////////////////
////////////////////   CONFIG   ////////////////////////////
////////////////////////////////////////////////////////////

app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "example",
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

app.get("/api/user", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM user");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/car", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM car");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/request", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM request");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/request", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM request");
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/status", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM status");
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
  const { email, password } = req.body;
  try {
    const [results] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (results.length === 0) {
      return res.status(400).json({ message: "Неверный email или пароль" });
    }
    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Неверный email или пароль" });
    }
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
  const { email, password } = req.body;

  try {
    const [results] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);
    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      full_name: "none",
      phone: "none",
      driver_license: "none",
      id_role: 1,
    };

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
app.post("/api/request", (req, res) => {
  const { car, date, status } = req.body;
  const newRequest = { car, date, status };

  db.query("INSERT INTO request SET ?", newRequest, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res
      .status(201)
      .json({ message: "Заказ успешно создан", id: results.insertId });
  });
});

app.put("/api/request/:id", async (req, res) => {
  const { id } = req.params;
  const { id_user, id_car, id_status, booking_date } = req.body;
  const updatedRequest = { id_user, id_car, id_status, booking_date };

  try {
    await db.query("UPDATE request SET ? WHERE id = ?", [updatedRequest, id]);
    res.json({ message: "Заказ успешно обновлен" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/request/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM request WHERE id = ?", [id]);
    res.json({ message: "Заказ успешно удален" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
