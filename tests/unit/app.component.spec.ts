import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('instance should be a vue instance ', () => {

    const wrapper = shallowMount(App, {
    })

    expect(wrapper.isVueInstance).toBeTruthy()
  })
})
