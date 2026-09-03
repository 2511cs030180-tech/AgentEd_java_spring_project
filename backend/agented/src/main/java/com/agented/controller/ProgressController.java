package com.agented.controller;

import com.agented.service.CourseService;
import com.agented.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @Autowired
    private CourseService courseService;

    @GetMapping("/progress")
    public ResponseEntity<Map<String, Object>> getProgress(
            @RequestParam(required = false, defaultValue = "1") Long userId) {
        return ResponseEntity.ok(progressService.getProgressReport(userId));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardData(
            @RequestParam(required = false, defaultValue = "1") Long userId) {
        Map<String, Object> dashboard = new HashMap<>();

        Map<String, Object> progressReport = progressService.getProgressReport(userId);
        dashboard.put("userProgress", progressReport);

        Map<String, Object> welcomeInfo = new HashMap<>();
        welcomeInfo.put("studentName", "Alex Rivera");
        welcomeInfo.put("targetTopic", "Spring Boot & Microservices");
        welcomeInfo.put("currentStreakDays", 7);
        welcomeInfo.put("enrolledCoursesCount", 3);
        dashboard.put("welcome", welcomeInfo);

        dashboard.put("recentCourses", courseService.getAllCourses());

        Map<String, String> activeAgents = new HashMap<>();
        activeAgents.put("TutorAgent", "ONLINE - Ready for Q&A");
        activeAgents.put("QuizAgent", "ONLINE - Adaptive Questions Active");
        activeAgents.put("RecommendationAgent", "ONLINE - 4 Suggestions Ready");
        activeAgents.put("ProgressAgent", "ONLINE - Analytics Updated");
        dashboard.put("agentsStatus", activeAgents);

        return ResponseEntity.ok(dashboard);
    }
}
