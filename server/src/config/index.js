const Joi = require("@hapi/joi");

const ConfigSchema = Joi.object().keys({
  environment: Joi.string(),
  deployedAt: Joi.date(),
  version: Joi.string(),
  weatherRepository: Joi.any(),
  allowedDomain: Joi.string(),
});

function validateConfig(config) {
  const { value, error } = ConfigSchema.validate(config, {
    presence: "required",
    convert: true,
  });
  if (error) {
    throw error;
  }
  return value;
}

const environment = process.env.NODE_ENV;
const unvalidatedConfig = require(`./environment/${environment}`).buildConfig();
const config = validateConfig(unvalidatedConfig);

if (config.environment !== "TEST") {
  console.log("Using environment:", config.environment);
}

module.exports = {
  validateConfig,
  ...config,
};
