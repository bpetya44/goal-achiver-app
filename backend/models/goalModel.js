const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
    {
    text: {
        type: String,
        require: [true, 'Please Add text value'],
    },
    },
    {timestamps: true}
)

module.exports = mongoose.model('Goal', goalSchema)