const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    brand: {
        type: String,
        required: [true, 'Brand is mandatory'],
        minlength: [3, 'Min.3 characters'],
        maxlength: [10, 'Max. 10 characters']
    },
    model: { type: String, required: [true, 'Model is mandatory'] },
    price: { type: Number, required: [true, 'Price is a required field'] },
    inStock: { type: Boolean, default: false },
    category: { type: String, required: [true, 'Category is required'] },
    discount: { type: Number, default: 0 }
});

module.exports = mongoose.model('product', productSchema);