<template>
  <div>
        <div class="flex flex-row px-4 py-2 m-10 bg-white text-left rounded-md shadow-md">
            <div v-if="this.post"  class="flex flex-col">
                <div class="text-lg font-bold py-2">
                    {{this.post.title}}
                </div>
                <div>
                    {{this.post.body}}
                </div>  
            </div>
            <div class="flex flex-col justify-center">
                <div v-if="!isFirst" @click="changePostion(postId, -1)">
                    <i class="arrow up"></i>
                </div>
                <div>
                </div>
                <div v-if="!isLast" @click="changePostion(postId, +1)">
                    <i class="arrow down"></i>
                </div>  
            </div>  
        </div>
  </div>
</template>  

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';
import IPost from '@/types/Post' 

@Component
export default class Post extends Vue {
    
    @Prop() readonly post!: IPost; 
    @Prop() readonly isFirst!: boolean;
    @Prop() readonly isLast!: boolean ;

    @Emit('movePost')
    changePostion(id: number, value: number) {
        return
    } 

    get postId(): number {
        return this.post.id
    }

}
</script>

<style scoped>

.arrow {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    cursor: pointer;
}

.up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
}

.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}



</style>