import request from "supertest";

import router from "../../router";
import User from "../user.model";
import { InvalidDepositError } from "../errors";

const userCreds = { username: "test", password: "test", role: "buyer" };

beforeEach(async () => {
  await request(router)
    .post("/user")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send(userCreds);
});

afterEach(async () => {
  await User.destroy({ where: {} });
});

describe("PUT /deposit", () => {
  it("returns new deposit value", async () => {
    const authResponse = await request(router)
      .post("/authorise")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(userCreds);

    const depositResponse = await request(router)
      .put("/deposit")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authResponse.body.data}`)
      .send({ coins: 5 });

    expect(depositResponse.statusCode).toEqual(200);
    expect(depositResponse.body.data).toEqual(5);
  });
  it("returns invalid value error", async () => {
    const authResponse = await request(router)
      .post("/authorise")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(userCreds);

    const depositResponse = await request(router)
      .put("/deposit")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authResponse.body.data}`)
      .send({ coins: 6 });

    const errorMessage = new InvalidDepositError().message;
    expect(depositResponse.statusCode).toEqual(400);
    expect(depositResponse.body.error).toEqual(errorMessage);
  });
  it("returns forbidden request status", async () => {
    const depositResponse = await request(router)
      .put("/deposit")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send({ coins: 6 });

    expect(depositResponse.statusCode).toEqual(401);
  });
  it("returns bad request status", async () => {
    const authResponse = await request(router)
      .post("/authorise")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(userCreds);

    const depositResponse = await request(router)
      .put("/deposit")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authResponse.body.data}`)
      .send();

    expect(depositResponse.statusCode).toEqual(400);
  });
});
