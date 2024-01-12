import { VueRouterMock, createRouterMock, injectRouterMock } from 'vue-router-mock'
import { config } from '@vue/test-utils'
import { beforeEach, vi } from 'vitest'

// create one router per test file
const router = createRouterMock({
  spy: {
    create: (fn) => vi.fn(fn),
    reset: (spy) => spy.mockReset()
  }
})

beforeEach(() => {
  router.reset() // reset the router state
  injectRouterMock(router)
})

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)
