package com.agented.service;

import com.agented.model.AgentLog;
import com.agented.repository.AgentLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentLogService {

    @Autowired
    private AgentLogRepository agentLogRepository;

    public AgentLog saveLog(AgentLog log) {
        return agentLogRepository.save(log);
    }

    public List<AgentLog> getAllLogs() {
        return agentLogRepository.findAll();
    }

    public List<AgentLog> getLogsByUserId(Long userId) {
        return agentLogRepository.findByUserId(userId);
    }

    public List<AgentLog> getLogsByAgentType(String agentType) {
        return agentLogRepository.findByAgentType(agentType);
    }
}
