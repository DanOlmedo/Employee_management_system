--@block
 CREATE DATABASE Employees_db;

--@block
SHOW DATABASES;

--@block
USE Employees_db;

--@block
DROP TABLE department;

--@block
CREATE TABLE department(
    id INT PRIMARY KEY AUTO_INCREMENT,
    dep_name VARCHAR(30) NOT NULL
);

--@block
INSERT INTO department (dep_name)
VALUES ('Engineering'),
       ('Marketing'),
       ('Human resources');

--@block
SELECT * FROM department;

--@block
SELECT dep_name FROM department
WHERE dep_name = 'Engineering'
AND id > 1
ORDER BY id ASC
LIMIT 2;

--@block
DELETE  FROM department where id=4;

--@block
CREATE INDEX dep_index ON department(dep_name);

--@block
CREATE TABLE roles(
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

--@block
CREATE TABLE employee(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    Last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

--@block
INSERT INTO roles (department_id, title, salary)
VALUES (1,'CEE',100),
       (1,'Developer',50),
       (2,'Marketing director',70),
       (3,'HR director',60);

--@block
INSERT INTO employee (first_name, Last_name, role_id)
VALUES ('Dan','Olm',1);


--@block
SELECT * FROM department
INNER JOIN roles ON roles.department_id = department.id;

--@block
SELECT * FROM employee;

--@block
SELECT 
    department.id AS field
FROM department
LEFT JOIN roles ON roles.department_id = department.id;