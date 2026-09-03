package com.agented.service;

import com.agented.agent.QuizAgent;
import com.agented.model.Quiz;
import com.agented.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizAgent quizAgent;

    public List<Quiz> getQuizzesByTopic(String topic, String difficulty) {
        List<Quiz> quizzes = quizRepository.findByTopicIgnoreCase(topic);
        if (quizzes.isEmpty()) {
            quizzes = quizAgent.generateQuiz(topic, difficulty, 3);
        }
        return quizzes;
    }

    public Map<String, Object> evaluateQuizAnswer(Long quizId, String answer) {
        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        String correctAnswer = (quiz != null) ? quiz.getCorrectAnswer() : "B";
        return quizAgent.evaluateQuiz(quizId, answer, correctAnswer);
    }
}
