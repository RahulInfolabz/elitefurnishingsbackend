const { ObjectId } = require("mongodb");
const connectDb = require("../../../Db/connectDb");

async function fetchFurnitureById(req, res) {
  try {
    // Get the _id from the URL params
    const { furniture_id } = req.params;

    // Connect to the database
    const db = await connectDb();

    // Get the furnitures collection
    const collection = db.collection("furnitures");

    // Check if furniture_id is a valid ObjectId
    if (!ObjectId.isValid(furniture_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid furniture ID format.",
      });
    }

    // Query to find the furniture by _id
    const furniture = await collection.findOne({
      _id: new ObjectId(furniture_id),
    });

    // Check if the furniture exists
    if (furniture) {
      res.status(200).json({
        success: true,
        message: "furniture fetched successfully.",
        furniture,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No furniture found with the given ID.",
      });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred on the server.",
      message: "Internal Server Error. Please try again later.",
    });
  }
}

module.exports = fetchFurnitureById;
