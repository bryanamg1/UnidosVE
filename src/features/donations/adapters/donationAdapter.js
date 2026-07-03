export function adaptDonation(rawDonation) {
  return {
    id: rawDonation.id,
    needId: rawDonation.needId,
    centerId: rawDonation.centerId,
    donorId: rawDonation.donorId,
    donorName: rawDonation.donorName ?? rawDonation.donor?.name ?? '',
    amount: Number(rawDonation.amount ?? rawDonation.quantity ?? 0),
    unit: rawDonation.unit,
    status: rawDonation.status,
    note: rawDonation.note ?? rawDonation.message ?? '',
    createdAt: rawDonation.createdAt ?? rawDonation.updatedAt ?? new Date().toISOString(),
  }
}
