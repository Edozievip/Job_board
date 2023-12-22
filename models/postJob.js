const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
    job_description: {
      type: String,
      required: true,
      // unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostJobModels = mongoose.model("job_post", adSchema);

module.exports = PostJobModels;
