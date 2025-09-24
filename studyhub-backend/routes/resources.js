const express = require('express');
const router = express.Router();
const multer = require('multer');
const Resource = require('../models/Resource');
const auth = require('../middleware/auth');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload resource
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const { title, description, tags, subject, semester } = req.body;
    const newRes = new Resource({
      title,
      description,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      subject,
      semester,
      filePath: req.file?.path,
      fileName: req.file?.originalname,
      uploader: req.user.id
    });
    await newRes.save();
    res.json(newRes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// List & search
router.get('/', async (req, res) => {
  const { q, subject, semester, tag, sort } = req.query;
  const filter = {};
  if (subject) filter.subject = subject;
  if (semester) filter.semester = semester;
  if (tag) filter.tags = tag;
  if (q) filter.$or = [
    { title: new RegExp(q, 'i') },
    { description: new RegExp(q, 'i') },
    { tags: new RegExp(q, 'i') }
  ];

  let query = Resource.find(filter).populate('uploader', 'name email');
  if (sort === 'top') query = query.sort({ averageRating: -1 });
  else query = query.sort({ createdAt: -1 });

  const results = await query.limit(200);
  res.json(results);
});

// Download
router.get('/download/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource || !resource.filePath) return res.status(404).send('File not found');

    resource.downloads = (resource.downloads || 0) + 1;
    await resource.save();

    res.download(path.resolve(resource.filePath), resource.fileName);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Rate a resource
router.post('/rate/:id', auth, async (req, res) => {
  try {
    const { score, feedback } = req.body;
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).send('Not found');

    // Replace existing rating
    resource.ratings = resource.ratings.filter(r => r.userId.toString() !== req.user.id);
    resource.ratings.push({ userId: req.user.id, score, feedback });

    resource.averageRating = resource.ratings.reduce((s, r) => s + r.score, 0) / resource.ratings.length;
    await resource.save();

    res.json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
