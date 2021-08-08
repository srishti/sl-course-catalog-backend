module.exports = (mongoose) => {
  const Order = mongoose.model(
    "order",
    mongoose.Schema(
      {
        userId: { type: String, required: true },
        courseId: { type: String, required: true },
        otp: { type: String, required: true },
      },
      { timestamps: true }
    )
  );

  return Order;
};
