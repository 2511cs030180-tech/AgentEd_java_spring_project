package com.agented.agent;

import com.agented.model.Progress;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ProgressAgent {

    public Map<String, Object> analyzeProgress(Long userId, List<Progress> userProgressList) {
        Map<String, Object> report = new HashMap<>();
        report.put("agent", "ProgressAgent");
        report.put("userId", userId);

        int totalCompletedLessons = 0;
        int totalLessons = 0;
        double sumScore = 0.0;
        int count = (userProgressList != null) ? userProgressList.size() : 0;

        Set<String> strongTopics = new LinkedHashSet<>();
        Set<String> weakTopics = new LinkedHashSet<>();

        if (userProgressList != null) {
            for (Progress p : userProgressList) {
                if (p == null) continue;
                totalCompletedLessons += (p.getCompletedLessons() != null ? p.getCompletedLessons() : 0);
                totalLessons += (p.getTotalLessons() != null ? p.getTotalLessons() : 0);
                sumScore += (p.getScore() != null ? p.getScore() : 0.0);

                if (p.getStrongTopics() != null) {
                    for (String t : p.getStrongTopics().split(",")) {
                        if (!t.trim().isEmpty()) strongTopics.add(t.trim());
                    }
                }
                if (p.getWeakTopics() != null) {
                    for (String t : p.getWeakTopics().split(",")) {
                        if (!t.trim().isEmpty()) weakTopics.add(t.trim());
                    }
                }
            }
        }

        double overallCompletionRate = totalLessons > 0 ? ((double) totalCompletedLessons / totalLessons) * 100 : 0.0;
        double averageScore = count > 0 ? sumScore / count : 0.0;

        report.put("overallCompletionPercentage", Math.round(overallCompletionRate * 10.0) / 10.0);
        report.put("averageQuizScore", Math.round(averageScore * 10.0) / 10.0);
        report.put("completedLessons", totalCompletedLessons);
        report.put("totalLessons", totalLessons);
        report.put("strongTopics", strongTopics);
        report.put("weakTopics", weakTopics);

        String masteryLevel;
        if (averageScore >= 85) {
            masteryLevel = "ADVANCED / HIGH MASTERY";
        } else if (averageScore >= 70) {
            masteryLevel = "INTERMEDIATE";
        } else {
            masteryLevel = "DEVELOPING / NEEDS FOCUS";
        }

        report.put("masteryLevel", masteryLevel);
        report.put("agentAdvice", "ProgressAgent analysis: Your learning velocity is steady. Focus 20 minutes daily on '" + 
                                  (weakTopics.isEmpty() ? "Advanced Systems" : String.join(", ", weakTopics)) + 
                                  "' to unlock mastery status.");

        return report;
    }
}
