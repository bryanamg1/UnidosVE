export function adaptNeed(rawNeed) {
  return {
    id: rawNeed.id,
    centerId: rawNeed.centerId,
    title: rawNeed.title,
    summary: rawNeed.summary,
    category: rawNeed.category,
    urgency: rawNeed.urgency,
    status: rawNeed.status,
    unit: rawNeed.unit,
    updatedAt: rawNeed.updatedAt,
    baseProgress: {
      required: rawNeed.requiredQuantity,
      committed: rawNeed.committedQuantity,
      received: rawNeed.receivedQuantity,
      remaining: Math.max(
        rawNeed.requiredQuantity - rawNeed.committedQuantity - rawNeed.receivedQuantity,
        0,
      ),
    },
  }
}
