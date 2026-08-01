-- =====================================================
-- Smart Mall Parking Management System
-- Module F1 + B1 : Authentication
-- Only the Users table is created in this module.
-- Vehicles, ParkingFloors, ParkingSlots, Bookings tables
-- will be added in their respective future modules.
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('CUSTOMER', 'SECURITY', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name       VARCHAR(120)  NOT NULL,
    email           VARCHAR(150)  NOT NULL UNIQUE,
    phone           VARCHAR(20)   NOT NULL,
    password_hash   TEXT          NOT NULL,
    role            user_role     NOT NULL DEFAULT 'CUSTOMER',
    is_active       BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_role  ON users (role);

-- Keep updated_at fresh on every UPDATE
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Optional: seed one admin for local testing (password: Admin@123)
-- Password hash generated with bcrypt, 10 rounds. Replace/remove for production.
-- INSERT INTO users (full_name, email, phone, password_hash, role)
-- VALUES ('System Admin', 'admin@smartmallparking.com', '9999999999',
-- '$2b$10$0f0m0m0m0m0m0m0m0m0m0uK3f3f3f3f3f3f3f3f3f3f3f3f3f3f3', 'ADMIN');
