const db = require("./db");
const app = require("./app.js");

const PORT = process.env.PORT || 8000;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
