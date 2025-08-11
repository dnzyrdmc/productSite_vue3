<template>
  <div class="cart-item">
    <img :src="item.thumbnail" :alt="item.title" class="item-image" />
    <div class="item-details">
      <router-link :to="`/product/${item.id}`" class="item-title-link">
        <h3>{{ item.title }}</h3>
      </router-link>
      <p class="item-price">${{ item.price.toFixed(2) }}</p>
      <div class="quantity-control">
        <button @click="decreaseQuantity" :disabled="item.quantity === 1">-</button>
        <span>{{ item.quantity }}</span>
        <button @click="increaseQuantity">+</button>
      </div>
      <p class="item-total">Toplam: ${{ (item.price * item.quantity).toFixed(2) }}</p>
    </div>
    <button @click="removeItem" class="remove-button">X</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['remove-item', 'update-quantity']);

const removeItem = () => {
  emit('remove-item', props.item.id);
};

const increaseQuantity = () => {
  emit('update-quantity', { productId: props.item.id, quantity: props.item.quantity + 1 });
};

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    emit('update-quantity', { productId: props.item.id, quantity: props.item.quantity - 1 });
  }
};
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  gap: 15px;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
}

.item-details {
  flex-grow: 1;
}

.item-title-link {
  text-decoration: none;
  color: #333;
}

.item-title-link h3 {
  font-size: 1.2rem;
  margin: 0 0 5px 0;
}

.item-price {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 10px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.quantity-control button {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 30px;
}

.quantity-control button:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.quantity-control span {
  font-size: 1.1rem;
  font-weight: bold;
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.remove-button:hover {
  background-color: #c82333;
}
</style>