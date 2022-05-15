<template>
    <div class="task-list">
        <div 
            class="single-task"
            :class="{'task-completed': Boolean(item.completed)}"
            v-for="(item,i) in items"
            :key="i"
        >
          <h5>
            <span>
              <i class="far fa-check-circle"></i>
            </span>
            {{ item.name }}
          </h5>
          <div class="task-links">
            <a 
              :href="`/edit/${item._id}`" 
              class="edit-link"
            >
              <i class="fas fa-edit" />
            </a>

            

            <button 
              type="button" 
              class="delete-btn" 
              @click.prevent="deleteTask(item._id)"
            >
              <i class="fas fa-trash" />
            </button>
          </div>
        </div>
        <div>
           <h5 v-if="!Boolean(items.length)" class="empty-list">Your list is empty </h5>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskList',
    props: {
        items: {
            type: Array,
            required: false,
            default() {
                return [];
            },
        },
    },
    methods: {
      async deleteTask (id) {
        console.log('id = ', id)
        try {
          this.$emit('on-load', true);
          const response = await fetch('http://localhost:3000/api/tasks/' + id, {
            method: 'DELETE',
          });
          await response.json();
          this.$emit('refresh-list');
        } catch (error) {
          console.log(error);
        }
        finally {
          this.$emit('on-load', false);
        }
      }
    }
}
</script>

<style>
.task-list {
  display: flex;
  flex-direction: column;  
  row-gap: 1rem;
}
  </style>