const multer = require('multer');
const path = require('path');

// Set up multer storage configuration
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/uploads/')
	},
	filename: function (req, file, cb) {
		const extension = path.extname(file.originalname);
		cb(null, file.fieldname + '-' + Date.now() + extension)
	}
});

// Set up multer middleware
const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		cb(null, true);
	}
});

module.exports = upload;
