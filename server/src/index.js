const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/forecast", (request, response) => {
  response.json({ hello: "world" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
