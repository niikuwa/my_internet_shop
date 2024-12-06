import { createRouter, createWebHistory } from 'vue-router'; // Правильный импорт для Vue 3
import HomePage from '../components/HomePage.vue';
import ProductsList from '../components/ProductsList.vue';
import FoundersPage from '../components/FoundersPage.vue';
import ReviewsPage from '../components/ReviewsPage.vue';
import ProductDetails from '../views/ProductDetails.vue';

// Определение маршрутов
const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/products', name: 'Products', component: ProductsList },
  { path: '/founders', name: 'Founders', component: FoundersPage },
  { path: '/reviews', name: 'Reviews', component: ReviewsPage },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails } // Для отображения деталей товара
];

// Создание роутера
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Экспорт роутера
export default router;
