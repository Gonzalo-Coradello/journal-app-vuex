import AboutView from '@/views/AboutView.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

describe('Pruebas en el About View', () => {
  test('debe renderizar el componente correctamente', () => {
    const wrapper = shallowMount(AboutView)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
