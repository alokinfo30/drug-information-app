import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getTableConfig = (req: Request, res: Response) => {
  const tableConfig = {
    columns: [
      { key: 'id', label: 'Id', visible: true },
      { key: 'code', label: 'Code', visible: true },
      { key: 'name', label: 'Name', visible: true },
      { key: 'company', label: 'Company', visible: true },
      { key: 'launchDate', label: 'Launch Date', visible: true }
    ]
  };
  res.json(tableConfig);
};

export const getDrugs = async (req: Request, res: Response) => {
  try {
    const { company } = req.query;
    
    let query = `
      SELECT 
        id,
        code,
        generic_name as "genericName",
        brand_name as "brandName",
        company,
        launch_date as "launchDate"
      FROM drugs
    `;
    
    const params: any[] = [];
    
    if (company && company !== 'all') {
      query += ' WHERE company = $1';
      params.push(company);
    }
    
    query += ' ORDER BY launch_date DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching drugs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT DISTINCT company FROM drugs ORDER BY company');
    const companies = result.rows.map(row => row.company);
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};