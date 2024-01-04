import HomeView from '@/views/HomeView.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'

describe('Pruebas en el Home View', () => {
  test('debe renderizar el componente correctamente', () => {
    const wrapper = shallowMount(HomeView)

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('hacer click en un botón debe redireccionar a no-entry', () => {
    const mockRouter = {
      push: vi.fn()
    }

    const wrapper = shallowMount(HomeView, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalled()
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
  })
})
