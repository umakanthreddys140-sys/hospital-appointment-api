import pg from 'pg';

const client = new pg.Client({
  connectionString: 'postgresql://postgres:password@localhost:5432/hospital_api?schema=public'
});

async function main() {
  await client.connect();
  console.log('Connected to hospital_api');

  await client.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      date_of_birth DATE,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS doctors (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      specialty TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id SERIAL PRIMARY KEY,
      patient_id INTEGER NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
      doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE RESTRICT,
      appointment_date TIMESTAMP NOT NULL,
      status TEXT NOT NULL DEFAULT 'scheduled',
      notes TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );
  `);
  console.log('DDL executed successfully!');

  const res = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public';
  `);
  console.log('Tables in public schema:', res.rows.map(r => r.table_name));
  await client.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
