module.exports = (mongoose) => {
  const Course = mongoose.model(
    "course",
    mongoose.Schema(
      {
        title: { type: String, required: true },
        price: {
          type: Number,
          required: true,
        },
        thumbnailUrl: {
          type: String,
          default:
            "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80",
        },
        videos: [
          {
            videoTitle: String,
            videoLink: String,
          },
        ],
      },
      { timestamps: true }
    ),
    "course"
  );

  return Course;
};
