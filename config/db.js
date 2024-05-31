const mongoose = require("mongoose");


function connectDB() {
  mongoose
    .connect("mongodb+srv://shivaramyadav12:NIX0ASJ9J9N0zg9W@cluster0.ylnvvpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to the database");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = connectDB();