package com.agented.repository;

import com.agented.model.AgentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentLogRepository extends JpaRepository<AgentLog, Long> {
    List<AgentLog> findByUserId(Long userId);
    List<AgentLog> findByAgentType(String agentType);
}
