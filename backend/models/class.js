import mongoose from "mongoose";

import { formatDistanceToNow, parse } from "date-fns";

// Utility function to format date using local time
const formatDate = (date) => {
  const time = date.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    hourCycle: "h12",
    second: "numeric",
  });

  return time;
};

const classSchema = mongoose.Schema(
  {
    class_name: {
      type: String,
      required: [true, "class name is required"],
      unique: true,
    },
    // createdAt: {
    //   type: String,
    //   default: formatDate(new Date()),
    // },
    // updatedAt: {
    //   type: String,
    //   //  default: formatDate(new Date()),
    // },
  },
  { timestamps: true }
);

classSchema.pre("save", function (next) {
  // Convert createdAt to local date string
  const localCreatedAt = new Date(this.createdAt).toLocaleString();
  if (this.isNew) {
    this.createdAt = localCreatedAt; // set createdAt field for new documents
  } else {
    this.updatedAt = localCreatedAt; // update updatedAt field for existing documents
  }

  next();
});

classSchema.virtual("students", {
  ref: "Student",
  localField: "_id",
  foreignField: "class",
});

classSchema.set("toJSON", { virtuals: true });
classSchema.set("toObject", { virtuals: true });

const Class = mongoose.model("Class", classSchema);
export default Class;
