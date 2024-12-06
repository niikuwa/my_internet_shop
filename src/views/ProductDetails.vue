<template>
    <div v-if="product" class="product-details-container">
      <div class="product-card">
        <div class="product-image-container">
          <img :src="product.images" :alt="product.name" class="product-image" />
        </div>
        <div class="product-text">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-description">{{ product.description }}</p>
          <p class="product-category">Category: {{ product.category }}</p>
          <p class="product-price">Price: {{ product.price }} ₽</p>
          <p class="product-size">Size: {{ product.size }}</p>
          <p class="product-stock">Stock: {{ product.stock }}</p>
          <button @click="orderProduct" class="contact-button">Заказать</button>
        </div>
      </div>
  
      <div class="reviews-section">
        <h2 class="reviews-title">Отзывы о товаре</h2>
        <div v-if="reviews.length > 0" class="reviews-list">
          <div v-for="review in reviews" :key="review.id" class="review-card">
            <p class="review-author">{{ review.author }}</p>
            <p class="review-text">{{ review.comment }}</p>
            <div class="review-rating">
              <i v-for="n in review.rating" :key="n" class="fas fa-star star-icon"></i>
              <i v-for="n in (5 - review.rating)" :key="n + 'empty'" class="fas fa-star star-icon empty"></i>
            </div>
          </div>
        </div>
        <div v-else>
          <p>Пока нет отзывов о данном товаре.</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Товар не найден!</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        product: null,
        reviews: [],
      };
    },
    async created() {
      const productId = this.$route.params.id;
      if (productId) {
        try {
          const productResponse = await fetch(`http://localhost:5000/products/${productId}`);
          if (!productResponse.ok) {
            throw new Error(`Ошибка HTTP: ${productResponse.status}`);
          }
          this.product = await productResponse.json();
  
          const reviewsResponse = await fetch(`http://localhost:5000/products/${productId}/reviews`);
          if (!reviewsResponse.ok) {
            throw new Error(`Ошибка HTTP: ${reviewsResponse.status}`);
          }
          this.reviews = await reviewsResponse.json();
        } catch (error) {
          console.error("Ошибка загрузки товара или отзывов:", error.message);
        }
      } else {
        console.error("ID товара не указан!");
      }
    },
    methods: {
      orderProduct() {
        // Логика для перехода в Telegram или соцсеть
        window.location.href = 'https://t.me/your_telegram_link';
      }
    }
  };
  </script>
  
  <style scoped>
  .product-details-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .product-card {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    margin-bottom: 20px;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .product-image-container {
    flex: 1;
    max-width: 400px;
  }
  
  .product-image {
    width: 100%;
    height: auto;
    border-radius: 10px 0 0 10px;
  }
  
  .product-text {
    flex: 2;
    padding: 20px;
  }
  
  .product-title {
    font-size: 2rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .product-description,
  .product-category,
  .product-price,
  .product-size,
  .product-stock {
    font-size: 1rem;
    margin-bottom: 10px;
    color: #555;
  }
  
  .contact-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .contact-button:hover {
    background-color: #0056b3;
  }
  
  .reviews-section {
    margin-top: 40px;
  }
  
  .reviews-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #333;
  }
  
  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .review-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .review-author {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #333;
  }
  
  .review-text {
    font-size: 1rem;
    margin-bottom: 10px;
    color: #555;
  }
  
  .review-rating {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  
  .star-icon {
    color: #ffc107;
  }
  
  .star-icon.empty {
    color: #333333;
  }
  </style>
  