import { GenericContainer } from "testcontainers";
import db, { config } from "../db";
import { QueryInterface } from "sequelize";

export const jsonHeaders = (token?: string) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const startTestDbContainer = async () => {
  const container = await new GenericContainer("preloaded_db:latest")
    .withEnvironment({
      POSTGRES_USER: config.username,
      POSTGRES_PASSWORD: config.password,
    })
    .withExposedPorts({ container: 5432, host: config.port })
    .start();

  return async () => {
    await container.stop({ removeVolumes: true });
  };
};

export const runSeed = async (
  dynamicImport: () => Promise<{
    default: {
      up: (queryInterface: QueryInterface) => Promise<void>;
    };
  }>
) => {
  const module = await dynamicImport();
  await module.default.up(db.getQueryInterface());
};
