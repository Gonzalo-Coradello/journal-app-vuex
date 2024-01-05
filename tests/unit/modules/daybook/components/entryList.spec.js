import EntryList from '@/modules/daybook/components/EntryList.vue'
import { shallowMount } from '@vue/test-utils'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState }
      }
    }
  })

describe('Pruebas en el EntryList', () => {
  const store = createVuexStore(journalState)
  const mockRouter = {
    push: vi.fn()
  }

  let wrapper

  beforeEach(() => {
    vi.clearAllMocks()

    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [store]
      }
    })
  })

  test('debe llamar el getEntriesByTerm sin argumentos y mostrar 2 entradas', () => {
    expect(wrapper.findAll('entry-stub').length).toBe(2)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe llamar el getEntriesByTerm y filtrar las entradas', async () => {
    const input = wrapper.find('input')
    await input.setValue('aprender')

    expect(wrapper.findAll('entry-stub').length).toBe(1)
  })

  test('el boton de nueva entrada debe redireccionar a /new', () => {
    wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } })
  })
})
