<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <router-view />
    <LoginAuth/>
  </div>
</template>

<script setup>
import LoginAuth from "../components/login/LoginAuth.vue"
</script>

<style>
@import "tailwindcss/tailwind.css";
</style>
