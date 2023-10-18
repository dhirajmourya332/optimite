require("dotenv").config();
const app = require("./app");
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Authentication service is running on port ${PORT}`);
});

//TODO include cluster module to respawn the server after exit
