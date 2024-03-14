const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
	cloud_name: 'dmyiiv5ce',
	api_key: '534875217376196',
	api_secret: process.env.CLOUDINARY_SECRET
});
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage =  new CloudinaryStorage({
  cloudinary,
  folder: 'surf-shop',
  allowedFormats: ['jpeg', 'jpg', 'png'],
  filename: function (req, file, cb) {
  	let buf = crypto.randomBytes(16);
  	buf = buf.toString('hex');
  	let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
  	uniqFileName += buf;
    cb(undefined, uniqFileName );
  }
});
module.exports = {
    cloudinary, 
    storage
}