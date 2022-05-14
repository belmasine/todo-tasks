<template>
    <form class="task-form">
        <h4>Todo task</h4>
        <div class="form-control">
        <input
            type="text"
            v-model="name"
            class="task-input"
            placeholder="write task ..."
        />
        <button 
            type="submit" 
            class="btn submit-btn"
            @click.prevent="submit"
        >
            Save
        </button>
        </div>
        <div v-if="showAlert" class="form-alert text-success"> {{ textAlert }}</div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            showAlert: false
        }
    },
    methods: {
        async submit() {
            try {
                const response = await fetch('http://localhost:3000/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: this.name, completed: false})
                    }
                );
                await response.json();
                this.$emit('refresh-list')
                this.name = '';
                this.showAlert = true;
                this.textAlert = 'Success: task created !';
            } catch (error) {
                this.showAlert = true;
                this.textAlert = `error, please try again`
            }
            setTimeout(() => {
                this.showAlert = false;
                this.textAlert = '';
            }, 3000);
        }
    },
}
</script>
   