import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para miniaturas
const thumbnailStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Almacenamos las miniaturas en la carpeta 'public/thumbnails'
        cb(null, 'public/thumbnail');
    },
    filename: (req, file, cb) => {
        // Asignamos un nombre único a la miniatura usando un timestamp
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Filtro para solo permitir imágenes
const thumbnailFileFilter = (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|gif/; // Solo permitimos imágenes de estos tipos
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true); // Archivo válido
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo imágenes.'));
    }
};

// Middleware para cargar miniaturas
const uploadThumbnail = multer({
    storage: thumbnailStorage,
    fileFilter: thumbnailFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limitar tamaño de imagen a 5MB
});




export default uploadThumbnail;
