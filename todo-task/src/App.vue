<template>
  <div id="app">
      <task-form @refresh-list="showTasks()" />
      <section class="tasks-container">
        <p v-if="loading" class="loading-text">Loading...</p>
        <div class="tasks">
          <task-list
            :items="allTasks"
            @on-load="loading=$event"
            @refresh-list="showTasks()"
          />
        </div>
      </section>
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import TaskForm from './components/TaskForm.vue';

export default {
  name: 'App',
  data() {
    return {
      allTasks: [],
      loading: true,
    };
  },
  components: {
    TaskList,
    TaskForm,
  },
  methods: {
    async showTasks() {
      try {
        const response = await fetch('http://localhost:3000/api/tasks');
        const { tasks: result } = await response.json();
        this.loading = false;
        this.allTasks = [...result];
      } catch (error) {
        this.allTasks = [];
      }
    },
  },
  mounted() {
    //const formDOM = document.querySelector('.task-form')
    //const taskInputDOM = document.querySelector('.task-input')
    //const formAlertDOM = document.querySelector('.form-alert')
    this.showTasks()
  }
}
</script>

<style>

</style>
