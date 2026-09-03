package com.agented.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "agent_logs")
public class AgentLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "agent_type", nullable = false)
    private String agentType;

    @Column(name = "prompt_query", columnDefinition = "TEXT")
    private String promptQuery;

    @Column(name = "agent_response", columnDefinition = "TEXT")
    private String agentResponse;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public AgentLog() {}

    public AgentLog(Long id, Long userId, String agentType, String promptQuery, String agentResponse, LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.agentType = agentType;
        this.promptQuery = promptQuery;
        this.agentResponse = agentResponse;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getAgentType() { return agentType; }
    public void setAgentType(String agentType) { this.agentType = agentType; }

    public String getPromptQuery() { return promptQuery; }
    public void setPromptQuery(String promptQuery) { this.promptQuery = promptQuery; }

    public String getAgentResponse() { return agentResponse; }
    public void setAgentResponse(String agentResponse) { this.agentResponse = agentResponse; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public static AgentLogBuilder builder() {
        return new AgentLogBuilder();
    }

    public static class AgentLogBuilder {
        private Long id;
        private Long userId;
        private String agentType;
        private String promptQuery;
        private String agentResponse;
        private LocalDateTime createdAt;

        public AgentLogBuilder id(Long id) { this.id = id; return this; }
        public AgentLogBuilder userId(Long userId) { this.userId = userId; return this; }
        public AgentLogBuilder agentType(String agentType) { this.agentType = agentType; return this; }
        public AgentLogBuilder promptQuery(String promptQuery) { this.promptQuery = promptQuery; return this; }
        public AgentLogBuilder agentResponse(String agentResponse) { this.agentResponse = agentResponse; return this; }
        public AgentLogBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public AgentLog build() {
            return new AgentLog(id, userId, agentType, promptQuery, agentResponse, createdAt);
        }
    }
}
