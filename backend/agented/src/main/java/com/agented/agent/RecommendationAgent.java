package com.agented.agent;

import com.agented.model.Course;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class RecommendationAgent {

    public Map<String, Object> getRecommendations(String targetTopic, String weakTopics, List<Course> availableCourses) {
        Map<String, Object> result = new HashMap<>();
        result.put("agent", "RecommendationAgent");

        List<Map<String, Object>> recommendations = new ArrayList<>();

        if (availableCourses != null) {
            for (Course course : availableCourses) {
                if (course == null) continue;
                int matchScore = 75; // base match
                String reason = "Matches general learning pathway";

                String title = course.getTitle() != null ? course.getTitle().toLowerCase() : "";
                String description = course.getDescription() != null ? course.getDescription().toLowerCase() : "";

                if (targetTopic != null && !targetTopic.isEmpty() && title.contains(targetTopic.toLowerCase())) {
                    matchScore += 20;
                    reason = "Directly matches your target topic goal: " + targetTopic;
                } else if (weakTopics != null && !weakTopics.isEmpty() && description.contains(weakTopics.toLowerCase())) {
                    matchScore += 15;
                    reason = "Helps strengthen identified weakness: " + weakTopics;
                }

                Map<String, Object> rec = new HashMap<>();
                rec.put("course", course);
                rec.put("matchPercentage", Math.min(matchScore, 99));
                rec.put("recommendationReason", reason);
                recommendations.add(rec);
            }
        }

        // Sort descending by match score
        recommendations.sort((a, b) -> Integer.compare((Integer) b.get("matchPercentage"), (Integer) a.get("matchPercentage")));

        result.put("recommendations", recommendations);
        result.put("insights", "Based on your current skill gap in '" + (weakTopics != null ? weakTopics : "core concepts") + 
                                "', completing these courses will boost your overall mastery by ~35%.");

        return result;
    }
}
