import multer from 'multer';
import path from 'path';

// Configuración para videos
const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/videos');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const videoFileFilter = (req, file, cb) => {
    const filetypes = /mp4|avi|mov|wmv/; // Solo videos
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido.'));
    }
};

// Middleware para subir videos
const uploadVideo = multer({
    storage: videoStorage,
    fileFilter: videoFileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // Limitar tamaño
});

export default uploadVideo;
