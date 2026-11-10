# Hospital Appointment API

A TypeScript and Prisma-based CRUD module for managing hospital appointments, patients, and doctors.

## Overview

This project implements relational CRUD operations on a PostgreSQL database using Prisma 7 and TypeScript. The database schema was introspected using `prisma db pull` from an existing PostgreSQL database and cleaned to follow Prisma and TypeScript conventions.

### Domain Model & Architecture

- **Patient**: Registered patients (`patients` table).
- **Doctor**: Medical doctors with specialties (`doctors` table).
- **Appointment**: Relational model connecting a patient and a doctor with appointment date, status, and notes (`appointments` table).
  - Patient relation has `ON DELETE CASCADE` (deleting a patient removes their appointments).
  - Doctor relation has `ON DELETE RESTRICT` (deleting a doctor with appointments is restricted to maintain referential integrity).

---

## Getting Started

### 1. Prerequisites

- Node.js (v18+)
- PostgreSQL database instance

### 2. Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/hospital_api?schema=public"
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Database Setup & Prisma Generation

Run the initial DDL script to create the tables in PostgreSQL:

```bash
node scripts/setup-db.js
```

Generate the Prisma Client:

```bash
npx prisma generate
```

### 5. Seeding the Database

Populate test fixtures (doctors, patients, and scheduled appointments):

```bash
npm run seed
# or
npx prisma db seed
```

### 6. Running Tests

Run the end-to-end test suite exercising all CRUD operations:

```bash
npm test
# or
npx tsx src/test.ts
```

---

## Project Structure

```
├── prisma/
│   └── schema.prisma        # Cleaned Prisma schema with @@map and @map attributes
├── src/
│   ├── lib/
│   │   └── prisma.ts        # PrismaClient singleton with PrismaPg adapter
│   ├── patients.ts          # Patient CRUD operations
│   ├── doctors.ts           # Doctor CRUD operations
│   ├── appointments.ts      # Relational appointment booking & schedule management
│   ├── seed.ts              # Database seeder
│   └── test.ts              # End-to-end test script
├── scripts/
│   └── setup-db.js          # PostgreSQL table DDL runner
├── prisma7.config.ts        # Prisma 7 configuration file
└── tsconfig.json            # TypeScript configuration
```

---

## Test Verification Output

```
 ── Patients ──────────────────────────
Created: Test Patient 3
Found: Test Patient
Updated phone: 8888888888
Search results: 1
 ── Doctors ───────────────────────────
Created: Dr. Test 3
General Medicine doctors: 1
 ── Appointments ──────────────────────
Booked: 3 for Test Patient
Full fetch: Test Patient with Dr. Test
Doctor schedule: 1 appointment(s)
Status updated to: cancelled
 ── Cleanup ───────────────────────────
Test data cleaned up.
```
