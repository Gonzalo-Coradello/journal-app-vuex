import { beforeEach, describe, expect, test, vi } from 'vitest'
import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
  dispatch: vi.fn(),
  commit: vi.fn(),
  getters: {
    'auth/currentState': 'authenticated',
    'auth/username': 'Gonzalo'
  }
}

vi.mock('vuex', () => ({
  useStore: () => mockStore
}))

describe('Pruebas en useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('createUser exitoso', async () => {
    const { createUser } = useAuth()

    const newUser = { name: 'Gonzalo', email: 'gonzalo@gmail.com' }

    mockStore.dispatch.mockReturnValue({ ok: true })

    const resp = await createUser(newUser)

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', {
      email: 'gonzalo@gmail.com',
      name: 'Gonzalo'
    })
    expect(resp).toEqual({ ok: true })
  })

  test('createUser fallido - el usuario ya existe', async () => {
    const { createUser } = useAuth()

    const newUser = { name: 'Gonzalo', email: 'gonzalo@gmail.com' }

    mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' })

    const resp = await createUser(newUser)

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/createUser', {
      email: 'gonzalo@gmail.com',
      name: 'Gonzalo'
    })

    expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })
  })

  test('loginUser exitoso', async () => {
    const { loginUser } = useAuth()

    const loginForm = { email: 'test@test.com', password: '123456' }

    mockStore.dispatch.mockReturnValue({ ok: true })

    const resp = await loginUser(loginForm)

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', loginForm)

    expect(resp).toEqual({ ok: true })
  })

  test('loginUser fallido', async () => {
    const { loginUser } = useAuth()

    const loginForm = { email: 'test@test.com', password: '123456' }

    mockStore.dispatch.mockReturnValue({ ok: false, message: 'INVALID_CREDENTIALS' })

    const resp = await loginUser(loginForm)

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/signInUser', loginForm)

    expect(resp).toEqual({ ok: false, message: 'INVALID_CREDENTIALS' })
  })

  test('checkAuthStatus', async () => {
    const { checkAuthStatus } = useAuth()

    mockStore.dispatch.mockReturnValue({ ok: true })

    const resp = await checkAuthStatus()

    expect(mockStore.dispatch).toHaveBeenCalledWith('auth/checkAuthentication')

    expect(resp).toEqual({ ok: true })
  })

  test('logout', () => {
    const { logout } = useAuth()

    logout()

    expect(mockStore.commit).toHaveBeenCalledWith('auth/logout')
    expect(mockStore.commit).toHaveBeenCalledWith('journal/clearEntries')
  })

  test('Computed: authStatus - username', () => {
    const { authStatus, username } = useAuth()

    expect(authStatus.value).toBe('authenticated')
    expect(username.value).toBe('Gonzalo')
  })
})
