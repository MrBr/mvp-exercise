import request from "supertest";

import router from "../../router";
import { generateToken } from "../../auth";
import { jsonHeaders, startTestDbContainer } from "../../test";

import { bottle_0_5, bottle_5_5 } from "../../product/fixtures";
import { seedProducts } from "../../product/seeders";
import { buyer_0, buyer_50, seller } from "../../user/fixtures";
import { seedUsers } from "../../user/seeders";

describe("POST /buy", () => {
  let stopContainer: () => Promise<void>;
  beforeEach(async () => {
    stopContainer = await startTestDbContainer();

    await seedUsers([buyer_0, buyer_50, seller]);
    await seedProducts([bottle_0_5, bottle_5_5]);
  });

  afterEach(async () => {
    await stopContainer();
  });

  it("returns bad request without sufficient funds", async () => {
    const token = generateToken({ userId: buyer_0.id });

    const depositResponse = await request(router)
      .post("/buy")
      .set(jsonHeaders(token))
      .send({ productId: bottle_5_5.id, amount: 5 });

    expect(depositResponse.statusCode).toEqual(400);
  });
});
