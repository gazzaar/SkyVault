import { Router } from 'express';
import methodOverride from 'method-override';
import {
  createFolder,
  deleteFolder,
  updateFolderName,
  getFolder,
} from '../controllers/FoldersController.js';
const folderRouter = Router();
folderRouter.use(methodOverride('_method'));

// folderRouter.get('/', (req, res) => {});
folderRouter.post('/new', createFolder);
folderRouter.delete('/:id', deleteFolder);
folderRouter.put('/:id', updateFolderName);
folderRouter.get('/:id', getFolder);

export default folderRouter;
