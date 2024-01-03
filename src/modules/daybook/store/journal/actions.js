import journalApi from '@/api/journalApi'

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get('/entries.json')

  if (!data) {
    commit('setEntries', [])
    return
  }

  const entries = []

  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id]
    })
  }

  commit('setEntries', entries)
}

export const updateEntry = async ({ commit }, entry) => {
  const { id, ...entryData } = entry
  await journalApi.put(`/entries/${id}.json`, entryData)

  commit('updateEntry', { ...entry })
}

export const createEntry = async ({ commit }, entry) => {
  const { data } = await journalApi.post(`/entries.json`, entry)

  commit('addEntry', { id: data.name, ...entry })
  return data.name
}

export const deleteEntry = async ({ commit }, id) => {
  console.log({ id })

  await journalApi.delete(`/entries/${id}.json`)

  commit('deleteEntry', id)
}
