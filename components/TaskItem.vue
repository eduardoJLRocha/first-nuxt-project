<script setup lang="ts">
// Define a estrutura do objeto Task
interface Task {
  id: number;
  text: string;
  done: boolean;
}

// 1. Define os props que o componente espera receber (Pai -> Filho)
const props = defineProps<{
  task: Task; // Recebe um objeto Task completo
}>();

// 2. Define os eventos que o componente pode emitir (Filho -> Pai)
const emit = defineEmits<{
  (e: 'toggle', id: number): void; // Emite 'toggle' com o ID da tarefa
}>();

// Função que será chamada ao clicar e emitirá o evento para o Pai
function handleClick() {
  emit('toggle', props.task.id);
}
</script>

<template>
  <li @click="handleClick">
    <span :class="{ 'done-task': props.task.done }">
      {{ props.task.text }}
    </span>
    <span v-if="props.task.done" style="margin-left: 10px; color: green;">
      ✅
    </span>
    <span v-else style="margin-left: 10px; color: red;">
      ❌
    </span>
  </li>
</template>

<style scoped>
.done-task {
  text-decoration: line-through;
  color: grey;
}
li {
  cursor: pointer;
  padding: 5px;
  border-bottom: 1px solid #eee;
}
</style>