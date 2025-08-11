<template>
  <header class="main-header">
    <nav class="nav-container">
      <router-link to="/" class="site-title">DummyJSON E-Ticaret</router-link>
      <div class="nav-links">
        <router-link to="/cart" class="cart-link">
          Sepetim ({{ cartItemCount }})
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const cartItemCount = computed(() => store.getters.getCartItemCount);
</script>

<style scoped>
.main-header {
  background-color: #333;
  color: white;
  padding: 15px 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-title {
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  align-items: center;
}

.cart-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 8px 12px;
  border: 1px solid white;
  border-radius: 5px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.cart-link:hover {
  background-color: white;
  color: #333;
}
</style>