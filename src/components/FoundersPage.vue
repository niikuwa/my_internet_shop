<template>
  <div class="founders-container">
    <h2 class="title">Наши основатели</h2>
    <div class="founders-list">
      <div class="founder-card" v-for="founder in founders" :key="founder.id">
        <h3 class="founder-name">{{ founder.name }} ({{ founder.role }})</h3>
        <p class="founder-bio">{{ founder.bio }}</p>
        <p><strong>Контактная информация:</strong></p>
        <p>{{ founder.contact_info }}</p>
        <p class="joined-date"><small>Дата присоединения: {{ formatDate(founder.joined_date) }}</small></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      founders: [] // Здесь будут храниться данные основателей
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('ru-RU', options);
    }
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/founders');
      this.founders = response.data; // Сохраняем данные основателей
    } catch (error) {
      console.error('Ошибка загрузки данных об основателях:', error);
    }
  }
};
</script>

<style scoped>
/* Основной контейнер */
.founders-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  width: 100%;
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

/* Список основателей */
.founders-list {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

/* Карточка основателя */
.founder-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 400px;
  width: 100%;
}

/* Анимация при наведении */
.founder-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Имя основателя */
.founder-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}

/* Биография основателя */
.founder-bio {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

/* Дата присоединения */
.joined-date {
  font-size: 1rem;
  color: #777;
  margin-top: 10px;
}
</style>
