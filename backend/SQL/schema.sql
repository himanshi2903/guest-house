CREATE DATABASE guesthouse1;
USE guesthouse1;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password CHAR(60) NOT NULL,  
    isAdmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    booking_name VARCHAR(255) NOT NULL,
    room_type ENUM('Single', 'Double', 'Hall') NOT NULL,
    num_rooms INT NOT NULL DEFAULT 1,
    num_beds INT NOT NULL DEFAULT 1,
    checkin_date DATE NOT NULL,
    checkin_time TIME NOT NULL,
    checkout_date DATE NOT NULL,
    aadhar VARCHAR(12) NULL,  
    phone_booking VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'confirmed') DEFAULT 'pending',
    total_price DECIMAL(10,2) NULL, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

--Admin Credentials
-- password: admin123

INSERT INTO users (name, email, password, isAdmin)
VALUES ('Admin', 'admin@gmail.com', '$2y$10$sWEbpUs4M4v7Wl2Xyx1OFeL/nLG7B6/LxdEfwhXKdLJWeFgi/SUgK', TRUE);
