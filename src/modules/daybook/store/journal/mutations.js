// export const myMutation = (state) => {
//
// }

export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries]
  state.isLoading = false
}

export const updateEntry = (state, entry) => {
  state.entries = state.entries.map((e) => (e.id === entry.id ? entry : e))
}

export const addEntry = (state, entry) => {
  state.entries.unshift(entry)
}

export const deleteEntry = (state, id) => {
  state.entries = state.entries.filter((entry) => entry.id !== id)
}
