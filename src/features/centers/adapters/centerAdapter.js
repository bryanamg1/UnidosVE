export function adaptCenter(rawCenter) {
  return {
    id: rawCenter.id,
    name: rawCenter.name,
    type: rawCenter.type,
    description: rawCenter.description,
    address: rawCenter.address,
    city: rawCenter.city,
    coordinates: {
      lat: rawCenter.latitude,
      lng: rawCenter.longitude,
    },
    contact: {
      phone: rawCenter.contactPhone,
      email: rawCenter.contactEmail,
    },
    managerName: rawCenter.managerName,
    schedule: rawCenter.schedule,
    activeNeeds: rawCenter.activeNeeds,
    activeNeedsCount: rawCenter.activeNeeds.length,
  }
}
