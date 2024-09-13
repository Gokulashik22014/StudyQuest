import mongoose from "mongoose";

const cardsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 65,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "todo",
      enum: ["todo", "doing", "done"],
    },
  },
  {
    timestamps: true,
  }
);

const CardsModel = mongoose.model("cards", cardsSchema);
export default CardsModel;
