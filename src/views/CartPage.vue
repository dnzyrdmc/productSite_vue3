<template>
  <div class="cart-page">
    <h1>Sepetim</h1>

    <div v-if="cartItems.length === 0" class="empty-cart-message">
      Sepetinizde hiç ürün bulunmuyor.
      <router-link to="/" class="go-to-products-button">Ürünlere Göz At</router-link>
    </div>

    <div v-else>
      <div class="cart-items-list">
        <CartItem
          v-for="item in cartItems"
          :key="item.id"
          :item="item"
          @remove-item="removeFromCart"
          @update-quantity="updateItemQuantity"
        />
      </div>

      <div class="cart-summary">
        <h2>Sipariş Özeti</h2>
        <p>Toplam Ürün Sayısı: {{ cartItemCount }}</p>
        <p class="total-price">Genel Toplam: <strong>${{ cartTotal.toFixed(2) }}</strong></p>
        <button @click="checkout" class="checkout-button">Siparişi Tamamla</button>
        <button @click="clearAllItems" class="clear-cart-button">Sepeti Temizle</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import CartItem from '../components/CartItem.vue'; // Sepet öğesi bileşenini import ediyoruz

const store = useStore();

const cartItems = computed(() => store.getters.getCartItems);
const cartTotal = computed(() => store.getters.cartTotal);
const cartItemCount = computed(() => store.getters.getCartItemCount);

const removeFromCart = (productId) => {
  store.dispatch('removeFromCart', productId);
  alert('Ürün sepetten çıkarıldı!');
};

const updateItemQuantity = ({ productId, quantity }) => {
  store.dispatch('updateCartItemQuantity', { productId, quantity });
};

const checkout = () => {
  if (cartItems.value.length === 0) {
    alert('Sepetiniz boş, sipariş veremezsiniz!');
    return;
  }
  alert(`Toplam ${cartTotal.value.toFixed(2)}$ tutarında siparişiniz oluşturuldu! (Bu sadece bir demo)`);
  store.dispatch('clearCart'); // Sipariş tamamlandıktan sonra sepeti temizle
};

const clearAllItems = () => {
  if (confirm('Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?')) {
    store.dispatch('clearCart');
    alert('Sepetiniz temizlendi.');
  }
};
</script>

<style scoped>
.cart-page {
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.empty-cart-message {
  text-align: center;
  font-size: 1.3rem;
  color: #666;
  padding: 50px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  margin-top: 30px;
}

.go-to-products-button {
  display: inline-block;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 20px;
  transition: background-color 0.2s ease;
}

.go-to-products-button:hover {
  background-color: #218838;
}

.cart-items-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  padding: 20px;
  margin-bottom: 30px;
}

.cart-summary {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  padding: 25px;
  text-align: right;
}

.cart-summary h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 15px;
}

.cart-summary p {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.cart-summary .total-price {
  font-size: 1.6rem;
  color: #007bff;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 25px;
}

.checkout-button {
  background-color: #28a745;
  margin-left: 10px;
}

.checkout-button:hover {
  background-color: #218838;
}

.clear-cart-button {
  background-color: #dc3545;
  margin-top: 10px;
}

.clear-cart-button:hover {
  background-color: #c82333;
}
</style>