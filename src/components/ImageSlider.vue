<template>
  <div class="image-slider">
    <!-- Кнопки для переключения слайдов -->
    <button class="prev" @click="prevSlide">‹</button>
    <button class="next" @click="nextSlide">›</button>

    <!-- Слайды -->
    <div class="image-slide" v-for="(image, index) in images" :key="index" :class="{'active': index === currentIndex}">
      <img :src="image" alt="Slide" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageSlider',
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  mounted() {
    setInterval(this.nextSlide, 8000); // Автоматическое переключение слайдов через 8 секунд
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }
};
</script>

<style scoped>
.image-slider {
  position: relative;
  width: 100%;
  height: 300px; /* Уменьшаем высоту слайдера */
  overflow: hidden; /* Убираем прокрутку */
  margin: 0 auto;
}

.image-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out; /* Плавный переход для анимации */
}

.image-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Сохраняем пропорции изображения и обрезаем лишнее */
}

/* Показываем активный слайд */
.image-slider .image-slide.active {
  opacity: 1;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

button:hover {
  background: rgba(0, 0, 0, 0.8);
}
</style>
