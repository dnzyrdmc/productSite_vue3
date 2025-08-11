import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../views/ProductList.vue'; 
import ProductDetails from '../views/ProductDetails.vue'; 
import CartPage from '../views/CartPage.vue'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList, 
  },
  {
    path: '/product/:id', 
    name: 'ProductDetails',
    component: ProductDetails,
    props: true, 
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;