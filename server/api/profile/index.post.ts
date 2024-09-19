import {defineEventHandler} from 'h3';
import formidable from 'formidable';
import {promises as fs} from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
    const req = event.node.req;

    const form = formidable({
        multiples: false, // To handle only one file
        keepExtensions: true, // Keep the file extension
        uploadDir: path.join(process.cwd(), 'public/uploads'), // Temporary upload directory
        allowEmptyFiles: true, // Allow empty files to be uploaded
        minFileSize: 0, // Set min file size to 0 to allow empty files
    });

    return new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }

            // Access the uploaded file (assuming the key is "_photo")
            const file = files._photo;
            if (!file) {
                reject(new Error('No file uploaded'));
                return;
            }

            try {
                // Move file to desired directory (you can also rename it)
                const newPath = path.join(process.cwd(), 'public/uploads', file.originalFilename || '');

                // Move the file from the temp folder to the new path
                await fs.rename(file.filepath, newPath);

                resolve({
                    message: 'File uploaded successfully',
                    fileName: file.originalFilename,
                    filePath: newPath,
                });
            } catch (e) {
                reject(e);
            }
        });
    });
});
