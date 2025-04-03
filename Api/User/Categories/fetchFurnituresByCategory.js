const { ObjectId } = require("mongodb");
const connectDb = require("../../../Db/connectDb");

async function fetchFurnitureByCategory(req, res) {
  try {
    const { category_id } = req.params;

    const db = await connectDb();

    const collection = db.collection("furnitures");

    const furniture = await collection
      .find({
        category_id: ObjectId.createFromHexString(category_id),
      })
      .toArray();

    if (furniture.length > 0) {
      res.status(200).json({
        success: true,
        message: "furniture fetched successfully.",
        furniture, // Send the list of furniture
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No furniture found for the given category.",
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

module.exports = fetchFurnitureByCategory;
