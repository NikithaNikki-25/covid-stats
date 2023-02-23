const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const covidRoutes = require('./src/routes/covid');

const app = express();

// Body Parser Middleware
app.use(express.json())
app.use(bodyParser.json());

// DB Config
//const db = require('./src/db').mongoURI;

// Connect to MongoDB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/covid",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to MongoDB");
      }
    }
  );  


// Use Routes
app.use('/', covidRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));