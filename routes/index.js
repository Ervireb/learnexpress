const express = require('express');
const router = express.Router();
const users = require('../data/users'); // Импортируем массив пользователей

// Маршрут для главной страницы
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' }); // Отображаем главную страницу с заголовком
});

// Маршрут для получения пользователя по ID
router.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.json(user); // Если пользователь найден, отправляем его данные в формате JSON
    } else {
        res.status(404).send('Пользователь не найден'); // Если пользователь не найден, отправляем ошибку 404
    }
});

module.exports = router;