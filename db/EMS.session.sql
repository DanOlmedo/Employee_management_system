--@block
 CREATE DATABASE Employees_db;

--@block
SHOW DATABASES;

--@block
USE Employees_db;

--@block
CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    dep_name VARCHAR(30) NOT NULL
);