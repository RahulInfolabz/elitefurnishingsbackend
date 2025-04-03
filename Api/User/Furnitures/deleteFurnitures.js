const connectDb = require("../../../Db/connectDb");

async function deleteProductsByCategory(req, res) {
  try {
    let { category_id } = req.params;

    if (!category_id) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    // Convert category_id to a number
    category_id = parseInt(category_id, 10);

    if (isNaN(category_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID. It must be a number.",
      });
    }

    const db = await connectDb();
    const collection = db.collection("furnitures");

    // Delete all products matching the given category_id
    const result = await collection.deleteMany({ category_id });

    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: `Successfully deleted ${result.deletedCount} products under category ${category_id}.`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No products found with the given category ID.",
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

module.exports = deleteProductsByCategory;
