export function adaptNeed(rawNeed) {
  const requiredQuantity = Number(rawNeed.requiredQuantity ?? rawNeed.required ?? 0)
  const committedQuantity = Number(rawNeed.committedQuantity ?? rawNeed.committed ?? 0)
  const receivedQuantity = Number(rawNeed.receivedQuantity ?? rawNeed.received ?? 0)

  return {
    id: rawNeed.id,
    centerId: rawNeed.centerId,
    title: rawNeed.title,
    summary: rawNeed.summary ?? rawNeed.description ?? '',
    category: rawNeed.category,
    urgency: rawNeed.urgency,
    status: rawNeed.status,
    unit: rawNeed.unit,
    updatedAt: rawNeed.updatedAt ?? rawNeed.createdAt ?? new Date().toISOString(),
    baseProgress: {
      required: requiredQuantity,
      committed: committedQuantity,
      received: receivedQuantity,
      remaining: Math.max(
        requiredQuantity - committedQuantity - receivedQuantity,
        0,
      ),
    },
  }
}
