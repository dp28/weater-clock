"use strict";

module.exports.forecast = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function was executed successfully!",
      },
      null,
      2
    ),
  };
};
