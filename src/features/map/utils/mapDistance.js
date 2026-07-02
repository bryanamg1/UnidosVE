export function getDistanceKm(from, to) {
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

export function formatDistance(distanceKm) {
  return `${distanceKm.toFixed(1)} km`
}
