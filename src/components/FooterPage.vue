<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Контакты -->
      <div class="contacts">
        <h3>Контакты</h3>
        <p>Телефон: <a href="tel:+998909126055">+998 (90) 912-60-55</a></p>
        <p>Email: <a href="mailto:niknowayt@mail.com">niknowayt@mail.com</a></p>
      </div>

      <!-- Социальные сети -->
      <div class="social-media">
        <h3>Мы в соцсетях</h3>
        <a href="#" target="_blank">Telegram</a> |
        <a href="#" target="_blank">Instagram</a> |
        <a href="#" target="_blank">YouTube</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: auto; /* Прижимаем футер вниз */
  width: 100%;
  color: white;
  text-align: center;
  padding: 20px 0;
  background: #1a1a1a; /* Темный фон */
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.contacts,
.social-media {
  margin: 10px 0;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}

a {
  color: #00bcd4;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Стилизация ссылок социальных сетей */
.social-media a {
  margin: 0 10px;
}

.social-media a:last-child {
  margin-right: 0;
}
</style>
