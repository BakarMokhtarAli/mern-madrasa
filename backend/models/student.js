import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    StdID: {
      type: Number,
      unique: true,
    },
    full_name: {
      type: String,
      required: [true, "username is required"],
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    parent_name: {
      type: String,
      required: [true, "parent name is required"],
    },
    contact: {
      type: Number,
      required: [true, "parent number is required"],
      unique: true,
    },
    password: {
      type: String,
      default: "1122",
    },
    balance: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// auto increment id for student
studentSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const lastUser = await this.constructor.findOne(
        {},
        {},
        { sort: { StdID: -1 } }
      );
      if (lastUser && lastUser.StdID) {
        this.StdID = lastUser.StdID + 1;
      } else {
        this.StdID = 1000;
      }
    } catch (error) {
      return next(error);
    }
  }
  next();
});

studentSchema.pre("save", function (next) {
  // Convert createdAt to local date string
  const localCreatedAt = new Date(this.createdAt).toLocaleString();
  if (this.isNew) {
    this.createdAt = localCreatedAt; // set createdAt field for new documents
  } else {
    this.updatedAt = localCreatedAt; // update updatedAt field for existing documents
  }

  next();
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
