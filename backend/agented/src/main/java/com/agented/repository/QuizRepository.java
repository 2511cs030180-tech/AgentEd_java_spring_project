package com.agented.repository;

import com.agented.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByTopicIgnoreCase(String topic);
    List<Quiz> findByDifficultyIgnoreCase(String difficulty);
}
