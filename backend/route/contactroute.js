import express from 'express';
import { createContact,getAllContacts } from '../controller/ContactContoller.js';

const router = express.Router();

// POST /api/contact - Submit contact form
router.post('/', createContact);
router.get('/',getAllContacts )

export default router;