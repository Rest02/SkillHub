import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para videos
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/videos');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Configuración de almacenamiento para miniaturas
const thumbnailStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/thumbnail');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    const videoFiletypes = /mp4|avi|mov|wmv/;
    const imageFiletypes = /jpg|jpeg|png|gif/;

    if (videoFiletypes.test(file.mimetype) || imageFiletypes.test(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido.'));
    }
};

// Middleware para cargar archivos usando el almacenamiento y filtro adecuados
const upload = multer({
    storage: (req, file, cb) => {
        if (file.fieldname === 'video') {
            cb(null, videoStorage);
        } else if (file.fieldname === 'thumbnail') {
            cb(null, thumbnailStorage);
        }
    },
    fileFilter: fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // Límite de tamaño de archivo
});

export default upload;
