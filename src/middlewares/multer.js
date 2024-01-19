import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadFolder = '';

        // Si es una imagen:
        if (file.mimetype.startsWith('image/')) {
            uploadFolder = './public/products';
        // Si es un PDF:
        } else if (file.mimetype.startsWith('application/pdf') || file.mimetype.startsWith('text/')) {
            uploadFolder = './public/documents';
        } else {
        // Si es otro tipo de archivo:
            uploadFolder = './public/others';
        }

        // Crear la carpeta si no existe
        fs.mkdirSync(uploadFolder, { recursive: true });

        // Guardar el valor del campo "name" en la solicitud para que esté disponible en la función filename
        req.customName = req.body.name || 'default';

        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const customName = req.customName || 'default'; // Utiliza el valor de "name" o 'default' si no se proporciona
        const fileExtension = path.extname(file.originalname); // Obtener la extensión original
        const fileName = `${formattedDate}_${customName}${fileExtension}`;
        cb(null, fileName);
    },
});

export const uploader = multer({ storage });