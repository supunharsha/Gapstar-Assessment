<template>
  <div class="flex flex-grow-0 px-20 py-12">
        <div class="flex flex-1 flex-col">
            <div class="text-left px-10 text-lg"> 
                Sortable Post List    
            </div>
            <div class="flex-1">
                <transition-group name="post-list">
                <div v-for="post in posts" :key="post.id">
                    <Post :post="post"  :isFirst="posts.findIndex(item => item.id === post.id) === 0" 
                                        :isLast="posts.findIndex(item => item.id === post.id) === (posts.length-1)" @movePost="movePost"></Post>
                </div>
                </transition-group>
            </div>
        </div>
        <div  class="flex-1">
            <Actions :actions="actions" @revertChange="revertChange"></Actions>
        </div> 
  </div>
</template>  

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Subscription, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

import IAction from '../types/Action'
import IPost from '@/types/Post'
import Post  from '@/components/Post.vue'
import Actions  from '@/components/Actions.vue'
import apiService from '@/services/apiService'

const postsEndpoint = 'posts'

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

    

    mounted(): void { 
        // on mounted event get all the posts, limit it to first 5 items. If error returned, send empty array
        this.subscription = apiService.get<any>(postsEndpoint).pipe(map((data) => data.slice(0,5)), catchError(() => of([]))).subscribe(
            data => this.posts = data
        );
    }

    
    movePost(id: number, value: number, isRevert = false): void {
        // find the post which needed to be change in posts array 
        const temp = this.posts.find(item => item.id === id) as IPost

        // find the index of the post within the posts array 
        const itemId = this.posts.findIndex(item => item.id === id)

        // remove the above searched post from posts array
        this.posts.splice(itemId,1)

        // add the removed item in to the new position based on value (value = +1 means after the current position, -1 means before the current position)
        this.posts.splice(itemId + value,0,temp)

        //if this is post moving event, then it needed to be recorded in list of actions
        if(!isRevert) {
            this.actions.reverse();
            this.actions.push( { from: itemId + 1, to: itemId + 1 + value, changeId: this.actions.length , id: id} as IAction)
            this.actions.reverse();
        }    
    }

    revertChange(changeId: number): void {
        let index = this.actions.findIndex(a => a.changeId === changeId) 

        // revert all previous actions 1 by 1
        for (let i=0; 0 <= index ; i++) {

            // remove the changes from lis of actions 
            const change = this.actions[0] as IAction
            this.actions.splice(0,1);
            index -= 1;

            //revert the change in posts array
            this.movePost(change.id, change.from-change.to, true);
        }

    }
  
    destroyed(): void{
        this.subscription && this.subscription.unsubscribe();
    }
}
</script>

<style scoped>
.post-list-move {
  transition: transform 1s;
}
</style>
