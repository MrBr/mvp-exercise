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

  it("returns change, products and total", async () => {
    const token = generateToken({ userId: buyer_50.id });
    const amount = 1;

    const depositResponse = await request(router)
      .post("/buy")
      .set(jsonHeaders(token))
      .send({ productId: bottle_5_5.id, amount });

    const { data } = depositResponse.body;

    expect(depositResponse.statusCode).toEqual(200);
    expect(data.total).toEqual(bottle_5_5.cost * amount);
    // 1 of 5 and 2 of 20
    expect(data.change).toEqual([1, 0, 2, 0, 0]);
    expect(data.products).toEqual([bottle_5_5.productName]);
  });

  it("returns bad request if seller is trying to buy", async () => {
    const token = generateToken({ userId: seller.id });
    const amount = 1;

    const depositResponse = await request(router)
      .post("/buy")
      .set(jsonHeaders(token))
      .send({ productId: bottle_5_5.id, amount });

    expect(depositResponse.statusCode).toEqual(400);
  });

  it("returns forbidden request if user unauthorized", async () => {
    const amount = 1;

    const depositResponse = await request(router)
      .post("/buy")
      .set(jsonHeaders())
      .send({ productId: bottle_5_5.id, amount });

    expect(depositResponse.statusCode).toEqual(401);
  });

  it("returns bad request if there aren't enough available products", async () => {
    const token = generateToken({ userId: buyer_50.id });
    const amount = 1;

    const depositResponse = await request(router)
      .post("/buy")
      .set(jsonHeaders(token))
      .send({ productId: bottle_0_5.id, amount });

    expect(depositResponse.statusCode).toEqual(400);
  });

  it("returns bad request without sufficient funds", async () => {
    const token = generateToken({ userId: buyer_0.id });

    const depositResponse = await request(router)
      .post("/buy")
      .set(jsonHeaders(token))
      .send({ productId: bottle_5_5.id, amount: 5 });

    expect(depositResponse.statusCode).toEqual(400);
  });

  it("returns bad request if product doesn't exists", async () => {
    const token = generateToken({ userId: buyer_50.id });
    const amount = 1;

    const depositResponse = await request(router)
      .post("/buy")
      .set(jsonHeaders(token))
      .send({ productId: 100, amount });

    expect(depositResponse.statusCode).toEqual(400);
  });
});
