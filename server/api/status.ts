export default defineEventHandler((event) => {
  return {
    status: 'Online',
    message: 'O servidor Nitro está a processar os teus dados com sucesso!',
    timestamp: new Date().toISOString()
  }
})