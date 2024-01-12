import Navbar from '@/modules/daybook/components/Navbar.vue'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import createVuexStore from '../../../mock-data/mock-store'

describe('Navbar component', () => {
  const store = createVuexStore({
    user: {
      name: 'Juan Carlos',
      email: 'juan@gmail.com'
    },
    status: 'authenticated',
    idToken: 'ABC',
    refreshToken: 'XYZ'
  })

  beforeEach(() => vi.clearAllMocks())

  test('debe mostrar el componente correctamente', () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.html).toMatchSnapshot()
  })

  test('click en logout debe cerrar sesión y redireccionar', async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store]
      }
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: 'login' })

    expect(store.state.auth).toEqual({
      status: 'not-authenticated',
      user: null,
      idToken: null,
      refreshToken: null
    })
  })
})
