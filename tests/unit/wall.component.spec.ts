import IPost from '@/types/Post';
import { shallowMount } from '@vue/test-utils'
import Wall from '@/components/Wall.vue'

describe('Wall.vue', () => {

    it('subscription should be removed when destroy component', () => {

        const wrapper = shallowMount(Wall, {
        })
        const component = wrapper.vm as any
        wrapper.destroy()

        expect(component.subscribe).toBeUndefined()
    });

    it('should be able act on recieved emit event ', () => {
        const wrapper = shallowMount(Wall, {
        });
        const component = wrapper.vm as any
        component.posts = [
            {
                body: "PostBody1",
                id: 1,
                title: "Title1"
            } as IPost,
            {
                body: "PostBody2",
                id: 2,
                title: "Title2"
            } as IPost
        ]

        component.movePost(2, -1)

        expect(component.posts[0].id).toBe(2);
    });

    it('should be able to change post order ', () => {
        const wrapper = shallowMount(Wall, {
        });
        const component = wrapper.vm as any
        component.posts = [
            {
                body: "PostBody1",
                id: 1,
                title: "Title1"
            } as IPost,
            {
                body: "PostBody2",
                id: 2,
                title: "Title2"
            } as IPost
        ]

        component.movePost(2, -1)

        expect(component.posts[0].id).toBe(2);
    });

    it('should be revert the change of post ', () => {
        const wrapper = shallowMount(Wall, {
        });
        const component = wrapper.vm as any
        component.posts = [
            {
                body: "PostBody1",
                id: 1,
                title: "Title1"
            } as IPost,
            {
                body: "PostBody2",
                id: 2,
                title: "Title2"
            } as IPost
        ]

        component.movePost(2, -1)
        component.revertChange(0)

        expect(component.posts[0].id).toBe(1);
    });

})


