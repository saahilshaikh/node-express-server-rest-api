const apiList = [
    // USER PROFILE
    { method: 'GET', url: '/v1/users/profile' },
    { method: 'POST', url: '/v1/users/track-active-time' },

    // ORGANIZATION MANAGEMENT
    { method: 'GET', url: '/v1/organizations/{org_id}' },
    { method: 'PUT', url: '/v1/organizations/{org_id}' },
    { method: 'POST', url: '/v1/organizations/{org_id}/support-ticket' },
    { method: 'POST', url: '/v1/organizations/business-demo' },

    // EMPLOYEE MANAGEMENT
    { method: 'GET', url: '/v1/employee' },
    { method: 'GET', url: '/v1/employee/{employee_id}' },
    { method: 'POST', url: '/v1/employee/sara' },
    { method: 'PUT', url: '/v1/employee/{emp_id}/update' },
    { method: 'PUT', url: '/v1/employee/{emp_id}/delete' },
    { method: 'PUT', url: '/v1/employee/{employee_id}/update-quick-start-step' },

    // AGENT MANAGEMENT
    { method: 'GET', url: '/v1/agents/{agent_id}/chatbox-config' },
    { method: 'PUT', url: '/v1/agents/{agent_id}/chatbox-config' },
    { method: 'POST', url: '/v1/agents/{agent_id}/integrations/email-guide' },

    // HUMAN AGENT MANAGEMENT
    { method: 'GET', url: '/v1/human-agent' },
    { method: 'GET', url: '/v1/human-agent/{user_id}' },
    { method: 'POST', url: '/v1/human-agent' },
    { method: 'DELETE', url: '/v1/human-agent/{human_agent_id}' },

    // JOB MANAGEMENT
    { method: 'GET', url: '/v1/jobs' },
    { method: 'POST', url: '/v1/jobs' },
    { method: 'GET', url: '/v1/jobs/{id}' },
    { method: 'PUT', url: '/v1/jobs/{id}' },
    { method: 'DELETE', url: '/v1/jobs/{id}' },
    { method: 'GET', url: '/v1/jobs/top-candidates/{job_id}' },
    { method: 'GET', url: '/v1/jobs/{org_id}/job-description-parser' },
    { method: 'POST', url: '/v1/jobs/generate-jd' },

    // JOB APPLICATIONS
    { method: 'POST', url: '/v1/job-applications' },
    { method: 'GET', url: '/v1/job-applications/get_by_job_id/{job_id}' },
    { method: 'GET', url: '/v1/job-applications/{id}' },
    { method: 'PUT', url: '/v1/job-applications/{id}/update' },
    { method: 'DELETE', url: '/v1/job-applications/{id}' },
    { method: 'POST', url: '/v1/job-applications/resumes/{job_id}/upload' },
    { method: 'POST', url: '/v1/job-applications/bulk-resume-parsing' },
    { method: 'GET', url: '/v1/job-applications/bulk-resume-parsing/{job_id}/status' },
    { method: 'GET', url: '/v1/job-applications/bulk-resume-parsing/candidate-info/{job_id}' },
    { method: 'POST', url: '/v1/job-applications/resumes/{job_id}/clear-all' },

    // INTERVIEW MANAGEMENT
    { method: 'GET', url: '/v1/interviews' },
    { method: 'POST', url: '/v1/interviews' },
    { method: 'GET', url: '/v1/interviews/{id}' },
    { method: 'PUT', url: '/v1/interviews/{id}' },
    { method: 'DELETE', url: '/v1/interviews/{id}' },
    { method: 'GET', url: '/v1/interviews/{id}/transcript' },
    { method: 'POST', url: '/v1/interviews/generate-skills' },

    // GROUP INTERVIEWS
    { method: 'GET', url: '/v1/group/' },
    { method: 'POST', url: '/v1/group/' },
    { method: 'GET', url: '/v1/group/{id}/detailed-summary' },
    { method: 'PUT', url: '/v1/group/{id}' },
    { method: 'DELETE', url: '/v1/group/{id}' },

    // CONVERSATIONS & CHAT
    { method: 'GET', url: '/v1/conversations/chat-messages' },
    { method: 'GET', url: '/v1/conversations/chat-sessions' },

    // SOCIAL MEDIA CHATS
    { method: 'GET', url: '/v1/meta/whatsapp/chats/{emp_id}/{phone_number}' },
    { method: 'GET', url: '/v1/meta/facebook/chats/{emp_id}/{page_id}' },
    { method: 'GET', url: '/v1/meta/instagram/chats/{emp_id}/{instagram_account_id}' },
    { method: 'GET', url: '/v1/meta/whatsapp/chats' },
    { method: 'GET', url: '/v1/meta/facebook/chats' },
    { method: 'GET', url: '/v1/meta/instagram/chats' },

    // CALL RECORDINGS
    { method: 'GET', url: '/v1/call-recordings/get-call-logs' },
    { method: 'GET', url: '/v1/call-recordings/fetch-call-recording-and-duration' },
    { method: 'GET', url: '/v1/call-recordings/get-call-recording-transcript' },

    // EMAIL MANAGEMENT
    { method: 'GET', url: '/v1/agent-email/{agent_id}/agent-email-messages' },
    { method: 'GET', url: '/v1/agent-email/{agent_id}/agent-email-drafts' },
    { method: 'GET', url: '/v1/agent-email/{draft_id}/agent-email-draft' },
    { method: 'POST', url: '/v1/agent-email/{agent_id}/create-draft' },
    { method: 'POST', url: '/v1/agent-email/{id}/update' },
    { method: 'DELETE', url: '/v1/agent-email/{draft_id}/delete' },
    { method: 'POST', url: '/v1/agent-email/approve-and-send-multiple' },

    // ANALYTICS
    { method: 'GET', url: '/v1/agent-analytics/basic-range' },
    { method: 'GET', url: '/v1/agent-analytics/basic2' },
    { method: 'GET', url: '/v1/agent-analytics/ner/labels' },
    { method: 'GET', url: '/v1/agent-analytics/ner/label-entities' },
    { method: 'GET', url: '/v1/usage/usage-for-employee' },
    { method: 'POST', url: '/v1/insights/get-analytics' },
    { method: 'GET', url: '/v1/interview-analytics/dashboard' },

    // INTEGRATION APIs
    { method: 'POST', url: '/v1/workable/{org_id}/add-workable-configs' },
    { method: 'POST', url: '/v1/workable/{org_id}/delete-workable-configs' },
    { method: 'GET', url: '/v1/workable/{org_id}/stages' },
    { method: 'POST', url: '/v1/workable/{org_id}/create_listener' },
    { method: 'GET', url: '/v1/workable/{org_id}/listeners' },
    { method: 'POST', url: '/v1/workable/{org_id}/delete_listener/{listener_id}' },

    // DATA SOURCES
    { method: 'GET', url: '/v1/data-sources/get-all' },
    { method: 'POST', url: '/v1/data-sources/create' },

    // PLAYGROUND/ACTIONS
    { method: 'GET', url: '/v1/ds-action/get-all' },
    { method: 'POST', url: '/v1/ds-action/import-openapi' },
    { method: 'POST', url: '/v1/ds-action/delete' },

    // SOCIAL MEDIA INTEGRATION
    { method: 'POST', url: '/v1/meta/whatsapp/add' },
    { method: 'POST', url: '/v1/meta/whatsapp/delete' },
    { method: 'POST', url: '/v1/meta/facebook/add' },
    { method: 'POST', url: '/v1/meta/facebook/delete' },
    { method: 'POST', url: '/v1/meta/instagram/add' },
    { method: 'POST', url: '/v1/meta/instagram/delete' },

    // WEBHOOKS
    { method: 'POST', url: '/v1/webhooks/slack-integration' },
    { method: 'POST', url: '/v1/webhooks/revoking-slack/{emp_id}' },

    // PLANS & BILLING
    { method: 'GET', url: '/v1/plans' },

    // VOICE AI
    { method: 'POST', url: '/v1/voice-ai/outgoing-call' },

    // LOGOUT
    { method: 'POST', url: '/v1/auth/logout' }
];