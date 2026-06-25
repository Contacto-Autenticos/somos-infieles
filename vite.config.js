import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Admin - Somos Infieles',
        short_name: 'Admin SI',
        description: 'Panel de Administración de Somos Infieles',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '/admin',
        scope: '/',
        display: 'standalone',
        icons: [
          {
            src: 'Logo somos infieles - Cuadrado.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'Logo somos infieles - Cuadrado.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      },
      workbox: {
        importScripts: ['custom-sw.js']
      }
    })
  ],
  base: './',
})
