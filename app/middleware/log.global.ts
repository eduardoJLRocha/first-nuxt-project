export default defineNuxtRouteMiddleware((to, from) => {
  console.log(`🚀 O utilizador está a navegar de ${from.path} para ${to.path}`)
})