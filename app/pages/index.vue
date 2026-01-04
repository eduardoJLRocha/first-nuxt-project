<script setup lang="ts">
import TaskItem from '../../components/TaskItem.vue'
import { useTaskStore } from '../../stores/taskStore'

// 1. Chamada de API com useFetch (SSR)
const { data: remoteTasks, pending, error } = await useFetch<any[]>(
  'https://jsonplaceholder.typicode.com/todos?_limit=5'
)

// 2. Chamada para a API interna (server/api/status.ts)
const { data: serverStatus } = await useFetch('/api/status')

const taskStore = useTaskStore()
const newTaskText = ref('')

watch(
  remoteTasks,
  (tasks) => {
    if (!tasks) return
    taskStore.tasks = tasks.map((t) => ({
      id: t.id,
      text: t.title,
      done: t.completed
    }))
  },
  { immediate: true }
)

function handleAdd() {
  if (!newTaskText.value) return
  taskStore.addTask(newTaskText.value)
  newTaskText.value = ''
}
</script>

<template>
  <div style="padding: 20px;">
    <!-- Bloco de status do servidor -->
    <div
      v-if="serverStatus"
      style="background: #e0f7fa; padding: 10px; border-radius: 5px; margin-bottom: 20px;"
    >
      <small>Status do Servidor: <strong>{{ serverStatus.status }}</strong></small>
      |
      <small>{{ serverStatus.message }}</small>
    </div>

    <h1>Tarefas com Nuxt SSR</h1>

    <input
      v-model="newTaskText"
      @keyup.enter="handleAdd"
      placeholder="Nova tarefa..."
    />
    <button @click="handleAdd">Adicionar</button>

    <div v-if="pending" style="color: blue; margin-top: 10px;">
      ⏳ A carregar do servidor (SSR)...
    </div>

    <div v-else-if="error" style="color: red; margin-top: 10px;">
      ❌ Erro na API: {{ error.message }}
    </div>

    <ul v-else style="margin-top: 20px;">
      <TaskItem
        v-for="task in taskStore.tasks"
        :key="task.id"
        :task="task"
        @toggle="taskStore.toggleTask"
      />
    </ul>

    <p v-if="taskStore.tasks.length === 0 && !pending">
      Nenhuma tarefa encontrada.
    </p>
  </div>
</template>