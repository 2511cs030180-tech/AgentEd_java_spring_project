package com.agented.controller;

import com.agented.agent.RecommendationAgent;
import com.agented.agent.TutorAgent;
import com.agented.model.Course;
import com.agented.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AgentController {

    @Autowired
    private TutorAgent tutorAgent;

    @Autowired
    private RecommendationAgent recommendationAgent;

    @Autowired
    private CourseService courseService;

    @GetMapping("/tutor")
    public ResponseEntity<Map<String, Object>> getTutorAnswer(
            @RequestParam(required = false, defaultValue = "What is Spring Boot?") String query,
            @RequestParam(required = false, defaultValue = "Spring Boot") String topic) {
        return ResponseEntity.ok(tutorAgent.answerQuestion(query, topic));
    }

    @PostMapping("/tutor")
    public ResponseEntity<Map<String, Object>> askTutor(@RequestBody(required = false) Map<String, String> request) {
        if (request == null) request = java.util.Collections.emptyMap();
        String query = request.getOrDefault("query", "Explain Spring Boot");
        String topic = request.getOrDefault("topic", "Java");
        return ResponseEntity.ok(tutorAgent.answerQuestion(query, topic));
    }

    @GetMapping("/recommendations")
    public ResponseEntity<Map<String, Object>> getRecommendations(
            @RequestParam(required = false, defaultValue = "Full Stack Java") String targetTopic,
            @RequestParam(required = false, defaultValue = "Microservices") String weakTopics) {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(recommendationAgent.getRecommendations(targetTopic, weakTopics, courses));
    }
}
