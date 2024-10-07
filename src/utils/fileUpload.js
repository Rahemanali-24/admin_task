import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/companyLogos');
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'), false);
    }
    cb(null, true);
  };


const upload = multer({
    storage,
    fileFilter,
  });

export default upload;

