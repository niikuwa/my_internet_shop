<template>
  <div class="homepage" style="overflow:hidden">
    <h1 class="title">Добро пожаловать в наш интернет-магазин</h1>
    <Slider :images="sliderImages" />

    <!-- Популярные товары -->
    <div class="popular-products-container">
      <h2 class="section-title">Популярные товары</h2>
      <div class="product-grid">
        <a :href='product.url' v-for="product in popularProducts" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3 class="product-name">{{ product.name }}</h3>
          <p class="product-price">{{ product.price }} ₽</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from './ImageSlider.vue';

export default {
  name: 'HomePage',
  components: {
    Slider
  },
  data() {
    return {
      sliderImages: [
        require('@/assets/slide1.jpg'),
        require('@/assets/slide2.jpg'),
        require('@/assets/slide3.jpg')
      ],
      popularProducts: [
        { id: 1,url:'/product/7', name: 'Шорты спортивные', price: 1499.99, image: require('@/assets/product1.jpg') },
        { id: 2,url:'/product/2', name: 'Джинсы классические', price: 2999.99, image: require('@/assets/product2.jpg') },
        { id: 3,url:'/product/8', name: 'Рубажка мужская', price: 2499.99, image: require('@/assets/product3.jpg') }
      ]
    };
  }
};
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Растягиваем контентный блок */
  text-align: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
}
a{
  text-decoration: none;
}
.title {
  font-size: 1.5rem; /* Уменьшаем размер шрифта заголовка */
  margin: 10px 0; /* Уменьшаем отступы сверху и снизу */
}

.section-title {
  text-align: center;
  font-size: 1.5rem; /* Уменьшаем размер шрифта заголовка */
  margin-bottom: 20px;
  color: #333;
}

.popular-products-container {
  margin-bottom: 40px;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.product-card {
  text-align: center;
  padding: 10px;
  border: 1px solid #d6d6d6;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 200px; /* Уменьшаем ширину карточек */
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.product-name {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #333;
}

.product-price {
  font-size: 0.9rem;
  color: #555;
}
</style>
