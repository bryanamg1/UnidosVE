export function adaptCenter(rawCenter) {
  return {
    id: rawCenter.id,
    ownerUserId: rawCenter.ownerUserId ?? null,
    name: rawCenter.name,
    type: rawCenter.type,
    description: rawCenter.description,
    address: rawCenter.address,
    city: rawCenter.city,
    latitude: rawCenter.latitude,
    longitude: rawCenter.longitude,
    coordinates: {
      lat: rawCenter.latitude,
      lng: rawCenter.longitude,
    },
    contactPhone: rawCenter.contactPhone,
    contactEmail: rawCenter.contactEmail,
    contact: {
      phone: rawCenter.contactPhone,
      email: rawCenter.contactEmail,
    },
    managerName: rawCenter.managerName,
    authorizationProfile: rawCenter.authorizationProfile ?? '',
    privateCode: rawCenter.privateCode ?? '',
    schedule: rawCenter.schedule,
    activeNeeds: rawCenter.activeNeeds,
    activeNeedsCount: rawCenter.activeNeeds.length,
  }
}
