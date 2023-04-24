const mongoose = require("mongoose");

const URI =
  "mongodb+srv://attit11:attit@task-manager-cluster.1b1v70k.mongodb.net/myunsplash";

mongoose
  .connect(URI)
  .then(() => console.log("🚀 Connected to database!"))
  .catch((e) => console.log("❌Error connecting to database! ", e));
