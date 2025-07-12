import { body, validationResult } from 'express-validator';
import { PrismaClient } from '../generated/prisma/client.js';
import multer from 'multer';
const prisma = new PrismaClient();

const upload = multer({
  dest: 'uploads/', // Destination folder for uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter: (req, file, cb) => {
    // Optional: Basic file type filtering in multer
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error('Invalid file type. Only JPEG, PNG, and PDF are allowed.'),
      );
    }
    cb(null, true);
  },
});

// Middleware to handle multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ errors: [{ msg: err.message }] });
  } else if (err) {
    return res.status(400).json({ errors: [{ msg: err.message }] });
  }
  next();
};

const validateFolderName = [
  body('name').trim().notEmpty().withMessage('Folder name should has a name'),
];
export const createFolder = [
  validateFolderName,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!req.isAuthenticated()) {
        return res.redirect('/login');
      }
      if (!errors.isEmpty()) {
        return res.render('home', {
          errors: errors.array(),
        });
      }
      const { name } = req.body;

      const existingFolder = await prisma.folder.findFirst({
        where: {
          userID: +req.user.id,
          name: name,
        },
      });

      if (existingFolder) {
        return res.render('home', {
          errors: [
            { msg: 'A folder with this name already exists for this user' },
          ],
        });
      }
      await prisma.folder.create({
        data: {
          name: name,
          userID: req.user.id,
        },
      });

      res.redirect('/home');
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
];

export const getFolders = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }

    const folders = await prisma.folder.findMany({
      where: { userID: req.user.id },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    res.render('home', {
      folders: folders,
      currrentUser: req.user,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteFolder = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  try {
    await prisma.folder.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.redirect('/home');
  } catch (err) {
    throw err;
  }
};

export const updateFolderName = [
  validateFolderName,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!req.isAuthenticated()) {
        return res.redirect('/login');
      }
      if (!errors.isEmpty()) {
        return res.render('home', {
          errors: errors.array(),
        });
      }
      const { name } = req.body;
      const id = +req.params.id;
      const folder = await prisma.folder.findUnique({
        where: { id: id },
      });
      if (!folder) {
        return res.render('home', {
          errors: [{ msg: 'No folder' }],
        });
      }
      const existingFolder = await prisma.folder.findFirst({
        where: {
          userID: folder.userID,
          name: name,
          id: { not: id },
        },
      });

      if (existingFolder) {
        return res.render('home', {
          errors: [
            { msg: 'A folder with this name already exists for this user' },
          ],
        });
      }
      await prisma.folder.update({
        where: {
          userID: req.user.id,
          id: id,
        },
        data: {
          name: name,
        },
      });

      res.redirect('/home');
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
];

export const getFolder = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }
    const folder = await prisma.folder.findUnique({
      where: {
        id: +req.params.id,
        userID: +req.user.id,
      },
    });

    const files = await prisma.file.findMany({
      where: {
        folderID: +req.params.id,
      },
      orderBy: {
        uploadTime: 'desc',
      },
    });

    res.render('folder', {
      currentUser: req.user,
      folder: folder,
      files: files,
    });
  } catch (err) {
    throw err;
  }
};

export const uploadFile = [
  upload.single('file'),
  handleMulterError,
  async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/login');
    }

    let { originalname, size } = req.file;
    originalname = req.file.originalname.split('.')[0];

    const addFile = prisma.file.create({
      data: {
        name: originalname,
        size: size,
        folderID: +req.params.id,
      },
    });
    const updateFolder = prisma.folder.update({
      where: {
        id: +req.params.id,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    await prisma.$transaction([addFile, updateFolder]);

    res.redirect(`/folder/${req.params.id}`);
  },
];
