-- Create database
CREATE DATABASE drug_info;

-- Connect to the database
\c drug_info

-- Create drugs table
CREATE TABLE drugs (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    generic_name VARCHAR(255) NOT NULL,
    brand_name VARCHAR(255),
    company VARCHAR(255) NOT NULL,
    launch_date TIMESTAMP NOT NULL
);

-- Create index for better performance
CREATE INDEX idx_drugs_company ON drugs(company);
CREATE INDEX idx_drugs_launch_date ON drugs(launch_date DESC);