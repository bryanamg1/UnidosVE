export function calculateDistanceKm(from, to) {
  const earthRadiusKm = 6371
  const toRadians = (value) => (value * Math.PI) / 180

  const deltaLat = toRadians(to.lat - from.lat)
  const deltaLng = toRadians(to.lng - from.lng)
  const startLat = toRadians(from.lat)
  const endLat = toRadians(to.lat)

  const haversine =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(startLat) *
      Math.cos(endLat) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2)

  const arc = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))

  return earthRadiusKm * arc
}

export function getDistanceKm(from, to) {
  return calculateDistanceKm(from, to)
}

export function sortByDistance(items, getDistanceValue) {
  return [...items].sort((left, right) => {
    const leftDistance = getDistanceValue(left)
    const rightDistance = getDistanceValue(right)

    if (leftDistance === null && rightDistance === null) {
      return 0
    }

    if (leftDistance === null) {
      return 1
    }

    if (rightDistance === null) {
      return -1
    }

    return leftDistance - rightDistance
  })
}

export function formatDistance(distanceKm) {
  return `${distanceKm.toFixed(1)} km`
}
