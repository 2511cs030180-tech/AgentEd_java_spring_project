package com.agented.model;

import jakarta.persistence.*;
@Entity
@Table(name = "quizzes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String topic;

    @Column(nullable = false, length = 1000)
    private String question;

    @Column(name = "option_a", nullable = false)
    private String optionA;

    @Column(name = "option_b", nullable = false)
    private String optionB;

    @Column(name = "option_c", nullable = false)
    private String optionC;

    @Column(name = "option_d", nullable = false)
    private String optionD;

    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer;

    @Column(length = 1000)
    private String explanation;

    private String difficulty;

    public Quiz() {}

    public Quiz(Long id, String topic, String question, String optionA, String optionB, String optionC, String optionD, String correctAnswer, String explanation, String difficulty) {
        this.id = id;
        this.topic = topic;
        this.question = question;
        this.optionA = optionA;
        this.optionB = optionB;
        this.optionC = optionC;
        this.optionD = optionD;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.difficulty = difficulty;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getOptionA() { return optionA; }
    public void setOptionA(String optionA) { this.optionA = optionA; }

    public String getOptionB() { return optionB; }
    public void setOptionB(String optionB) { this.optionB = optionB; }

    public String getOptionC() { return optionC; }
    public void setOptionC(String optionC) { this.optionC = optionC; }

    public String getOptionD() { return optionD; }
    public void setOptionD(String optionD) { this.optionD = optionD; }

    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public static QuizBuilder builder() { return new QuizBuilder(); }

    public static class QuizBuilder {
        private Long id;
        private String topic;
        private String question;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;
        private String correctAnswer;
        private String explanation;
        private String difficulty;

        public QuizBuilder id(Long id) { this.id = id; return this; }
        public QuizBuilder topic(String topic) { this.topic = topic; return this; }
        public QuizBuilder question(String question) { this.question = question; return this; }
        public QuizBuilder optionA(String optionA) { this.optionA = optionA; return this; }
        public QuizBuilder optionB(String optionB) { this.optionB = optionB; return this; }
        public QuizBuilder optionC(String optionC) { this.optionC = optionC; return this; }
        public QuizBuilder optionD(String optionD) { this.optionD = optionD; return this; }
        public QuizBuilder correctAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; return this; }
        public QuizBuilder explanation(String explanation) { this.explanation = explanation; return this; }
        public QuizBuilder difficulty(String difficulty) { this.difficulty = difficulty; return this; }

        public Quiz build() {
            return new Quiz(id, topic, question, optionA, optionB, optionC, optionD, correctAnswer, explanation, difficulty);
        }
    }
}
