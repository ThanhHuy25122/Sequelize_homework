const express = require("express");
const app = express();
app.use(express.json());

// yarn add cors
const cors = require("cors");
app.use(cors());

// tạo server localhost với port 8080 => localhost:8080
app.listen(8080);

const rootRouter = require("./routes/rootRoute");
app.use("/api", rootRouter);

// yarn sequelize-auto -h localhost -d db_food -u root -x 1234 -p 3308 --dialect mysql -o ./src/models -l es6
