<template>
    <div class="container">
      <form class="single-task-form">
        <h4>Edit Task</h4>
        <div class="form-control">
          <label for="name">Name</label>
          <input type="text" v-model="name" class="task-edit-name" />
        </div>
        <div class="form-control">
          <label>completed</label>
          <input 
            type="checkbox" 
            v-model="completed" 
            class="task-edit-completed" 
          />
        </div>
        <button 
          @click.prevent="submit" 
          type="submit" 
          class="block btn task-edit-btn"
        >edit</button>
        <div 
          class="form-alert"
          :class="{'text-success': success}"
        > {{ textContent }} </div>
      </form>

      <a href="/" class="btn back-link">Return</a>
    </div>
</template>

<script>
export default {
    name: 'TaskEdit',
    data() {
        return {
            name: '',
            completed: false,
            success: false,
            textContent: ''
        }
    },
    async created() {
      try {
        const id =  this.$route.params.id;
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
        const { task: result } = await response.json();
        const { completed, name } = result;
        this.name = name;
        if (completed) {
            this.completed = true;
        }
      } catch (error) {
          console.log(error);
      }
    },
    methods: {
         async submit() {
          try {
            const id = this.$route.params.id;
            const params ={
              method: 'PATCH',
              body: JSON.stringify({
                name: this.name,
                completed: this.completed
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            };
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, params);
            await response.json();
            this.success = true;
            this.textContent = 'Success, task updated !'
          } catch (error) {
            console.error(error)
            this.textContent =  `error, please try again`;
          }
          setTimeout(() => {
            this.success = false;
            this.textContent = '';
          }, 3000);
        }
    }
}
</script>

