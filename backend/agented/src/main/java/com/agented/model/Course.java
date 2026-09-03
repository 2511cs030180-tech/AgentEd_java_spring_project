package com.agented.model;

import jakarta.persistence.*;
@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 1000)
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String level;

    @Column(name = "duration_hours")
    private Integer durationHours;

    @Column(name = "image_url")
    private String imageUrl;

    private Double rating;

    @Column(name = "total_enrolled")
    private Integer totalEnrolled;

    public Course() {}

    public Course(Long id, String title, String description, String category, String level, Integer durationHours, String imageUrl, Double rating, Integer totalEnrolled) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.level = level;
        this.durationHours = durationHours;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.totalEnrolled = totalEnrolled;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public Integer getDurationHours() { return durationHours; }
    public void setDurationHours(Integer durationHours) { this.durationHours = durationHours; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getTotalEnrolled() { return totalEnrolled; }
    public void setTotalEnrolled(Integer totalEnrolled) { this.totalEnrolled = totalEnrolled; }

    public static CourseBuilder builder() { return new CourseBuilder(); }

    public static class CourseBuilder {
        private Long id;
        private String title;
        private String description;
        private String category;
        private String level;
        private Integer durationHours;
        private String imageUrl;
        private Double rating;
        private Integer totalEnrolled;

        public CourseBuilder id(Long id) { this.id = id; return this; }
        public CourseBuilder title(String title) { this.title = title; return this; }
        public CourseBuilder description(String description) { this.description = description; return this; }
        public CourseBuilder category(String category) { this.category = category; return this; }
        public CourseBuilder level(String level) { this.level = level; return this; }
        public CourseBuilder durationHours(Integer durationHours) { this.durationHours = durationHours; return this; }
        public CourseBuilder imageUrl(String imageUrl) { this.imageUrl = imageUrl; return this; }
        public CourseBuilder rating(Double rating) { this.rating = rating; return this; }
        public CourseBuilder totalEnrolled(Integer totalEnrolled) { this.totalEnrolled = totalEnrolled; return this; }

        public Course build() {
            return new Course(id, title, description, category, level, durationHours, imageUrl, rating, totalEnrolled);
        }
    }
}
