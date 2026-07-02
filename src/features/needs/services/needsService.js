import { needsMock } from '../mocks/needs.mock'
import { adaptNeed } from '../adapters/needAdapter'

function wait(delayMs = 180) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs)
  })
}

export const needsService = {
  async getPublishedNeeds() {
    await wait()
    return needsMock.map(adaptNeed)
  },
}
