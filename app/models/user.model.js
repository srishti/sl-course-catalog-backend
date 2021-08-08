module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true, dropDups: true },
        password: { type: String, required: true },
        isLoggedIn: Boolean,
        token: String,
      },
      { timestamps: true }
    )
  );

  return User;
};
