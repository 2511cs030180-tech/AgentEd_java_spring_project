package com.agented.agent;

import com.agented.model.Quiz;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class QuizAgent {

    public List<Quiz> generateQuiz(String topic, String difficulty, int count) {
        List<Quiz> quizzes = new ArrayList<>();

        if ("Spring Boot".equalsIgnoreCase(topic) || topic == null) {
            quizzes.add(Quiz.builder()
                    .id(101L)
                    .topic("Spring Boot")
                    .question("Which annotation is used to inject dependencies in Spring Boot?")
                    .optionA("@InjectMe")
                    .optionB("@Autowired")
                    .optionC("@ResourceBean")
                    .optionD("@Connect")
                    .correctAnswer("B")
                    .explanation("@Autowired allows Spring to resolve and inject collaborating beans into your bean.")
                    .difficulty(difficulty != null ? difficulty : "MEDIUM")
                    .build());

            quizzes.add(Quiz.builder()
                    .id(102L)
                    .topic("Spring Boot")
                    .question("What is the main advantage of Spring Boot starter dependencies?")
                    .optionA("They replace Java with Python")
                    .optionB("They automatically manage compatible library versions and transitive dependencies")
                    .optionC("They run without JVM")
                    .optionD("They convert SQL to NOSQL")
                    .correctAnswer("B")
                    .explanation("Starters aggregate common dependencies with compatible versions.")
                    .difficulty(difficulty != null ? difficulty : "MEDIUM")
                    .build());
        }

        quizzes.add(Quiz.builder()
                .id(103L)
                .topic(topic != null ? topic : "Multi-Agent AI")
                .question("What is the primary role of a QuizAgent in an AI learning platform?")
                .optionA("Storing static video files")
                .optionB("Generating targeted questions and evaluating student responses adaptive to their skill level")
                .optionC("Rendering CSS stylesheets")
                .optionD("Executing MySQL backups")
                .correctAnswer("B")
                .explanation("QuizAgent evaluates comprehension and generates adaptive assessments.")
                .difficulty(difficulty != null ? difficulty : "EASY")
                .build());

        return quizzes;
    }

    public Map<String, Object> evaluateQuiz(Long quizId, String selectedAnswer, String correctAnswer) {
        Map<String, Object> eval = new HashMap<>();
        boolean isCorrect = selectedAnswer != null && selectedAnswer.trim().equalsIgnoreCase(correctAnswer.trim());

        eval.put("agent", "QuizAgent");
        eval.put("quizId", quizId);
        eval.put("isCorrect", isCorrect);
        eval.put("score", isCorrect ? 100 : 0);
        eval.put("feedback", isCorrect ? 
            "Excellent! You identified the correct concept." : 
            "Not quite right. Review the topic concept and try another problem.");

        return eval;
    }
}
