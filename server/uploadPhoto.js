import path  from 'path';
import multer from 'multer';

const storage = multer.diskStorage({destination: (req, file, cb) => {
    cb(null, './public/img');
}, filename: (req, file, cb) => {
    cb(null, Date.now + path.extname(file.originalname));
}
});

export const upload = multer({ storage: storage });
