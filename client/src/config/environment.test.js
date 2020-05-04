import { validateConfig } from "./index";

describe("validateConfig", () => {
  it("throws an error if a key is missing", () => {
    expect(() => {
      validateConfig({});
    }).toThrow();
  });
});

function itShouldBehaveLikeAConfig(config) {
  it("should be valid", () => {
    expect(() => {
      validateConfig(config);
    }).not.toThrow();
  });
}

describe("local", () => {
  const config = require("./environment/local").buildConfig();

  itShouldBehaveLikeAConfig(config);

  it("should include the environment name", () => {
    expect(config.environment).toEqual("LOCAL");
  });
});

describe("production", () => {
  const config = require("./environment/production").buildConfig();

  itShouldBehaveLikeAConfig(config);

  it("should include the environment name", () => {
    expect(config.environment).toEqual("PRODUCTION");
  });
});

describe("test", () => {
  const config = require("./environment/test").buildConfig();

  itShouldBehaveLikeAConfig(config);

  it("should include the environment name", () => {
    expect(config.environment).toEqual("TEST");
  });
});
