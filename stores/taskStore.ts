import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
  // State
  const tasks = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

    // Getters (Computadas)
  const pendingCount = computed(() => tasks.value.filter(t => !t.done).length);

  async function fetchTasks() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      if (!response.ok) throw new Error('Erro ao carregar dados');
      
      const data = await response.json();
      // Mapeamos os dados da API para o nosso formato (id, text, done)
      tasks.value = data.map((t: any) => ({
        id: t.id,
        text: t.title,
        done: t.completed
      }));
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // Actions (Funções)
  function addTask(text: string) {
    tasks.value.push({ id: Date.now(), text, done: false });
  }

  function toggleTask(id: number) {
    const task = tasks.value.find(t => t.id === id);
    if (task) task.done = !task.done;
  }

  return { tasks, loading, error, pendingCount, fetchTasks, addTask, toggleTask };
});