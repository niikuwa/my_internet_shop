<template>
  <div class="reviews-container">
    <h2 class="title">Отзывы наших клиентов</h2>

    <!-- Меню добавления отзыва -->
    <AddReview :products="products" />

    <!-- Список отзывов -->
    <div class="reviews-list">
      <div class="review-card" v-for="review in reviews" :key="review.id">
        <h3 class="product-name">Товар: {{ review.product_name }}</h3>
        <p class="author">Автор: <strong>{{ review.author }}</strong></p>
        <p class="comment">Комментарий: {{ review.comment }}</p>
        <div class="review-rating">
          <i v-for="n in review.rating" :key="n" class="fas fa-star star-icon"></i>
          <i v-for="n in (5 - review.rating)" :key="n + 'empty'" class="fas fa-star star-icon empty"></i>
        </div>
        <button @click="deleteReview(review.id)" class="delete-button">Удалить отзыв</button>
      </div>
    </div>
  </div>
</template>

<script>
import AddReview from '../components/AddReview.vue'; // Подключение компонента
import axios from 'axios';

export default {
  components: {
    AddReview // Зарегистрируйте компонент
  },
  data() {
    return {
      reviews: [], // Список отзывов
      products: [] // Список товаров
    };
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await axios.get('http://localhost:5000/reviews');
        this.reviews = response.data;
      } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:5000/products');
        this.products = response.data;
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
      }
    },
    async deleteReview(id) {
      try {
        await axios.delete(`http://localhost:5000/reviews/${id}`);
        alert('Отзыв удалён');
        this.reviews = this.reviews.filter((review) => review.id !== id); // Удаляем отзыв из списка
      } catch (error) {
        console.error('Ошибка удаления отзыва:', error);
        alert('Ошибка при удалении отзыва');
      }
    }
  },
  async created() {
    await this.fetchReviews();
    await this.fetchProducts();
  }
};
</script>

<style scoped>
/* Основной контейнер */
.reviews-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

/* Заголовок */
.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #444;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
}

/* Список отзывов */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Карточка отзыва */
.review-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Анимация при наведении */
.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Название товара */
.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}

/* Автор отзыва */
.author {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

/* Комментарий */
.comment {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.5;
}

/* Рейтинг */
.review-rating {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border: 1px;
}

.star-icon {
  color: #ffc107;
}

.star-icon.empty {
  color: #3a3a3a;
}

/* Кнопка удаления */
.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>
