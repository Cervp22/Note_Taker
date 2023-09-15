const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(htmlRoutes);
app.use(apiRoutes);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
