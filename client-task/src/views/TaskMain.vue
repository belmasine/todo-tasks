<template>
    <div>
        <task-form @refresh-list="showTasks()" />
        <section class="tasks-container">
            <p 
                v-if="loading" 
                class="loading-text"
            >
                {{ loadingText }}
            </p>
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

import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';

export default {
    name: 'TaskMain', 
    components: {
        TaskList,
        TaskForm,
    },
    data() {
        return {
            loadingText: 'Loading...',
            allTasks: [],
            loading: true,
        };
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
        this.showTasks();
    }
}
</script>
