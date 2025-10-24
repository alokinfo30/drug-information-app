const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const importData = async () => {
  try {
    // Read and parse the JSON data
    const rawData = fs.readFileSync('drugs.json', 'utf8');
    const drugs = JSON.parse(rawData);

    console.log(`Importing ${drugs.length} drugs...`);

    for (const drug of drugs) {
      const query = `
        INSERT INTO drugs (code, generic_name, brand_name, company, launch_date)
        VALUES ($1, $2, $3, $4, $5)
      `;
      
      await pool.query(query, [
        drug.code,
        drug.genericName,
        drug.brandName,
        drug.company,
        new Date(drug.launchDate)
      ]);
    }

    console.log('✅ Data imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

importData();