const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let inventorySchema = new Schema({
  category: {
    type: String
  },  
  name: {
    type: String
  },
  qty: {
    type: Number
  },
  price: {
    type: Number
  },

});

module.exports = mongoose.model("inventorySchema", inventorySchema);
