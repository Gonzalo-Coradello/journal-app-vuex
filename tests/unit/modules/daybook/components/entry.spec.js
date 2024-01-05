import { beforeEach, describe, expect, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry.vue'
import { journalState } from '../../../mock-data/test-journal-state'

describe('Pruebas en Entry Component', () => {
  let wrapper

  const mockRouter = {
    push: vi.fn()
  }

  beforeEach(() => {
    wrapper = shallowMount(Entry, {
      props: {
        entry: journalState.entries[0]
      },
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
  })

  test('debe hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('debe redireccionar al hacer click en .entry-container', () => {
    wrapper.find('.entry-container').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: { id: journalState.entries[0].id }
    })
  })

  test('pruebas en las propiedades computadas', () => {
    const { day, month, yearDay } = wrapper.vm

    expect(day).toBe(4)
    expect(month).toBe('Enero')
    expect(yearDay).toBe('2024, Jueves')
  })
})
