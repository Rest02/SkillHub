export const checkInstructorRole = (req, res, next) => {
    if (req.user.rol !== 'instructor') {  // Verifica si req.user es válido
        return res.status(403).json({ message: 'Acceso denegado. Solo los instructores pueden crear cursos.' });
    }
    next(); // Si el rol es instructor, continúa con el siguiente middleware
};
