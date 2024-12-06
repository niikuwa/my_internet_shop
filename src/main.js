import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { configureCompat } from '@vue/compat';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faStar);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);

configureCompat({ MODE: 2 }); // Включить режим совместимости
createApp(App)
  .use(router) // Подключаем маршрутизатор
  .mount('#app'); // Монтируем приложение
