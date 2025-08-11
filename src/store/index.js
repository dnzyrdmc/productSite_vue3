import { createStore } from 'vuex';
import axios from 'axios'; 

const store = createStore({
  state: {
    
    products: [], 
    productDetails: null, 
    loading: false, 
    error: null, 
    cartItems: [], 
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_PRODUCT_DETAILS(state, product) {
      state.productDetails = product;
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    ADD_TO_CART(state, product) {
      const existingItem = state.cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    },
    UPDATE_CART_ITEM_QUANTITY(state, { productId, quantity }) {
      const item = state.cartItems.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
    CLEAR_CART(state) {
      state.cartItems = [];
    }
  },
  actions: {
    async fetchAllProducts({ commit }) {
      commit('SET_LOADING', true); 
      commit('SET_ERROR', null); 
      try {
        const response = await axios.get('https://dummyjson.com/products');
        commit('SET_PRODUCTS', response.data.products);
      } catch (error) {
        commit('SET_ERROR', 'Ürünler yüklenirken bir hata oluştu: ' + error.message);
      } finally {
        commit('SET_LOADING', false); 
      }
    },
    async fetchProductDetails({ commit }, productId) {
      commit('SET_LOADING', true);
      commit('SET_ERROR', null);
      commit('SET_PRODUCT_DETAILS', null); 
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        commit('SET_PRODUCT_DETAILS', response.data);
      } catch (error) {
        commit('SET_ERROR', 'Ürün detayı yüklenirken bir hata oluştu: ' + error.message);
      } finally {
        commit('SET_LOADING', false);
      }
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    updateCartItemQuantity({ commit }, payload) {
      commit('UPDATE_CART_ITEM_QUANTITY', payload);
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    }
  },
  getters: {
    getAllProducts: state => state.products,
    getProductDetails: state => state.productDetails,
    isLoading: state => state.loading,
    getCartItems: state => state.cartItems,
    cartTotal: state => state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    getCartItemCount: state => state.cartItems.reduce((count, item) => count + item.quantity, 0),
    getError: state => state.error,
  }
});

export default store;