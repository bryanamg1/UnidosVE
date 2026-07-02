export function readStorageItem(storageKey, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey)

    if (!rawValue) {
      return fallbackValue
    }

    return JSON.parse(rawValue)
  } catch {
    return fallbackValue
  }
}

export function writeStorageItem(storageKey, value) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(storageKey, JSON.stringify(value))
}

export function removeStorageItem(storageKey) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(storageKey)
}
