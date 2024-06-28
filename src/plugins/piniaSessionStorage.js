export function createPiniaSessionStoragePlugin(key = 'piniaStore') {
  return (context) => {
    const { store } = context

    // Load initial state from sessionStorage
    const storedState = sessionStorage.getItem(key)
    if (storedState) {
      store.$patch(JSON.parse(storedState))
    }

    // Subscribe to store changes and save them to sessionStorage
    store.$subscribe((mutation, state) => {
      sessionStorage.setItem(key, JSON.stringify(state))
    })
  }
}
