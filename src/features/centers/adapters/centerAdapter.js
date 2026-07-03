export function adaptCenter(rawCenter) {
  const latitude = Number(rawCenter.latitude ?? rawCenter.coordinates?.lat ?? 0)
  const longitude = Number(rawCenter.longitude ?? rawCenter.coordinates?.lng ?? 0)
  const activeNeeds = Array.isArray(rawCenter.activeNeeds) ? rawCenter.activeNeeds : []

  return {
    id: rawCenter.id,
    ownerUserId: rawCenter.ownerUserId ?? null,
    name: rawCenter.name,
    type: rawCenter.type,
    description: rawCenter.description,
    address: rawCenter.address,
    city: rawCenter.city,
    latitude,
    longitude,
    coordinates: {
      lat: latitude,
      lng: longitude,
    },
    contactPhone: rawCenter.contactPhone ?? rawCenter.contact?.phone ?? '',
    contactEmail: rawCenter.contactEmail ?? rawCenter.contact?.email ?? '',
    contact: {
      phone: rawCenter.contactPhone ?? rawCenter.contact?.phone ?? '',
      email: rawCenter.contactEmail ?? rawCenter.contact?.email ?? '',
    },
    managerName: rawCenter.managerName ?? '',
    authorizationProfile: rawCenter.authorizationProfile ?? '',
    privateCode: rawCenter.privateCode ?? '',
    schedule: rawCenter.schedule ?? '',
    activeNeeds,
    activeNeedsCount: rawCenter.activeNeedsCount ?? activeNeeds.length,
  }
}
