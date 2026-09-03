package com.agented.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress")
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "completed_lessons")
    private Integer completedLessons;

    @Column(name = "total_lessons")
    private Integer totalLessons;

    private Double score;

    @Column(name = "strong_topics")
    private String strongTopics;

    @Column(name = "weak_topics")
    private String weakTopics;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    public Progress() {}

    public Progress(Long id, Long userId, Long courseId, Integer completedLessons, Integer totalLessons, Double score, String strongTopics, String weakTopics, LocalDateTime lastUpdated) {
        this.id = id;
        this.userId = userId;
        this.courseId = courseId;
        this.completedLessons = completedLessons;
        this.totalLessons = totalLessons;
        this.score = score;
        this.strongTopics = strongTopics;
        this.weakTopics = weakTopics;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public Integer getCompletedLessons() { return completedLessons; }
    public void setCompletedLessons(Integer completedLessons) { this.completedLessons = completedLessons; }

    public Integer getTotalLessons() { return totalLessons; }
    public void setTotalLessons(Integer totalLessons) { this.totalLessons = totalLessons; }

    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }

    public String getStrongTopics() { return strongTopics; }
    public void setStrongTopics(String strongTopics) { this.strongTopics = strongTopics; }

    public String getWeakTopics() { return weakTopics; }
    public void setWeakTopics(String weakTopics) { this.weakTopics = weakTopics; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.lastUpdated = LocalDateTime.now();
    }

    public static ProgressBuilder builder() { return new ProgressBuilder(); }

    public static class ProgressBuilder {
        private Long id;
        private Long userId;
        private Long courseId;
        private Integer completedLessons;
        private Integer totalLessons;
        private Double score;
        private String strongTopics;
        private String weakTopics;
        private LocalDateTime lastUpdated;

        public ProgressBuilder id(Long id) { this.id = id; return this; }
        public ProgressBuilder userId(Long userId) { this.userId = userId; return this; }
        public ProgressBuilder courseId(Long courseId) { this.courseId = courseId; return this; }
        public ProgressBuilder completedLessons(Integer completedLessons) { this.completedLessons = completedLessons; return this; }
        public ProgressBuilder totalLessons(Integer totalLessons) { this.totalLessons = totalLessons; return this; }
        public ProgressBuilder score(Double score) { this.score = score; return this; }
        public ProgressBuilder strongTopics(String strongTopics) { this.strongTopics = strongTopics; return this; }
        public ProgressBuilder weakTopics(String weakTopics) { this.weakTopics = weakTopics; return this; }
        public ProgressBuilder lastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; return this; }

        public Progress build() {
            return new Progress(id, userId, courseId, completedLessons, totalLessons, score, strongTopics, weakTopics, lastUpdated);
        }
    }
}
