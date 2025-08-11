<template>
  <div class="product-card">
    <router-link :to="`/product/${product.id}`" class="product-link">
      <img :src="product.thumbnail" :alt="product.title" class="product-image" />
      <h3 class="product-title">{{ product.title }}</h3>
    </router-link>
    <p class="product-price">${{ product.price.toFixed(2) }}</p>
    <button @click="addToCart(product)">Sepete Ekle</button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Parent bileşenden gelecek 'product' prop'ını tanımlıyoruz
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const addToCart = (product) => {
  store.dispatch('addToCart', product);
  alert(`${product.title} sepete eklendi!`);
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block; /* Bağlantının tüm kartı kaplamasını sağlar */
}

.product-image {
  max-width: 100%;
  height: 200px; /* Sabit yükseklik */
  object-fit: contain; /* Görselin oranını koruyarak kutuya sığdır */
  margin-bottom: 15px;
  border-radius: 5px;
}

.product-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.product-price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 15px;
}

.product-card button {
  width: 100%;
  padding: 10px;
  margin-top: auto; /* Kartın altına hizalanmasını sağlar */
}
</style>