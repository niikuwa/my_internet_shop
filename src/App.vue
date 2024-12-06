<template>
  <div>
    <!-- Шапка сайта -->
    <header class="header">
      <div class="container">
        <h1 class="header__title">Internet Shop</h1>
      </div>
    </header>

    <!-- Навигация -->
    <nav>
      <div class="container">
        <h2 class="navbar-brand" href="#">Навигация по магазину</h2>

        <ul class="nav__menu">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Главная</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Весь ассортимент</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/founders">Основатели</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/reviews">Отзывы</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Контент -->
    <router-view />
    <FooterPage /> <!-- Футер -->
  </div>
</template>

<script>
import FooterPage from './components/FooterPage.vue';
export default {
  components: {
    FooterPage
  },
  name: 'App'
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Anton+SC&family=Yuji+Mai&display=swap');
.container {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}
.header__title {
  font-family: "Anton SC", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 45px;
}
.header {
  text-align: center;
  padding: 5px; /* Меньше padding для уменьшения отступа */
}

.navbar-brand {
  text-align: center;
  margin: 0; /* Убираем отступ для заголовка навигации */
}

ul {
  list-style: none;
}

.nav-link {
  position: relative;
  height: 0px;
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  transition: 1s;
}

.nav-link::after {
  content: '';
  display: inline-block;
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 2px;
  background: black;
  transition: .5s;
}

.nav-link:hover::after {
  width: 100%;
  left: 0;
}

.nav__menu {
  margin-bottom: 20px; /* Уменьшаем отступ снизу */
  margin-top: 10px; /* Уменьшаем отступ сверху */
  display: flex;
  justify-content: space-around;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  margin-top: auto; /* Сдвигает футер вниз */
}


</style>
