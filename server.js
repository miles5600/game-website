const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Serve files from the /uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'application/zip',
            'application/x-zip-compressed',
            'application/octet-stream',
            'application/x-iso9660-image',
            'application/x-iso-image'
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only .zip and .iso allowed!'), false);
        }
    },
    limits: { fileSize: 1024 * 1024 * 1024 } // 1GB limit
});

// POST route to handle file uploads
app.post('/upload', upload.single('gameFile'), (req, res) => {
    if (req.file) {
        res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
    } else {
        res.status(400).json({ message: 'File upload failed' });
    }
});

// Dynamically scan the 'uploads' directory for files
app.get('/api/files', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ message: 'Error reading directory' });
        }

        // Map over files to include necessary metadata
        const fileList = files.map(file => ({
            name: file,
            path: `/uploads/${file}`,
            type: path.extname(file) === '.iso' ? 'application/x-iso9660-image' : 'application/octet-stream',
            uploadedAt: fs.statSync(path.join(uploadsDir, file)).mtime // Use file modification time
        }));

        res.json(fileList);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Serve file directory for admin dashboard
app.get('/api/admin/files', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ message: 'Error reading directory' });
        }

        const fileList = files.map(file => ({
            name: file,
            path: `/uploads/${file}`,
            type: path.extname(file),
            uploadedAt: fs.statSync(path.join(uploadsDir, file)).mtime
        }));

        res.json(fileList);
    });
});

// Route to delete a file from the server
app.delete('/api/admin/files/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    fs.unlink(filePath, err => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).json({ message: 'Error deleting file' });
        }
        res.status(200).json({ message: 'File deleted successfully' });
    });
});
// Serve file directory for admin dashboard (with file types)
app.get('/api/admin/files', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ message: 'Error reading directory' });
        }

        // Separate files by type: ISO files and Images
        const isoFiles = [];
        const imageFiles = [];
        const allowedImageTypes = ['.png', '.jpg', '.jpeg', '.gif']; // Add any other image types as needed

        files.forEach(file => {
            const ext = path.extname(file);
            if (ext === '.iso') {
                isoFiles.push({
                    name: file,
                    path: `/uploads/${file}`,
                    type: 'application/x-iso9660-image',
                    uploadedAt: fs.statSync(path.join(uploadsDir, file)).mtime
                });
            } else if (allowedImageTypes.includes(ext)) {
                imageFiles.push({
                    name: file,
                    path: `/uploads/${file}`,
                    type: 'image/' + ext.replace('.', ''),
                    uploadedAt: fs.statSync(path.join(uploadsDir, file)).mtime
                });
            }
        });

        res.json({ isoFiles, imageFiles });
    });
});
// Serve file directory for admin dashboard (with file types)
app.get('/api/admin/files', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ message: 'Error reading directory' });
        }

        const isoFiles = [];
        const imageFiles = [];
        const allowedImageTypes = ['.png', '.jpg', '.jpeg', '.gif'];

        files.forEach(file => {
            const ext = path.extname(file).toLowerCase(); // Ensure consistent lowercase extensions
            if (ext === '.iso') {
                isoFiles.push({
                    name: file,
                    path: `/uploads/${file}`,
                    type: 'application/x-iso9660-image',
                    uploadedAt: fs.statSync(path.join(uploadsDir, file)).mtime
                });
            } else if (allowedImageTypes.includes(ext)) {
                imageFiles.push({
                    name: file,
                    path: `/uploads/${file}`,
                    type: 'image/' + ext.replace('.', ''),
                    uploadedAt: fs.statSync(path.join(uploadsDir, file)).mtime
                });
            }
        });

        // Ensure both isoFiles and imageFiles are returned, even if they are empty
        res.json({ isoFiles, imageFiles });
    });
});
