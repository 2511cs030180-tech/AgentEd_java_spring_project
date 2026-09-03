-- ============================================================
-- AgentEd - Multi-Agent AI Platform for Personalized Learning
-- Database Schema Script for MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS agented_db;
USE agented_db;

-- Drop tables if exists (for fresh deployment)
DROP TABLE IF EXISTS agent_logs;
DROP TABLE IF EXISTS user_progress;
DROP TABLE IF EXISTS quizzes;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

-- 1. Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'STUDENT',
    target_topic VARCHAR(100) DEFAULT 'Full Stack Java & AI',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Courses Table
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    level VARCHAR(20) NOT NULL,
    duration_hours INT DEFAULT 10,
    image_url VARCHAR(255),
    rating DOUBLE DEFAULT 4.5,
    total_enrolled INT DEFAULT 0
);

-- 3. Quizzes Table
CREATE TABLE quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    topic VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_answer CHAR(1) NOT NULL,
    explanation TEXT,
    difficulty VARCHAR(20) DEFAULT 'MEDIUM'
);

-- 4. User Progress Table
CREATE TABLE user_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    completed_lessons INT DEFAULT 0,
    total_lessons INT DEFAULT 20,
    score DOUBLE DEFAULT 0.0,
    strong_topics VARCHAR(255) DEFAULT 'Basics',
    weak_topics VARCHAR(255) DEFAULT 'Algorithms',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- 5. Agent Logs & Insights Table
CREATE TABLE agent_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    agent_type VARCHAR(50) NOT NULL, -- TutorAgent, QuizAgent, RecommendationAgent, ProgressAgent
    prompt_query TEXT,
    agent_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data: Sample Users
INSERT INTO users (name, email, password, role, target_topic) VALUES
('Alex Rivera', 'alex@agented.com', 'password123', 'STUDENT', 'Spring Boot & Microservices'),
('Sarah Chen', 'sarah@agented.com', 'password123', 'STUDENT', 'Machine Learning & Python');

-- Seed Data: Courses
INSERT INTO courses (title, description, category, level, duration_hours, image_url, rating, total_enrolled) VALUES
('Mastering Spring Boot 3 & JPA', 'Build enterprise microservices with Java, Spring Boot, and Spring Data JPA.', 'Backend Development', 'Intermediate', 24, 'https://images.unsplash.com/photo-1555066931-4365d14bab8c', 4.9, 1420),
('Multi-Agent AI Engineering', 'Learn how to build collaborative AI agents using LLMs and modern frameworks.', 'Artificial Intelligence', 'Advanced', 18, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe', 4.8, 980),
('Full Stack Web Architecture', 'Master HTML5, CSS3, JavaScript, RESTful APIs, and Bootstrap UI integration.', 'Web Development', 'Beginner', 30, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97', 4.7, 2150),
('Data Structures & Algorithms in Java', 'Deep dive into binary trees, graphs, sorting, and optimization.', 'Computer Science', 'Intermediate', 35, 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', 4.9, 3100);

-- Seed Data: Quizzes
INSERT INTO quizzes (topic, question, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty) VALUES
('Spring Boot', 'Which annotation is used to mark a class as a REST Controller in Spring Boot?', '@Controller', '@RestController', '@Service', '@Component', 'B', '@RestController combines @Controller and @ResponseBody.', 'EASY'),
('Java', 'What is the default initial capacity of an ArrayList in Java?', '5', '8', '10', '16', 'C', 'The default capacity of an ArrayList in Java is 10.', 'EASY'),
('AI Agents', 'Which architecture patterns enable multi-agent decision making?', 'Monolithic', 'ReAct and Tool Calling', 'CRUD', 'MVC', 'B', 'ReAct (Reasoning & Acting) allows agents to decompose tasks.', 'HARD'),
('Database', 'What does ACID stand for in database transactions?', 'Atomicity, Consistency, Isolation, Durability', 'Accuracy, Coherence, Integrity, Data', 'Always Complete In Databases', 'Asynchronous Control In Data', 'A', 'ACID guarantees database transaction reliability.', 'MEDIUM');

-- Seed Data: Progress
INSERT INTO user_progress (user_id, course_id, completed_lessons, total_lessons, score, strong_topics, weak_topics) VALUES
(1, 1, 14, 20, 85.5, 'JPA Mapping, REST Controllers', 'Transaction Management'),
(1, 2, 8, 18, 92.0, 'Prompt Engineering', 'Vector Databases'),
(2, 3, 20, 20, 96.0, 'DOM Manipulation, Bootstrap', 'Async JS');
