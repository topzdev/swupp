import { Schema, model } from "mongoose";

const addressSchema = new Schema({
  fullname: String,
  phoneNumber: String,
  postalCode: String,
  province: String,
  region: String,
  city: String,
  barangay: String,
  buildingNo: String,
  isDefaultAddress: Boolean,
});

export default model("Address", addressSchema);
