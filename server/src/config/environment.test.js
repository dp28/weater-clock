const { validateConfig } = require("./index");

function mockExecGitSync({ returnValue }) {
  return (command) => {
    if (command !== "git rev-parse HEAD") {
      throw new Error("Incorrect command executed");
    }
    return returnValue;
  };
}

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

  it("should have a deployedAt date", () => {
    expect(config.deployedAt).toBeInstanceOf(Date);
  });
}

describe("development", () => {
  const fakeSHA = "fake_sha";
  const config = require("./environment/development").buildConfig({
    execSync: mockExecGitSync({ returnValue: fakeSHA }),
  });

  itShouldBehaveLikeAConfig(config);

  it("should include the environment name", () => {
    expect(config.environment).toEqual("DEVELOPMENT");
  });

  it("should be the current git SHA", () => {
    expect(config.version).toEqual(fakeSHA);
  });
});

describe("production", () => {
  const version = "fake_version";
  const deployedAt = new Date().toISOString();
  const config = require("./environment/production").buildConfig({
    readFileSync: (path) => {
      if (path !== "./deploymentStats.json") {
        throw new Error("Incorrect file read");
      }
      return JSON.stringify({ version, deployedAt });
    },
    environment: {
      HEROKU_API_KEY: "fake",
      HEROKU_MONGO_ADDON_ID: "fake",
    },
  });

  itShouldBehaveLikeAConfig(config);

  it("should include the environment name", () => {
    expect(config.environment).toEqual("PRODUCTION");
  });

  it("should be the loaded version", () => {
    expect(config.version).toEqual(version);
  });
});

describe("test", () => {
  const config = require("./environment/test").buildConfig();

  itShouldBehaveLikeAConfig(config);

  it("should include the environment name", () => {
    expect(config.environment).toEqual("TEST");
  });

  it("should have a preset test version", () => {
    expect(config.version).toEqual("test");
  });
});
