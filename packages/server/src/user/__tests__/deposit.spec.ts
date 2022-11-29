import request from "supertest";

import router from "../../router";
import { InvalidDepositError } from "../errors";
import { generateToken } from "../../auth";
import { jsonHeaders, startTestDbContainer } from "../../test";

import { buyer_0, buyer_50, seller } from "../fixtures";
import { seedUsers } from "../seeders";

describe("PUT /deposit", () => {
  let stopContainer: () => Promise<void>;
  beforeEach(async () => {
    stopContainer = await startTestDbContainer();

    await seedUsers([buyer_0, buyer_50, seller]);
  });

  afterEach(async () => {
    await stopContainer();
  });

  it("returns new deposit value", async () => {
    const token = generateToken({ userId: buyer_0.id });

    const depositResponse = await request(router)
      .put("/deposit")
      .set(jsonHeaders(token))
      .send({ coins: 5 });

    expect(depositResponse.statusCode).toEqual(200);
    expect(depositResponse.body.data).toEqual(5);
  });

  it("returns invalid value error", async () => {
    const token = generateToken({ userId: buyer_0.id });

    const depositResponse = await request(router)
      .put("/deposit")
      .set(jsonHeaders(token))
      .send({ coins: 6 });

    const errorMessage = new InvalidDepositError().message;
    expect(depositResponse.statusCode).toEqual(400);
    expect(depositResponse.body.error).toEqual(errorMessage);
  });

  it("returns forbidden request when trying to deposit on unexisting account", async () => {
    const token = generateToken({ userId: 100 });

    const depositResponse = await request(router)
      .put("/deposit")
      .set(jsonHeaders(token))
      .send({ coins: 5 });

    expect(depositResponse.statusCode).toEqual(401);
  });

  it("returns forbidden request status without token", async () => {
    const depositResponse = await request(router)
      .put("/deposit")
      .set(jsonHeaders())
      .send({ coins: 5 });

    expect(depositResponse.statusCode).toEqual(401);
  });

  it("returns bad request status without data", async () => {
    const token = generateToken({ userId: buyer_0.id });

    const depositResponse = await request(router)
      .put("/deposit")
      .set(jsonHeaders(token))
      .send();

    expect(depositResponse.statusCode).toEqual(400);
  });

  it("returns bad request status with wrong data type", async () => {
    const token = generateToken({ userId: buyer_0.id });

    const depositResponse = await request(router)
      .put("/deposit")
      .set(jsonHeaders(token))
      .send({ coins: "5" });

    expect(depositResponse.statusCode).toEqual(400);
  });

  it("returns bad request status for seller role", async () => {
    const token = generateToken({ userId: seller.id });

    const depositResponse = await request(router)
      .put("/deposit")
      .set(jsonHeaders(token))
      .send({ coins: 5 });

    expect(depositResponse.statusCode).toEqual(400);
  });
});
