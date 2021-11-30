const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProdSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    realPrice: { type: Number, required: true },
    marca: { type: String, required: true },
    type: { type: String, required: true }
});

module.exports = mongoose.model('products', ProdSchema);