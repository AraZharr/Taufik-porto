const express = require('express');
const router = express.Router();
const multer = require('multer');
const supabase = require('../config/supabase');
const auth = require('../middleware/auth');

// Memory storage (no disk write)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpg, .png, and .webp files are allowed'), false);
    }
  }
});

router.post('/image', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const ext = req.file.originalname.split('.').pop();
    const filename = `${timestamp}-${random}.${ext}`;
    const filepath = `public/${filename}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(filepath, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Upload failed'
      });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filepath);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        filename: filename,
        path: publicUrl,
        url: publicUrl
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Upload failed'
    });
  }
});

// Error handler
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size must be less than 2MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  if (error.message) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  next(error);
});

module.exports = router;
