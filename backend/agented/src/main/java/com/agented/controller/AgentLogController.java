package com.agented.controller;

import com.agented.model.AgentLog;
import com.agented.service.AgentLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "*")
public class AgentLogController {

    @Autowired
    private AgentLogService agentLogService;

    @GetMapping
    public ResponseEntity<List<AgentLog>> getAllLogs() {
        return ResponseEntity.ok(agentLogService.getAllLogs());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AgentLog>> getLogsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(agentLogService.getLogsByUserId(userId));
    }

    @GetMapping("/agent/{agentType}")
    public ResponseEntity<List<AgentLog>> getLogsByAgentType(@PathVariable String agentType) {
        return ResponseEntity.ok(agentLogService.getLogsByAgentType(agentType));
    }

    @PostMapping
    public ResponseEntity<AgentLog> createLog(@RequestBody AgentLog agentLog) {
        return ResponseEntity.ok(agentLogService.saveLog(agentLog));
    }
}
