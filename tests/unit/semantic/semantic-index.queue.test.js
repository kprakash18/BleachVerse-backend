import { describe, it, expect, afterAll } from "vitest";
import { queueReindexEntity, queueDeleteEntity, getSemanticIndexQueue } from "../../../src/queues/semantic-index.queue.js";
import { semanticIndexService } from "../../../src/services/semantic/semantic-index.service.js";

describe("SemanticIndexQueue & Service (BullMQ)", () => {
  afterAll(async () => {
    const queue = getSemanticIndexQueue();
    await queue.close();
  });

  it("should enqueue a reindex-entity job with deduplication ID", async () => {
    const fakeId = "e92d104c-e7ca-41f8-b2cb-6b6e7a4a37aa";
    const job = await queueReindexEntity("CHARACTER", fakeId);

    expect(job).not.toBeNull();
    expect(job.name).toBe("reindex-entity");
    expect(job.data).toEqual({ entityType: "CHARACTER", entityId: fakeId });
    expect(job.opts.jobId).toBe(`reindex:CHARACTER:${fakeId}`);
  });

  it("should enqueue a delete-entity job", async () => {
    const fakeId = "631c15d0-b1d8-4257-bf45-9ae10b98f3b1";
    const job = await queueDeleteEntity("FIGHT", fakeId);

    expect(job).not.toBeNull();
    expect(job.name).toBe("delete-entity");
    expect(job.data).toEqual({ entityType: "FIGHT", entityId: fakeId });
  });

  it("should dispatch jobs through SemanticIndexService without throwing", async () => {
    await expect(
      semanticIndexService.reindexEntity("CHARACTER", "e92d104c-e7ca-41f8-b2cb-6b6e7a4a37aa")
    ).resolves.not.toThrow();

    await expect(
      semanticIndexService.deleteEntityEmbedding("QUOTE", "00000000-0000-4000-8000-000000000000")
    ).resolves.not.toThrow();
  });
});
