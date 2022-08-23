export const get = (key) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, (result) =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result[key])
    )
  )

export const set = (key, data) =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set({ [key]: data }, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  )

// chrome.storage.sync.clear()
export const storeSync = (key, store) => {
  get(key).then((data) => {
    // load from chrome storage to svelte store if there is previously saved data
    if (data !== undefined) store.set(data)

    // copy data to chrome storage every time svelte store is updated
    store.subscribe((value) => {
      //   if (data !== value)
      set(key, value)
    })
  })
}
