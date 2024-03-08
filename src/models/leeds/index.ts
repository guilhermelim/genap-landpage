import mongoose, { Document, Schema, Types } from "mongoose";

interface ILeeds extends Document {
  _id: Types.ObjectId;
  queryParams: Record<string, any>;
  selectedOptions: Record<string, any>[];
  fingerprinting: Record<string, any>;
}

const LeedsSchema: Schema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    queryParams: {
      type: Schema.Types.Mixed,
      required: true,
    },
    selectedOptions: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    fingerprinting: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

const LeedsModel =
  mongoose.models.Leeds || mongoose.model<ILeeds>("Leeds", LeedsSchema);

export default LeedsModel;
