const mongoose = require('mongoose');

const adSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: 'Product title is required!',
            trim: true
        },
        description:
        {
            type: String,
            trim: true
        },
        price:
        {
            type: Number,
            required: 'Product price is required!',
            trim: true
        }
    }
)

module.exports = mongoose.model('classified-ads', adSchema);