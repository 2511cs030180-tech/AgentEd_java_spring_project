package com.agented.controller;

import com.agented.model.Quiz;
import com.agented.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/quiz")
    public ResponseEntity<List<Quiz>> generateQuizPost(@RequestBody(required = false) Map<String, String> request) {
        if (request == null) request = java.util.Collections.emptyMap();
        String topic = request.getOrDefault("topic", "Spring Boot");
        String difficulty = request.getOrDefault("difficulty", "MEDIUM");
        return ResponseEntity.ok(quizService.getQuizzesByTopic(topic, difficulty));
    }

    @GetMapping("/quiz")
    public ResponseEntity<List<Quiz>> generateQuizGet(
            @RequestParam(required = false, defaultValue = "Spring Boot") String topic,
            @RequestParam(required = false, defaultValue = "MEDIUM") String difficulty) {
        return ResponseEntity.ok(quizService.getQuizzesByTopic(topic, difficulty));
    }

    @PostMapping("/quiz/evaluate")
    public ResponseEntity<Map<String, Object>> evaluateQuiz(@RequestBody(required = false) Map<String, Object> submission) {
        if (submission == null) submission = java.util.Collections.emptyMap();
        Object quizIdObj = submission.getOrDefault("quizId", 101);
        Long quizId = 101L;
        if (quizIdObj != null) {
            try {
                quizId = Double.valueOf(quizIdObj.toString()).longValue();
            } catch (Exception ignored) {}
        }
        String selectedAnswer = submission.getOrDefault("selectedAnswer", "A").toString();
        return ResponseEntity.ok(quizService.evaluateQuizAnswer(quizId, selectedAnswer));
    }
}
