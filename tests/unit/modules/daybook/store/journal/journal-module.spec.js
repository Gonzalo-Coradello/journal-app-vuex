import { describe, expect, test } from 'vitest'
import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState }
      }
    }
  })

describe('Vuex - Pruebas en el Journal Module', () => {
  test('el estado inicial debe coincidir', () => {
    const store = createVuexStore(journalState)
    const { isLoading, entries } = store.state.journal

    expect(isLoading).toBeFalsy()
    expect(entries).toEqual(journalState.entries)
  })

  test('mutation: setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: [] })

    store.commit('journal/setEntries', journalState.entries)
    expect(store.state.journal.entries.length).toBe(2)

    store.commit('journal/setEntries', journalState.entries)
    expect(store.state.journal.entries.length).toBe(4)

    expect(store.state.journal.isLoading).toBeFalsy()
  })

  test('mutation: updateEntry', () => {
    const store = createVuexStore(journalState)

    const updatedEntry = {
      id: '-NnJarzTL_FOzS8fuxFv',
      date: 1704373996716,
      picture:
        'https://res.cloudinary.com/dqkb4ydrr/image/upload/v1704403234/lg5epz3kpqoulz8mfbnt.jpg',
      text: 'Hola mundo desde pruebas'
    }

    store.commit('journal/updateEntry', updatedEntry)

    const entries = store.state.journal.entries

    expect(entries.length).toBe(2)
    expect(entries).toContainEqual(updatedEntry)
  })

  test('mutation: addEntry - deleteEntry', () => {
    const store = createVuexStore(journalState)

    const newEntry = {
      id: 'ABC-123',
      text: 'Hola Mundo'
    }

    store.commit('journal/addEntry', newEntry)

    const entries = store.state.journal.entries

    expect(entries.length).toBe(3)
    expect(entries).toContainEqual(newEntry)

    store.commit('journal/deleteEntry', 'ABC-123')

    const updatedEntries = store.state.journal.entries

    expect(updatedEntries.length).toBe(2)
    expect(updatedEntries).not.toContainEqual(newEntry)
  })

  test('getters: getEntriesByTerm - getEntryById', () => {
    const store = createVuexStore(journalState)

    const [entry1, entry2] = journalState.entries

    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
    expect(store.getters['journal/getEntriesByTerm']('Vue').length).toBe(1)

    expect(store.getters['journal/getEntriesByTerm']('Vue')).toEqual([entry1])

    expect(store.getters['journal/getEntryById']('-NnJqfmqd1bxoKeE81Z-')).toEqual(entry2)
  })
})
