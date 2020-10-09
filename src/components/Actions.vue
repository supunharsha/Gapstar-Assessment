<template>
  <div class="flex flex-col bg-white rounded-md shadow-md">   
        <div class="text-left m-5 px-3">
            List of Actions Commited
        </div>
        <div v-if="actions && actions.length" class="flex flex-col  justify-center bg-gray-100 shadow-md">
            <div class="flex flex-row m-3 px-2 bg-white rounded-md shadow-md" v-for="action in actions" :key="action.changeId">
                <div class="flex-grow m-3 px-2 py-1">
                    Moved post {{ action.id }} from index {{ action.from - 1 }} to index {{ action.to - 1 }}
                </div>
                <Button id='button' @click="revertChange(action.changeId)" class="m-3 px-2 py-1 bg-green-400 rounded-md">
                    Time Travel
                </Button>
            </div>
        </div>
  </div>
</template>  

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import  IAction from '@/types/IAction'

@Component
export default class Actions extends Vue {
    @Prop() readonly actions: IAction[] | undefined
    @Emit('revertChange') 
    revertChange(changeId: number) {
        return
    }
}
</script>

<style scoped>

</style>