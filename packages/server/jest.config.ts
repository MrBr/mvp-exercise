export default {
  clearMocks: true,
  coverageProvider: "v8",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  // Needed to prevent port collisions
  maxConcurrency: 1,
  maxWorkers: 1,

  roots: ["<rootDir>/src"],

  setupFilesAfterEnv: ["./src/setup.jest.ts"],

  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
