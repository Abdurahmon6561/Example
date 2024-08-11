<template>
  <div class="bg-gradient-to-r from-blue-50 to-blue-100 w-screen h-screen">
    <div class="mt-[180px] ml-[590px] w-[548px] p-8 bg-white rounded-lg shadow-md h-[480px]">
      <h2 class="mt-[22px] text-4xl font-bold text-left ml-[20px] mb-[18px] text-gray-900">
        Войти в систему
      </h2>
      <hr />
      <form class="mt-4 mb-[48px]" @submit.prevent="handleLogin">
        <div>
          <label for="email" class="block text-xl font-semibold">Имя пользователя</label>
          <div class="mt-[12px] bg-slate-100 flex items-center border rounded-md">
            <input
              type="email"
              id="email"
              v-model="email"
              class="bg-slate-100 w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите имя пользователя"
              required
            />
          </div>
        </div>
        <div class="mb-[24px]">
          <label for="password" class="block text-xl font-semibold mt-[32px]">Пароль</label>
          <div class="flex mt-[12px] bg-slate-100 items-center border rounded-md">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="bg-slate-100 w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите пароль"
              required
            />
            <div class="p-2 cursor-pointer" @click="togglePasswordVisibility">
              <component
                :is="showPassword ? 'EyeInvisibleOutlined' : 'EyeOutlined'"
                class="text-gray-500"
              />
            </div>
          </div>
        </div>
        <hr />
        <button
          type="submit"
          class="mt-[24px] w-[484px] h-[56px] font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Войти
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Joi from 'joi'
import { useAuthStore } from '../../stores/authStore'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const schema = Joi.object({
  email: Joi.string().pattern(emailPattern).required().messages({
    'string.pattern.base': 'Invalid email format',
    'string.empty': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required'
  })
})

const handleLogin = async () => {
  // Validate input
  const { error } = schema.validate({ email: email.value, password: password.value }, { abortEarly: false })

  if (error) {
    Toastify({
      text: error.details.map(detail => detail.message).join(', '),
      backgroundColor: 'rgb(244, 67, 54)', // red color for errors
      duration: 3000,
    }).showToast()
    return
  }

  try {
    const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/auth', {
      email: email.value,
      password: password.value
    })
    console.log(response.data)
    if (response.data) {
      authStore.setToken(response.data)
      localStorage.setItem('token', response.data)
      router.push('/dashboard')
    }
  } catch (err) {
    Toastify({
      text: 'Email or password is incorrect!',
      backgroundColor: 'rgb(244, 67, 54)', 
      duration: 3000,
    }).showToast()
    console.log('Xatolik yuz berdi', err)
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
