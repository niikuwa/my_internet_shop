<template>
  <div class="products-container">
    <h2 class="title">Наш ассортимент</h2>
    <div class="search-sort-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Поиск по названию товара"
        class="search-input"
      />
      <button @click="toggleSortOrder" class="sort-button">
        Сортировать по цене: {{ sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию' }}
      </button>
    </div>
    <div class="cards">
      <router-link
        class="card"
        v-for="product in filteredAndSortedProducts"
        :key="product.id"
        :to="{ name: 'ProductDetails', params: { id: product.id } }"
      >
        <!-- Изображение товара -->
        <img :src="product.images" :alt="product.name" class="card-image" />
        <!-- Информация о товаре -->
        <div class="card-content">
          <h3 class="card-title">{{ product.name }}</h3>
          <p class="card-description">{{ product.description }}</p>
          <p class="card-price">{{ product.price }} ₽</p>
          <p class="card-stock">Остаток: {{ product.stock }}</p>
          <p class="card-id">Артикул: {{ product.id }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [], // Здесь будут товары из базы данных
      searchQuery: '', // Поисковый запрос
      sortOrder: 'asc' // Порядок сортировки: 'asc' для возрастания, 'desc' для убывания
    };
  },
  computed: {
    filteredAndSortedProducts() {
      let filteredProducts = this.products;

      if (this.searchQuery) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      if (this.sortOrder === 'asc') {
        return filteredProducts.sort((a, b) => a.price - b.price);
      } else {
        return filteredProducts.sort((a, b) => b.price - a.price);
      }
    }
  },
  methods: {
    toggleSortOrder() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/products'); // Запрос к API
      this.products = response.data; // Загружаем товары в массив
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    }
  }
};
</script>

<style scoped>
/* Общий контейнер */
.products-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Заголовок */
.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

/* Контейнер для поиска и сортировки */
.search-sort-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

/* Поле ввода для поиска */
.search-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  margin-right: 10px;
}

/* Кнопка для сортировки */
.sort-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sort-button:hover {
  background-color: #0056b3;
}

/* Сетка карточек */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* Карточка товара */
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  color: inherit;
}

/* При наведении */
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Изображение товара */
.card-image {
  height: 300px;
  object-fit: cover;
  width: 100%;
}

/* Контент карточки */
.card-content {
  padding: 15px;
  text-align: center;
}

/* Название товара */
.card-title {
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 10px;
}

/* Описание товара */
.card-description {
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
}

/* Цена */
.card-price {
  font-size: 1.25rem;
  color: #28a745;
  font-weight: bold;
  margin-bottom: 10px;
}

/* Остаток на складе */
.card-stock {
  font-size: 0.9rem;
  color: #777;
}

/* Артикул */
.card-id {
  font-size: 0.9rem;
  color: #777;
}
</style>
