import { centersMock } from '../mocks/centers.mock'
import { adaptCenter } from '../adapters/centerAdapter'

function wait(delayMs = 220) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayMs)
  })
}

export const centersService = {
  async getPublicCenters() {
    await wait()
    return centersMock.map(adaptCenter)
  },
}
