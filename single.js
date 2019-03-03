const createServer = require("./app");
const { PORT = "3000" } = process.env;

createServer().listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
