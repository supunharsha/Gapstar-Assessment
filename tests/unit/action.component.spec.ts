import { shallowMount } from '@vue/test-utils'
import Actions from '@/components/Actions.vue'
import IAction from '@/types/Action'

describe('Actions.vue', () => {

    const action = {from: 2, to: 1 , id: 1, changeId: 0} as IAction

    it('should be able to revert action ', () => {

        const wrapper = shallowMount(Actions, {
            propsData: {
                actions: [action]  
            }
        })

        wrapper.get('#button').trigger("click")

        expect(wrapper.emitted('revertChange')).toStrictEqual([[0]]);
    })
})

