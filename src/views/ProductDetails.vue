<template>
  <div class="product-detail-page">
    <button @click="goBack" class="back-button">← Ürünlere Geri Dön</button>

    <div v-if="isLoading" class="loading-indicator">
      Ürün detayı yükleniyor...
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
      <button @click="fetchProductDetails(id)">Tekrar Dene</button>
    </div>

    <div v-if="product && !isLoading && !error" class="product-detail-card">
      <div class="product-images">
        <img v-for="(image, index) in product.images" :key="index" :src="image" :alt="product.title" class="product-gallery-image" />
      </div>
      <div class="product-info">
        <h1 class="detail-title">{{ product.title }}</h1>
        <p class="detail-description">{{ product.description }}</p>
        <p class="detail-price">Fiyat: ${{ product.price.toFixed(2) }}</p>
        <p class="detail-stock">Stok: {{ product.stock }} adet</p>
        <p class="detail-rating">Puan: {{ product.rating }} / 5</p>
        <button @click="addToCart(product)" :disabled="product.stock === 0">
          {{ product.stock === 0 ? 'Stokta Yok' : 'Sepete Ekle' }}
        </button>
      </div>
    </div>

    <div v-if="!product && !isLoading && !error" class="no-product-found">
      Ürün bulunamadı veya geçersiz ID.
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute(); // Mevcut rotayı almak için
const router = useRouter(); // Programatik yönlendirme için

// Vuex getter'ları ile state'e erişim
const product = computed(() => store.getters.getProductDetails);
const isLoading = computed(() => store.getters.isLoading);
const error = computed(() => store.getters.getError);

// URL'den ürün ID'sini alıyoruz
const id = computed(() => route.params.id);

// Bileşen yüklendiğinde ve ID değiştiğinde ürün detaylarını çek
onMounted(() => {
  if (id.value) {
    store.dispatch('fetchProductDetails', id.value);
  }
});

// ID değiştiğinde (örneğin kullanıcı farklı bir ürün ID'si girerse) yeniden veri çek
watch(id, (newId) => {
  if (newId) {
    store.dispatch('fetchProductDetails', newId);
  }
});

const addToCart = (productToAdd) => {
  store.dispatch('addToCart', productToAdd);
  alert(`${productToAdd.title} sepete eklendi!`);
};

const goBack = () => {
  router.back(); // Bir önceki sayfaya döner
};
</script>

<style scoped>
.product-detail-page {
  padding: 20px;
}

.back-button {
  background-color: #6c757d;
  margin-bottom: 20px;
  padding: 10px 15px;
}

.back-button:hover {
  background-color: #5a6268;
}

.product-detail-card {
  display: flex;
  flex-wrap: wrap; /* Küçük ekranlarda alt alta geçiş için */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  padding: 30px;
  gap: 30px;
}

.product-images {
  flex: 1; /* Esnek boyut */
  min-width: 300px; /* Minimum genişlik */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* Resimleri yan yana sırala */
  gap: 10px;
}

.product-gallery-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  object-fit: contain;
  border: 1px solid #eee;
}

.product-info {
  flex: 2; /* Esnek boyut */
  min-width: 300px; /* Minimum genişlik */
}

.detail-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 15px;
}

.detail-description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
}

.detail-price {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
}

.detail-stock, .detail-rating {
  font-size: 1rem;
  color: #777;
  margin-bottom: 5px;
}

.product-detail-card button {
  margin-top: 20px;
  padding: 12px 25px;
  font-size: 1.2rem;
}

.no-product-found {
  text-align: center;
  font-size: 1.3rem;
  color: #888;
  padding: 50px;
  border: 1px dashed #ddd;
  border-radius: 8px;
  margin-top: 30px;
}
</style>