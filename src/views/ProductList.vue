<template>
  <div class="product-list-page">
    <h1>Tüm Ürünler</h1>

    <div v-if="isLoading" class="loading-indicator">
      Ürünler yükleniyor...
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
      <button @click="fetchAllProducts">Tekrar Dene</button>
    </div>

    <div v-if="!isLoading && !error && products.length === 0" class="no-products">
      Henüz hiç ürün bulunamadı.
    </div>

    <div v-if="!isLoading && !error && products.length > 0" class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import ProductCard from '../components/ProductCard.vue'; // Ürün kartı bileşenini import ediyoruz

const store = useStore();

// Vuex getter'ları ile state'e erişim
const products = computed(() => store.getters.getAllProducts);
const isLoading = computed(() => store.getters.isLoading);
const error = computed(() => store.getters.getError);

// Bileşen yüklendiğinde tüm ürünleri çek
onMounted(() => {
  store.dispatch('fetchAllProducts'); // Action'ı çağırıyoruz
});

// Hata durumunda tekrar deneme fonksiyonu
const fetchAllProducts = () => {
  store.dispatch('fetchAllProducts');
};
</script>

<style scoped>
.product-list-page {
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  justify-content: center;
}

.no-products {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 50px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  margin-top: 30px;
}
</style>