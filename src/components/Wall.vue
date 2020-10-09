<template>
  <div class="flex flex-grow-0 px-20 py-12">
        <div class="flex flex-1 flex-col">
            <div class="flex-1 text-left px-10 text-lg"> 
                Sortable Post List    
            </div>
            <div class="flex-1">
                <div v-for="post in posts" :key="post.id">
                    <Post :post="post"  :isFirst="posts.findIndex(item => item.id === post.id) === 0" 
                                        :isLast="posts.findIndex(item => item.id === post.id) === (posts.length-1)" @movePost="movePost"></Post>
                </div>
            </div>
        </div>
        <div  class="flex flex-1 flex-col">
            <Actions :actions="actions" @revertChange="revertChange"></Actions>
        </div> 
  </div>
</template>  

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Post  from '@/components/Post.vue';
import Actions  from '@/components/Actions.vue';
import { Subscription, of } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators'
import IAction from '../types/IAction';
import IPost from '@/types/IPost'


import apiService from '@/services/apiService'

@Component({
    components: {
    Post,
    Actions
  },
})
export default class Wall extends Vue {

    posts: IPost[] = [];
    actions: IAction[] = []
    subscription: Subscription | undefined;

    mounted() { 
        this.subscription = apiService.get<any>('posts').pipe(map((data) => data.slice(0,5)), catchError(err => of([]))).subscribe(
            data => this.posts = data
        );
    }

    movePost(id: number, value: number, isRevert = false) {
        const temp1 = this.posts.find(item => item.id === id) as IPost
        const itemId = this.posts.findIndex(item => item.id === id)
        this.posts.splice(itemId,1)
        this.posts.splice(itemId + value,0,temp1)
        if(!isRevert) {
            this.actions.reverse();
            this.actions.push( { from: itemId + 1, to: itemId + 1 + value, changeId: this.actions.length , id: id} as IAction)
            this.actions.reverse();
        }    
    }

    revertChange(changeId: number) {
        let index = this.actions.findIndex(a => a.changeId === changeId) 
        

        // revert all previous changes
        for (let i=0; 0 <= index ; i++) {
            const change = this.actions[0] as IAction
            this.actions.splice(0,1);
            index -= 1;
            this.movePost(change.id, change.from-change.to, true);
        }

    }

    
    destroyed(){
        this.subscription && this.subscription.unsubscribe();
    }
}
</script>

<style scoped>

</style>
