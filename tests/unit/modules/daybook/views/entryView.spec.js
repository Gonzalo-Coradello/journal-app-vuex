import journal from '@/modules/daybook/store/journal'
import { shallowMount } from '@vue/test-utils'
import { describe, test, vi, beforeEach, expect } from 'vitest'
import { createStore } from 'vuex'
import { journalState } from '../../../mock-data/test-journal-state'
import EntryView from '@/modules/daybook/views/EntryView.vue'

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState }
      }
    }
  })

vi.mock('sweetalert2', async () => {
  const actual = await vi.importActual('sweetalert2')

  return {
    ...actual,
    fire: vi.fn(),
    showLoading: vi.fn(),
    close: vi.fn()
  }
})

describe('Pruebas en el EntryView', () => {
  const store = createVuexStore(journalState)
  const mockRouter = {
    push: vi.fn()
  }

  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()

    wrapper = shallowMount(EntryView, {
      props: {
        id: '-NnJqfmqd1bxoKeE81Z-'
      },
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [store]
      }
    })
  })

  test('debe sacar al usuario cuando el id no existe', () => {
    shallowMount(EntryView, {
      props: {
        id: 'Este id no existe'
      },
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [store]
      }
    })

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' })
  })

  test('debe mostrar la entrada correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot()
    expect(mockRouter.push).not.toHaveBeenCalled()
  })
})
