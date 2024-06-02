const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');
const mongoosePaginate = require('mongoose-paginate-v2');

const PostSchema = new Schema({
    title: String,
    price: String,
    description: String,
    images: [{ path: String, filename: String }],
    location: String,
    length: Number,      // Added length
    width: Number,       // Added width
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    properties: {
        description: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    avgRating: { type: Number, default: 0 }
});

// Middleware to remove associated reviews when a post is deleted
PostSchema.pre('remove', async function(next) {
    try {
        await Review.deleteMany({
            _id: {
                $in: this.reviews
            }
        });
        next();
    } catch (err) {
        next(err);
    }
});

// Method to calculate the average rating of a post
PostSchema.methods.calculateAvgRating = async function() {
    if (this.reviews.length) {
        const reviews = await Review.find({
            _id: { $in: this.reviews }
        });
        const ratingsTotal = reviews.reduce((sum, review) => sum + review.rating, 0);
        this.avgRating = Math.round((ratingsTotal / reviews.length) * 10) / 10;
    } else {
        this.avgRating = 0;
    }
    await this.save();
    return Math.floor(this.avgRating);
};

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);
