<template>
    <div class="container">
      <form class="single-task-form">
        <h4>Edit Task</h4>
        <div class="form-control">
          <label>Task ID</label>
          <p class="task-edit-id"></p>
        </div>
        <div class="form-control">
          <label for="name">Name</label>
          <input type="text" v-model="name" class="task-edit-name" />
        </div>
        <div class="form-control">
          <label for="completed">completed</label>
          <input type="checkbox" v-model="completed" name="completed" class="task-edit-completed" />
        </div>
        <button @click.prevent="submit" type="submit" class="block btn task-edit-btn">edit</button>
        <div class="form-alert"> </div>
      </form>

      <a href="/" class="btn back-link">back to tasks</a>
    </div>
</template>

<script>
export default {
    name: 'TaskEdit',
    data() {
        return {
            name: '',
            completed: false,
        }
    },
     created() {
        //try {
            console.log(this.$router)
            //const response = await fetch(`localhost:3000/api/tasks/${id}`);
            //const result = await response.json();
           // const { _id: taskID, completed, name } = result;
           // console.log('result edit', result)

           /* taskIDDOM.textContent = taskID
            taskNameDOM.value = name
            tempName = name
            if (completed) {
                taskCompletedDOM.checked = true
            }
        } catch (error) {
            console.log(error)
        }*/
    },
    methods: {
        async submit() {
            
            
        }
    }
}
</script>



