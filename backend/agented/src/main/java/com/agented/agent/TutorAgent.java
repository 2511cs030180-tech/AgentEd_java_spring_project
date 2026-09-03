package com.agented.agent;

import org.springframework.stereotype.Component;

import java.util.HashMap;

import java.util.Map;

@Component
public class TutorAgent {

    public Map<String, Object> answerQuestion(String query, String topic) {
        Map<String, Object> response = new HashMap<>();
        response.put("agent", "TutorAgent");
        response.put("query", query);
        response.put("topic", topic);

        String cleanQuery = (query != null) ? query.toLowerCase() : "";
        String answer;

        if (cleanQuery.contains("spring boot") || cleanQuery.contains("spring")) {
            answer = "Spring Boot is a microservices framework built on top of the Spring ecosystem. Key concepts include: " +
                     "\n1. Dependency Injection (@Autowired)" +
                     "\n2. RESTful Controllers (@RestController)" +
                     "\n3. Data persistence with Spring Data JPA (@Entity, JpaRepository)" +
                     "\n4. Embedded Tomcat server for instant deployment.";
        } else if (cleanQuery.contains("agent") || cleanQuery.contains("ai")) {
            answer = "AI Agents are autonomous systems that perceive their environment, reason using LLMs or decision trees, and execute tools to achieve goals. Multi-agent systems use specialized roles (e.g. TutorAgent, QuizAgent) to handle complex personalized learning workflows.";
        } else if (cleanQuery.contains("jpa") || cleanQuery.contains("database") || cleanQuery.contains("sql")) {
            answer = "Java Persistence API (JPA) maps Java objects to database tables. Hibernate acts as the ORM provider. Key annotations include @Entity, @Table, @Id, @Column, @OneToMany, and @ManyToOne.";
        } else if (cleanQuery.contains("javascript") || cleanQuery.contains("js") || cleanQuery.contains("bootstrap")) {
            answer = "Modern frontends use HTML5 for semantic structure, CSS3 & Bootstrap 5 for responsive flexbox/grid styling, and JavaScript (ES6+ fetch API) for dynamic updates without full page reloads.";
        } else {
            answer = "Great question regarding '" + (topic != null ? topic : "Learning") + "'! " +
                     "To master this concept, start by breaking it down into 3 core steps: " +
                     "1. Fundamental theory & syntax, 2. Hands-on code practice, and 3. Testing with interactive quizzes. " +
                     "Let me know if you want a step-by-step code example!";
        }

        response.put("explanation", answer);
        response.put("recommendedReadings", new String[]{
            "Core Fundamentals & Concepts",
            "Practical Code Walkthrough",
            "Best Practices & Architecture Design"
        });
        response.put("status", "SUCCESS");

        return response;
    }
}
