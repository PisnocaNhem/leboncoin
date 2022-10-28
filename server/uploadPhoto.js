import path  from 'path';
import multer from 'multer';
import { uuid } from 'uuidv4';


const randomPart = uuid();

const storage = multer.diskStorage({destination: (req, file, cb) => {
    
    cb(null, './public/img');
}
, filename: (req, file, cb) => {
    cb(null, randomPart.split('-')[1]+ Date.now() +'.'+ file.mimetype.split('/')[1]); 
}

});

const checkfileType = (file, cb) => {
    const filetype = /jpeg|jpg|png/;
    const extname = filetype.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetype.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Erreur : Images uniquement !');
    }
}

export const upload = multer({ storage: storage, limits: {fileSize: 5000000}, fileFilter: (req, file, cb) => {checkfileType(file, cb);}});




