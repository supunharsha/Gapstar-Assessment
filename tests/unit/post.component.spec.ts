import { shallowMount } from '@vue/test-utils'
import Post from '@/components/Post.vue'
import IPost from '@/types/Post' 

describe('Post.vue', () => {

    const post = { body: "PostBody", id: 1, title: "Title"} as IPost

    it('post should match with the prop', () => {
        const wrapper = shallowMount(Post, {
            propsData: {
                post: post,
                
            }
        });

        expect(wrapper.props().post).toBe(post);
    })

    it('post should not have up arrow if it is the first item', () => {
        const wrapper = shallowMount(Post, {
            propsData: {
                post: post,
                isFirst: true
            }
        });

        expect(wrapper.find('i').html()).toContain('arrow down')
    })

    it('post should not have down arrow if it is the last item', () => {
        const wrapper = shallowMount(Post, {
            propsData: {
                post: post,
                isLast: true
            }
        });

        expect(wrapper.find('i').html()).toContain('arrow up')
    })

    it('post should be able to change postion', () => {
        const wrapper = shallowMount(Post, {
            propsData: {
                post: post,
                isFirst: true
            }
        });

        wrapper.find('i').trigger('click');
        expect((wrapper.emitted('movePost'))).toStrictEqual([[post.id, 1]]);
    })

})

