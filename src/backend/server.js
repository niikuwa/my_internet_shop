const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
    user: 'postgres',             
    host: 'localhost',            
    database: 'internet_shop',    
    password: '12345',      
    port: 5432                    
});

app.use(cors());
app.use(bodyParser.json());
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения товаров:', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.post('/products', async (req, res) => {
    const { name, category, description, price, stock } = req.body;
    try {
        await pool.query(
            'INSERT INTO products (name, category, description, price, stock) VALUES ($1, $2, $3, $4, $5)',
            [name, category, description, price, stock]
        );
        res.status(201).send('Товар добавлен');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ошибка добавления товара');
    }
});
app.get('/reviews', async (req, res) => {
  try {
    const query = `
      SELECT 
        reviews.id,
        reviews.comment,
        reviews.rating,
        reviews.product_id,
        users.name AS author,
        products.name AS product_name
      FROM 
        reviews
      JOIN 
        users ON reviews.user_id = users.id
      JOIN 
        products ON reviews.product_id = products.id
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения отзывов:', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.post('/reviews', async (req, res) => {
  try {
    const { comment, rating, user_name, product_id } = req.body;

    if (!comment || !rating || !user_name || !product_id) {
      return res.status(400).send('Все поля обязательны для заполнения');
    }

    const userQuery = `SELECT id FROM users WHERE name = $1`;
    const userResult = await pool.query(userQuery, [user_name]);

    if (userResult.rowCount === 0) {
      return res.status(404).send('Данного пользователя нет в базе данных');
    }

    const user_id = userResult.rows[0].id;

    const reviewQuery = `
      INSERT INTO reviews (comment, rating, user_id, product_id)
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const reviewValues = [comment, rating, user_id, product_id];

    const reviewResult = await pool.query(reviewQuery, reviewValues);
    res.status(201).json(reviewResult.rows[0]);
  } catch (error) {
    console.error('Ошибка добавления отзыва:', error);
    res.status(500).send('Ошибка сервера');
  }
});
app.delete('/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `DELETE FROM reviews WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).send('Отзыв не найден');
    }

    res.status(200).send('Отзыв успешно удалён');
  } catch (error) {
    console.error('Ошибка удаления отзыва:', error);
    res.status(500).send('Ошибка сервера');
  }
});

  app.get('/founders', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM founders ORDER BY joined_date');
      res.json(result.rows); 
    } catch (error) {
      console.error('Ошибка получения основателей:', error);
      res.status(500).send('Ошибка сервера');
    }
  });

app.get('/products/:id', async (req, res) => {
  const { id } = req.params; 
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка получения товара:', error);
    res.status(500).send('Ошибка сервера');
  }
});

app.get('/products/:id/reviews', async (req, res) => {
  const { id } = req.params; 
  try {
    const query = `
      SELECT
        reviews.id,
        reviews.comment,
        reviews.rating,
        users.name AS author
      FROM
        reviews
      JOIN
        users ON reviews.user_id = users.id
      WHERE
        reviews.product_id = $1
    `;
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Отзывов для данного товара не найдено' });
    }
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения отзывов:', error);
    res.status(500).send('Ошибка сервера');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
