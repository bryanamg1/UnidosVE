export function adaptDonation(rawDonation) {
  return {
    id: rawDonation.id,
    needId: rawDonation.needId,
    centerId: rawDonation.centerId,
    donorId: rawDonation.donorId,
    donorName: rawDonation.donorName,
    amount: rawDonation.amount,
    unit: rawDonation.unit,
    status: rawDonation.status,
    note: rawDonation.note,
    createdAt: rawDonation.createdAt,
  }
}
