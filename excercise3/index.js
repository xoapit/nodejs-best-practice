const express = require("express");
const app = express();

const ProductService = require("./service-final");

const port = process.env.PORT || 3000;

require("dotenv").config();

app.get("/", async (req, res, next) => {
  try {
    console.log("Get products was invoked");
    const result = await new ProductService().getUserProducts({});
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
  }

  if (err.isOperational) {
    return res
      .status(err.httpCode ? err.httpCode : 500)
      .json(getFriendlyResponse(err));
  }

  return res.status(500).json({
    message: "Unexpected error has occurred.",
    stack: err.message,
  });
});

function getFriendlyResponse(error) {
  return {
    name: error.name,
    message: error.message,
  }; // ||error.message if comes as status code
}
