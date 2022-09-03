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

const relations = {}

export const storeSync = (key, store) => {
  relations[key] = store
  get(key).then((data) => {
    // load from chrome storage to svelte store if there is previously saved data
    if (data !== undefined) store.set(data)

    // copy data to chrome storage every time svelte store is updated
    store.subscribe((value) => {
      console.log("called")
      set(key, value)
    })
  })
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(`Storage change: ${namespace}.${key}`, oldValue, newValue)
    relations[key].set(newValue)
  }
})
