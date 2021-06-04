const express = require("express");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(cors());


app.use("/modules", require("./routes/modules"));
app.use("/etatModules", require("./routes/etatModules"));


app.listen(4545, () => {

    console.log("server ok !");

})