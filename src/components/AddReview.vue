<template>
  <div class="add-review-container">
    <h3>Добавить отзыв</h3>
    <form @submit.prevent="submitReview">
      <div class="form-group">
        <label for="product">Товар:</label>
        <select v-model="selectedProduct" id="product" required>
          <option value="" disabled>Выберите товар</option>
          <option v-for="product in products" :key="product.id" :value="product.id">
            {{ product.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="author">Автор:</label>
        <input type="text" v-model="author" id="author" required />
      </div>
      <div class="form-group">
        <label for="comment">Комментарий:</label>
        <textarea v-model="comment" id="comment" required></textarea>
      </div>
      <div class="form-group">
        <label>Рейтинг:</label>
        <div class="rating-stars">
          <i v-for="n in 5" :key="n" :class="['fas', n <= rating ? 'fa-star' : 'fa-star empty']" @click="setRating(n)"></i>
        </div>
      </div>
      <button type="submit" class="submit-button">Добавить отзыв</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    products: Array
  },
  data() {
    return {
      selectedProduct: '',
      author: '',
      comment: '',
      rating: 0
    };
  },
  methods: {
    setRating(n) {
      this.rating = n;
    },
    async submitReview() {
      try {
        await axios.post('http://localhost:5000/reviews', {
          comment: this.comment,
          rating: this.rating,
          user_name: this.author,
          product_id: this.selectedProduct
        });
        alert('Отзыв добавлен');
        this.selectedProduct = '';
        this.author = '';
        this.comment = '';
        this.rating = 0;
      } catch (error) {
        console.error('Ошибка добавления отзыва:', error);
        alert('Ошибка при добавлении отзыва');
      }
    }
  }
};
</script>

<style scoped>
.add-review-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}
select{
  width: 103.5%;
}
.rating-stars {
  display: flex;
  align-items: center;

}

.rating-stars i {
  cursor: pointer;
  margin-right: 5px;

}

.rating-stars i.fa-star {
  color: #ffc107;
}

.rating-stars i.empty {
  color: #242424;
  
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
