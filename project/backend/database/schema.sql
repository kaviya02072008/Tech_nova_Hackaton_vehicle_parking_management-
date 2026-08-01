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
CREATE DATABASE smart_parking;

USE smart_parking;

-- user
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('CUSTOMER','SECURITY','ADMIN') NOT NULL
);

-- parking slot
CREATE TABLE parking_slots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    slot_number VARCHAR(20) UNIQUE NOT NULL,
    floor VARCHAR(50),
    status ENUM('AVAILABLE','OCCUPIED','RESERVED') DEFAULT 'AVAILABLE'
);

-- booking
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT,

    slot_id BIGINT,

    vehicle_number VARCHAR(30),

    vehicle_type VARCHAR(20),

    booking_time DATETIME,

    duration INT,

    price DOUBLE,

    status ENUM('ACTIVE','COMPLETED'),

    FOREIGN KEY (user_id)
        REFERENCES users(id),

    FOREIGN KEY (slot_id)
        REFERENCES parking_slots(id)
);

INSERT INTO parking_slots(slot_number,floor,status)
VALUES
('A1','Ground Floor','AVAILABLE'),
('A2','Ground Floor','AVAILABLE'),
('A3','Ground Floor','AVAILABLE'),
('A4','Ground Floor','AVAILABLE'),
('A5','Ground Floor','AVAILABLE'),
('A6','Ground Floor','AVAILABLE'),
('A7','Ground Floor','AVAILABLE'),
('A8','Ground Floor','AVAILABLE'),
('A9','Ground Floor','AVAILABLE'),
('A10','Ground Floor','AVAILABLE'),
('A11','Ground Floor','AVAILABLE'),
('A12','Ground Floor','AVAILABLE');

SHOW TABLES;
SELECT * FROM parking_slots;
SELECT COUNT(*) FROM parking_slots;
INSERT INTO parking_slots(slot_number,floor,status)
VALUES
('A1','Ground Floor','AVAILABLE'),
('A2','Ground Floor','AVAILABLE'),
('A3','Ground Floor','AVAILABLE'),
('A4','Ground Floor','AVAILABLE'),
('A5','Ground Floor','AVAILABLE'),
('A6','Ground Floor','AVAILABLE'),
('A7','Ground Floor','AVAILABLE'),
('A8','Ground Floor','AVAILABLE'),
('A9','Ground Floor','AVAILABLE'),
('A10','Ground Floor','AVAILABLE'),
('A11','Ground Floor','AVAILABLE'),
('A12','Ground Floor','AVAILABLE');

SELECT * FROM parking_slots;