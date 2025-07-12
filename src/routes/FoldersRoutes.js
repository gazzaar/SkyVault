import { Router } from 'express';
import methodOverride from 'method-override';
import {
  createFolder,
  deleteFolder,
  updateFolderName,
} from '../controllers/FoldersController.js';
const folderRouter = Router();
folderRouter.use(methodOverride('_method'));

// folderRouter.post('/add',)
folderRouter.get('/', (req, res) => {});
folderRouter.post('/new', createFolder);
folderRouter.delete('/:id', deleteFolder);
folderRouter.put('/:id', updateFolderName);

export default folderRouter;
