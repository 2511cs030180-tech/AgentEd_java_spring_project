package com.agented.service;

import com.agented.agent.ProgressAgent;
import com.agented.model.Progress;
import com.agented.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Map;

@Service
public class ProgressService {

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private ProgressAgent progressAgent;

    public List<Progress> getUserProgress(Long userId) {
        return progressRepository.findByUserId(userId);
    }

    public Map<String, Object> getProgressReport(Long userId) {
        List<Progress> progressList = progressRepository.findByUserId(userId);
        return progressAgent.analyzeProgress(userId, progressList);
    }

    public Progress saveOrUpdateProgress(Progress progress) {
        return progressRepository.save(progress);
    }
}
