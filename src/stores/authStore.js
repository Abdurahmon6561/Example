import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
  }),
  actions: {
    setToken(token) {
      console.log('Setting token:', token);
      this.token = token;
    },
  },
});