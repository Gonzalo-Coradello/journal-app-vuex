import Login from '@/modules/auth/views/Login.vue'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import createVuexStore from '../../../mock-data/mock-store'
import Swal from 'sweetalert2'

describe('Login component', () => {
  const store = createVuexStore({
    status: 'not-authenticated',
    user: null,
    idToken: null,
    refreshToken: null
  })

  store.dispatch = vi.fn()

  test('debe hacer match con el snapshot', () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe disparar el SWAL cuando las credenciales son incorrectas', async () => {
    store.dispatch.mockReturnValueOnce({ ok: false, message: 'Error en credenciales' })

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store]
      }
    })

    vi.spyOn(Swal, 'fire')

    await wrapper.find('form').trigger('submit')

    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', { email: '', password: '' })
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error en credenciales', 'error')
  })

  test('debe redirigir a la ruta no-entry con credenciales correctas', async () => {
    store.dispatch.mockReturnValueOnce({ ok: true })

    const wrapper = shallowMount(Login, {
      global: {
        plugins: [store]
      }
    })

    const [txtEmail, txtPassword] = wrapper.findAll('input')

    await txtEmail.setValue('test@test.com')
    await txtPassword.setValue('123456')

    await wrapper.find('form').trigger('submit')

    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', {
      email: 'test@test.com',
      password: '123456'
    })

    expect(wrapper.router.push).toHaveBeenLastCalledWith({ name: 'no-entry' })
  })
})
