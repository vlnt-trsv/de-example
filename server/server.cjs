const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

app.use(express.json());

// Config
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "example",
  password: "root",
});

conn.connect((err) => {
  if (err) {
    return console.error("Ошибка: " + err);
  } else {
    console.log("Подключено к DB!");
  }
});

// Включение CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Маршруты GET

app.get("/api/user", (req, res) => {
  conn.query("SELECT * FROM user", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/car", (req, res) => {
  conn.query("SELECT * FROM car", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/request", (req, res) => {
  conn.query("SELECT * FROM request", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Маршрут для входа
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  conn.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
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
  });
});

// Маршрут для регистрации
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  // Проверка на существующий email
  conn.query("SELECT * FROM user WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "Пользователь с таким email уже существует" });
    }

    // Если email не существует, создаем нового пользователя
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      full_name: "none",
      phone: "none",
      driver_license: "none",
      id_role: 1,
    };

    conn.query("INSERT INTO user SET ?", newUser, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const user = results[0];
      res.status(201).json({ message: "Регистрация прошла успешно", user });
    });
  });
});

// Маршрут для выхода
app.post("/api/logout", (req, res) => {
  res.json({ message: "Выход выполнен успешно" });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
