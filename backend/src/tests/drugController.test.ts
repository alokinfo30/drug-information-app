import request from 'supertest';
import express from 'express';
import drugRoutes from '../routes/drugRoutes';

const app = express();
app.use(express.json());
app.use('/api', drugRoutes);

describe('Drug API', () => {
  it('should return table configuration', async () => {
    const response = await request(app).get('/api/table-config');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('columns');
    expect(Array.isArray(response.body.columns)).toBe(true);
  });

  it('should return companies list', async () => {
    const response = await request(app).get('/api/companies');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});