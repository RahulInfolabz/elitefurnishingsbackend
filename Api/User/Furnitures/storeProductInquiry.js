const connectDb = require("../../../Db/connectDb");

async function AddProductInquiry(req, res) {
  try {
    const db = await connectDb();
    const collection = db.collection("FurnitureInquiry");

    const { furnitureId, username, email, subject, phone, message } = req.body;

    if (!furnitureId || !username || !subject || !email || !phone || !message) {
      res.status(404).json({
        success: false,
        message: "All Field Are Required",
      });
    }

    await collection.insertOne({
      furnitureId,
      username,
      email,
      phone,
      subject,
      message,
      status: "Pending",
      timestamp: new Date(),
    });

    return res
      .status(201)
      .json({ success: true, message: "Furniture Inquiry Submitted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { AddProductInquiry };
