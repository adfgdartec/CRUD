const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
title: String,
price: String,
description: String,
images: [ { url: String, public_id : String} ],
location: String,
lat: Number,
lng: Number,
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
reviews: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }
]

});

module.exports = mongoose.model('Post', postSchema);








/* 
Post 
title - string
price - string 
description - string
images - array of strings
location - string
lat - int/float 
lng - int/float
author - Object id (ref to User)
reviews - array of objects
*/