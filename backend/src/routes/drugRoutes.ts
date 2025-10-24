import express from 'express';
import { getTableConfig, getDrugs, getCompanies } from '../controllers/drugController';

const router = express.Router();

router.get('/table-config', getTableConfig);
router.get('/drugs', getDrugs);
router.get('/companies', getCompanies);

export default router;