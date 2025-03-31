const connectDb = require("../../../Db/connectDb");

async function insertFurniture(req, res) {
  try {
    // Get database
    const db = await connectDb();

    // Get collection
    const collection = db.collection("furnitures");

    const {
      name,
      category_id,
      type,
      description,
      price,
      discount,
      stock_quantity,
      images,
      material,
      dimensions,
      weight,
      color,
      brand,
      warranty_period,
      delivery_time,
      return_policy,
      featured,
      tags,
    } = req.body;

    // Insert furnitures
    const insert = await collection.insertOne({
      name,
      category_id,
      type,
      description,
      price,
      discount,
      stock_quantity,
      images,
      material,
      dimensions,
      weight,
      color,
      brand,
      warranty_period,
      delivery_time,
      return_policy,
      featured,
      tags,
    });

    if (insert.acknowledged) {
      res.status(201).json({
        success: true,
        message: "Data inserted successfully.",
        data: insert.insertedId,
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Failed to insert data.",
        message:
          "Data insertion was unsuccessful. Please check the request and try again.",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = insertFurniture;
