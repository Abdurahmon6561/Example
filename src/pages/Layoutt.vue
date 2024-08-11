<template>
  <div class="w-screen h-screen flex min-h-screen bg-white">
    <div class="w-[280px] ml-[20px] bg-white">
      <div class="flex justify-center py-4">
        <router-link to="/dashboard" class="text-blue-600 font-bold text-lg">
          Dashboard
        </router-link>
      </div>
      <hr />
      <nav class="mt-6">
        <ul>
          <li
            v-for="item in menuItems"
            :key="item.key"
            :class="[
              'flex items-center w-[256px] h-[40px] pl-6 mb-2 cursor-pointer transition-colors duration-300',
              selectedKey === item.key ? 'rounded-lg bg-blue-500 text-white' : 'rounded-lg text-black'
            ]"
          >
            <router-link
              :to="item.link"
              class="flex items-center w-full h-full"
              @click.native="setSelectedKey(item.key)"
            >
              <span class="text-base font-medium">
                {{ item.label }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="flex flex-col items-start pl-6 mt-[335px]">
        <button
          class="bg-red-500 text-white p-2 rounded-lg"
          @click="show"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="flex-1 bg-white">
      <div class="p-4">
        <router-view />
      </div>
    </div>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <p class="font-bold mb-4 text-red-500 text-sm">You want to logout?</p>
        <div>
          <button
            class="bg-green-500 w-[50px] p-2 text-white font-semibold rounded-lg mr-2"
            @click="confirm"
          >
            Yes
          </button>
          <button
            class="bg-red-500 w-[50px] p-2 text-white font-semibold rounded-lg"
            @click="cancel"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const router = useRouter()
const selectedKey = ref('1')
const menuItems = [
  { key: '1', label: 'Дэшборд', link: '/dashboard' },
  { key: '2', label: 'Заказы', link: '/orders' },
  { key: '3', label: 'Каталог', link: '/catalog' },
  { key: '4', label: 'Клиенты', link: '/clients' },
  { key: '5', label: 'Настройки', link: '/settings' },
  { key: '6', label: 'Сборщик', link: '/colect' },
]

const visible = ref(false)

const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const confirm = () => {
  localStorage.removeItem('token')
  router.push('/')
  hide()
  Toastify({
    text: "Logged out successfully!",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "#4CAF50",
    },
  }).showToast()
}

const cancel = () => {
  hide()
  Toastify({
    text: "Logout canceled!",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: "#FF5722",
    },
  }).showToast()
}

const setSelectedKey = (key) => {
  selectedKey.value = key
}
</script>

<style>
@import "tailwindcss/tailwind.css";
</style>
