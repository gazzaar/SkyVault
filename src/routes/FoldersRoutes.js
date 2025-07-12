import { Router } from 'express';
import methodOverride from 'method-override';
import {
  createFolder,
  deleteFolder,
  updateFolderName,
  getFolder,
  uploadFile,
} from '../controllers/FoldersController.js';
const folderRouter = Router();
folderRouter.use(methodOverride('_method'));

// folderRouter.get('/', (req, res) => {});
folderRouter.post('/new', createFolder);
folderRouter.delete('/:id', deleteFolder);
folderRouter.put('/:id', updateFolderName);
folderRouter.get('/:id', getFolder);
folderRouter.post('/:id/upload', uploadFile);

export default folderRouter;
