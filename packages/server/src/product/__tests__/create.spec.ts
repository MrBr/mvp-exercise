import request from "supertest";

import router from "../../router";
import { generateToken } from "../../auth";
import { jsonHeaders, startTestDbContainer } from "../../test";

import { buyer_0, seller } from "../../user/fixtures";
import { seedUsers } from "../../user/seeders";

describe("POST /product", () => {
  let stopContainer: () => Promise<void>;
  beforeEach(async () => {
    stopContainer = await startTestDbContainer();

    await seedUsers([buyer_0, seller]);
  });

  afterEach(async () => {
    await stopContainer();
  });

  it("returns a new product", async () => {
    const token = generateToken({ userId: seller.id });
    const productDetails = {
      productName: "product",
      amountAvailable: 5,
      cost: 10,
    };

    const depositResponse = await request(router)
      .post("/product")
      .set(jsonHeaders(token))
      .send(productDetails);

    const {
      productName,
      amountAvailable,
      cost,
      seller: productSeller,
    } = depositResponse.body.data;

    expect(depositResponse.statusCode).toEqual(200);
    expect(productSeller.id).toEqual(seller.id);
    expect(productName).toEqual(productDetails.productName);
    expect(amountAvailable).toEqual(productDetails.amountAvailable);
    expect(cost).toEqual(productDetails.cost);
  });

  it("returns an unauthorized request for anonymous user", async () => {
    const productDetails = {
      productName: "product",
      amountAvailable: 5,
      cost: 0,
    };

    const depositResponse = await request(router)
      .post("/product")
      .set(jsonHeaders())
      .send(productDetails);

    expect(depositResponse.statusCode).toEqual(401);
  });

  it("returns a bad request for a free product", async () => {
    const token = generateToken({ userId: seller.id });
    const productDetails = {
      productName: "product",
      amountAvailable: 5,
      cost: 0,
    };

    const depositResponse = await request(router)
      .post("/product")
      .set(jsonHeaders(token))
      .send(productDetails);

    expect(depositResponse.statusCode).toEqual(500);
  });

  it("returns a bad request for a invalid amount", async () => {
    const token = generateToken({ userId: seller.id });
    const productDetails = {
      productName: "product",
      amountAvailable: 6,
      cost: 1,
    };

    const depositResponse = await request(router)
      .post("/product")
      .set(jsonHeaders(token))
      .send(productDetails);

    expect(depositResponse.statusCode).toEqual(500);
  });

  it("returns a bad request for empty body", async () => {
    const token = generateToken({ userId: seller.id });

    const depositResponse = await request(router)
      .post("/product")
      .set(jsonHeaders(token))
      .send({});

    expect(depositResponse.statusCode).toEqual(500);
  });

  it("returns a bad request for buyer role", async () => {
    const token = generateToken({ userId: buyer_0.id });

    const productDetails = {
      productName: "product",
      amountAvailable: 5,
      cost: 1,
    };

    const depositResponse = await request(router)
      .post("/product")
      .set(jsonHeaders(token))
      .send(productDetails);

    expect(depositResponse.statusCode).toEqual(400);
  });

  it("returns a bad request for a duplicate", async () => {
    const token = generateToken({ userId: seller.id });

    const productDetails = {
      productName: "product",
      amountAvailable: 5,
      cost: 1,
    };

    await request(router)
      .post("/product")
      .set(jsonHeaders(token))
      .send(productDetails);

    const depositResponse = await request(router)
      .post("/product")
      .set(jsonHeaders(token))
      .send(productDetails);

    expect(depositResponse.statusCode).toEqual(500);
  });
});
