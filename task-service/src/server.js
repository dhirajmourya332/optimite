require("dotenv").config();

//import app
const app = require("./app");
const PORT = process.env.PORT || 3002;

//start listning
app.listen(PORT, () => {
  console.log(`Task service is running on port ${PORT}`);
});
