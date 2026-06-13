export async function batchPromises(items, fn, batchSize = 15) {
  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    await Promise.all(chunk.map((item) => fn(item)));
  }
}
