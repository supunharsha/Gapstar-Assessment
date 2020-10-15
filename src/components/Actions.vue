<template>
  <div class="flex flex-col bg-white rounded-md shadow-md">   
        <div class="text-left m-5 px-3">
            List of Actions Commited
        </div>
        <div v-if="actions && actions.length" class="flex flex-col  justify-center bg-gray-100 shadow-md">
            <transition-group name="actions-list">
            <div class="flex flex-row m-3 px-2 bg-white rounded-md shadow-md" v-for="action in actions" :key="action.changeId">
                <div class="flex-grow m-3 px-2 py-1">
                    Moved post {{ action.id }} from index {{ action.from - 1 }} to index {{ action.to - 1 }}
                </div>
                <Button id='button' @click="revertChange(action.changeId)" class=  "transition duration-500 ease-in-out
                                                                                    hover:bg-green-500 transform hover:scale-110
                                                                                    m-3 px-2 py-1 bg-green-300 rounded-md">
                    Time Travel
                </Button>
            </div>
            </transition-group>
        </div>
  </div>
</template>  

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import  IAction from '@/types/Action'

@Component
export default class Actions extends Vue {

    @Prop() readonly actions!: IAction[] 
    
    @Emit('revertChange') 
    revertChange(changeId: number) {
        return
    }
}

</script>

<style scoped>

.actions-list-leave-to  {
    transition: all 1s;
    opacity: 0;
    transform: translateY(30px);
} 

.actions-list-move {
    transition: all 1s
}

</style>