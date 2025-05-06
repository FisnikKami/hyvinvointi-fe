// vite.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        register: resolve(__dirname, 'register.html'),
        training: resolve(__dirname, 'training.html'),
        profile: resolve(__dirname, 'profile.html'),
        login: resolve(__dirname, 'login.html'),
        hrv: resolve(__dirname, 'hrv.html'),
        home: resolve(__dirname, 'home.html'),
        hae: resolve(__dirname, 'hae.html'),
      }
    }
  }
})
