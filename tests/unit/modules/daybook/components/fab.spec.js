import { describe, expect, test } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab.vue'

describe('Pruebas en el FAB component', () => {
  test('debe mostrar el ícono por defecto', () => {
    const wrapper = shallowMount(Fab)
    const icon = wrapper.find('i')

    expect(icon.classes('fa-plus')).toBeTruthy()
  })

  test('debe mostrar el ícono por argumento: fa-circle', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle'
      }
    })

    const icon = wrapper.find('i')

    expect(icon.classes()).toContain('fa-circle')
  })

  test('debe emitir el evento on:click cuando se hace click', async () => {
    const wrapper = shallowMount(Fab)

    wrapper.find('button').trigger('click')

    expect(wrapper.emitted('on:click')).toHaveLength(1)
  })
})
