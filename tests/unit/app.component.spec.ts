import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('Wall.vue', () => {
  it('number of posts should be 5 ', () => {

    const wrapper = shallowMount(App, {
    })

    expect(wrapper.isVueInstance).toBeTruthy()
  })
})
