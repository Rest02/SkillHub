// import multer from 'multer';
// import path from 'path';

// // Configuración de almacenamiento para miniaturas
// const thumbnailStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/thumbnails');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// // Configuración de almacenamiento para videos
// const videoStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/videos');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// // Filtro de archivos para miniaturas
// const thumbnailFileFilter = (req, file, cb) => {
//     const isImage = /jpg|jpeg|png|gif/.test(path.extname(file.originalname).toLowerCase());
//     if (isImage) {
//         cb(null, true);
//     } else {
//         cb(new Error('Tipo de archivo no permitido para miniatura.'));
//     }
// };

// // Filtro de archivos para videos
// const videoFileFilter = (req, file, cb) => {
//     const isVideo = /mp4|avi|mov|wmv/.test(path.extname(file.originalname).toLowerCase());
//     if (isVideo) {
//         cb(null, true);
//     } else {
//         cb(new Error('Tipo de archivo no permitido para video.'));
//     }
// };

// // Middleware para subir miniaturas
// const uploadThumbnail = multer({
//     storage: thumbnailStorage,
//     fileFilter: thumbnailFileFilter,
//     limits: { fileSize: 10 * 1024 * 1024 } // 10 MB para miniaturas
// });

// // Middleware para subir videos
// const uploadVideo = multer({
//     storage: videoStorage,
//     fileFilter: videoFileFilter,
//     limits: { fileSize: 100 * 1024 * 1024 } // 100 MB para videos
// });

// export { uploadThumbnail, uploadVideo };
