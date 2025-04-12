const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create an absolute path to the uploads folder based on the current file directory.
        const uploadPath = path.join(__dirname, '../uploads');
        // Ensure that the uploads folder exists; if not, create it.
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        // Sanitize the original filename to remove spaces or problematic characters, if needed.
        const sanitizedFilename = file.originalname.replace(/\s+/g, '_');
        cb(null, `${Date.now()}-${sanitizedFilename}`);
      }
  });
  
exports.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      // Only allow image files (jpeg, jpg, png)
      const filetypes = /jpeg|jpg|png/;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (extname && mimetype) {
        return cb(null, true);
      } else {
        cb(new Error("Only image files (jpeg, jpg, png) are allowed"));
      }
    }
  });