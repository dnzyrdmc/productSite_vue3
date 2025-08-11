<template>
  <div id="app-container">
    <TheHeader />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
</script>

<style>
/* Global CSS stilleri */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  background-color: #f4f4f4;
  color: #333;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 15px;
  flex-grow: 1; /* İçeriğin ekranı kaplamasını sağlar */
}

/* Basit buton stili */
button {
  background-color: #007bff;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  background-color: #ffe0e0;
  border: 1px solid red;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.loading-indicator {
  text-align: center;
  font-size: 1.2rem;
  padding: 20px;
  color: #555;
}
</style>