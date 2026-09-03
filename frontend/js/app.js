/* ============================================================
   AgentEd - Multi-Agent AI Platform JavaScript Engine
   Handles Auth, REST API communication, AI Agent logic, and mock fallback
   ============================================================ */

const API_BASE_URL = 'http://localhost:8080/api';

// Initial Mock Data (Fallback when Spring Boot backend is offline)
const MOCK_DATA = {
    user: {
        id: 1,
        name: "Alex Rivera",
        email: "alex@agented.com",
        targetTopic: "Spring Boot & AI Agents"
    },
    courses: [
        {
            id: 1,
            title: "Mastering Spring Boot 3 & JPA",
            description: "Build enterprise microservices with Java, Spring Boot, and Spring Data JPA.",
            category: "Backend Development",
            level: "Intermediate",
            durationHours: 24,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            title: "Multi-Agent AI Engineering",
            description: "Learn how to build collaborative AI agents using LLMs and modern frameworks.",
            category: "Artificial Intelligence",
            level: "Advanced",
            durationHours: 18,
            rating: 4.8,
            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            title: "Full Stack Web Architecture",
            description: "Master HTML5, CSS3, JavaScript, RESTful APIs, and Bootstrap UI integration.",
            category: "Web Development",
            level: "Beginner",
            durationHours: 30,
            rating: 4.7,
            imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            title: "Data Structures & Algorithms in Java",
            description: "Deep dive into binary trees, graphs, sorting, and optimization.",
            category: "Computer Science",
            level: "Intermediate",
            durationHours: 35,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            title: "Cloud Native Microservices & K8s",
            description: "Deploy scalable cloud services with Docker, Kubernetes, and API Gateways.",
            category: "Cloud Computing",
            level: "Advanced",
            durationHours: 28,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 6,
            title: "Cybersecurity & Spring Security 6",
            description: "Secure Spring Boot microservices with OAuth2, JWT tokens, and CORS protection.",
            category: "Security",
            level: "Intermediate",
            durationHours: 20,
            rating: 4.8,
            imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 7,
            title: "Python for Data Science & ML",
            description: "Master NumPy, Pandas, Scikit-Learn, and Neural Networks for predictive analytics.",
            category: "Data Science",
            level: "Beginner",
            durationHours: 32,
            rating: 4.9,
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 8,
            title: "DevOps Pipeline & CI/CD Mastery",
            description: "Automate build, test, and release pipelines using GitHub Actions, Jenkins, and Terraform.",
            category: "DevOps",
            level: "Intermediate",
            durationHours: 22,
            rating: 4.7,
            imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 9,
            title: "React & Next.js Modern UI System",
            description: "Build ultra-responsive web user interfaces with React 18, Next.js App Router, and Tailwind.",
            category: "Web Development",
            level: "Intermediate",
            durationHours: 26,
            rating: 4.8,
            imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 10,
            title: "iOS & Flutter Cross-Platform Dev",
            description: "Create native iOS and Android apps using Dart, Flutter SDK, and REST integration.",
            category: "Mobile Development",
            level: "Beginner",
            durationHours: 25,
            rating: 4.7,
            imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80"
        }
    ],
    quizzes: [
        {
            id: 101,
            topic: "Spring Boot",
            question: "Which annotation is used to mark a class as a REST Controller in Spring Boot?",
            optionA: "@Controller",
            optionB: "@RestController",
            optionC: "@Service",
            optionD: "@Component",
            correctAnswer: "B",
            explanation: "@RestController combines @Controller and @ResponseBody."
        },
        {
            id: 102,
            topic: "Spring Boot",
            question: "What is the default embedded web server in Spring Boot applications?",
            optionA: "Jetty",
            optionB: "GlassFish",
            optionC: "Tomcat",
            optionD: "Undertow",
            correctAnswer: "C",
            explanation: "Spring Boot Web starter includes embedded Apache Tomcat by default."
        },
        {
            id: 103,
            topic: "Spring Data JPA",
            question: "Which repository interface provides standard CRUD and pagination operations out of the box?",
            optionA: "JpaRepository",
            optionB: "EntityServices",
            optionC: "QueryBuilder",
            optionD: "OrmManager",
            correctAnswer: "A",
            explanation: "JpaRepository extends PagingAndSortingRepository and CrudRepository to provide full database operations."
        },
        {
            id: 104,
            topic: "Spring Boot Config",
            question: "Which human-readable data format is commonly used alongside .properties files for application configuration?",
            optionA: "XML (.xml)",
            optionB: "YAML (.yaml or .yml)",
            optionC: "JSON (.json)",
            optionD: "INI (.ini)",
            correctAnswer: "B",
            explanation: "Spring Boot natively supports YAML configuration files via SnakeYAML library."
        },
        {
            id: 105,
            topic: "Dependency Injection",
            question: "Which Spring annotation automatically injects bean dependencies into constructors or fields?",
            optionA: "@InjectBean",
            optionB: "@Autowired",
            optionC: "@Connect",
            optionD: "@ResourceBind",
            correctAnswer: "B",
            explanation: "@Autowired allows Spring to resolve and inject collaborating beans into your container."
        },
        {
            id: 106,
            topic: "Microservices",
            question: "Which Netflix Spring Cloud module acts as a service discovery registry for microservices?",
            optionA: "Eureka Server",
            optionB: "Spring Batch",
            optionC: "Hibernate Validator",
            optionD: "Thymeleaf Engine",
            correctAnswer: "A",
            explanation: "Eureka Server acts as a service registry where microservices dynamically register and discover each other."
        },
        {
            id: 107,
            topic: "Spring Security",
            question: "Which bean configuration interface is used in Spring Security 6+ to specify HTTP endpoint security rules?",
            optionA: "SecurityFilterChain",
            optionB: "WebAuthManager",
            optionC: "GuardFilter",
            optionD: "AccessController",
            correctAnswer: "A",
            explanation: "SecurityFilterChain bean definitions replace WebSecurityConfigurerAdapter in modern Spring Security."
        },
        {
            id: 108,
            topic: "RESTful API Design",
            question: "Which HTTP method should be used when applying partial updates to an existing resource?",
            optionA: "GET",
            optionB: "POST",
            optionC: "PUT",
            optionD: "PATCH",
            correctAnswer: "D",
            explanation: "HTTP PATCH is used for partial updates, whereas HTTP PUT typically replaces the entire resource."
        },
        {
            id: 109,
            topic: "Multi-Agent AI",
            question: "In a Multi-Agent AI system, what primary task is a Planner Agent responsible for?",
            optionA: "Directly writing SQL data to storage",
            optionB: "Decomposing complex goals into sequential step-by-step sub-tasks",
            optionC: "Rendering CSS stylesheets on front-end pages",
            optionD: "Handling operating system thread scheduling",
            correctAnswer: "B",
            explanation: "Planner Agents analyze high-level user requests and break them down into structured execution steps."
        },
        {
            id: 110,
            topic: "Spring Boot Monitoring",
            question: "Which Spring Boot starter provides operational metrics, health checks, and environment info endpoints?",
            optionA: "spring-boot-starter-actuator",
            optionB: "spring-boot-starter-metrics",
            optionC: "spring-boot-starter-health",
            optionD: "spring-boot-starter-devtools",
            correctAnswer: "A",
            explanation: "Spring Boot Actuator brings production-ready endpoints like /actuator/health and /actuator/metrics."
        }
    ],
    progress: {
        completedLessons: 22,
        totalLessons: 30,
        overallCompletionPercentage: 73.3,
        averageQuizScore: 88.5,
        masteryLevel: "INTERMEDIATE MASTERY",
        strongTopics: ["Spring Boot REST", "JPA Mapping", "Bootstrap 5"],
        weakTopics: ["Microservices Security", "Async WebSockets"],
        agentAdvice: "ProgressAgent recommendation: Spend 15 minutes reviewing Microservices Security patterns to reach Advanced Mastery."
    }
};

// Global App Utilities
const App = {
    getUser() {
        const stored = localStorage.getItem('agented_user');
        return stored ? JSON.parse(stored) : MOCK_DATA.user;
    },

    setUser(user) {
        localStorage.setItem('agented_user', JSON.stringify(user));
    },

    logout() {
        localStorage.removeItem('agented_user');
        window.location.href = 'login.html';
    },

    getQuizAttempts() {
        const stored = localStorage.getItem('agented_quiz_attempts');
        return stored ? JSON.parse(stored) : {};
    },

    saveQuizAttempt(quizId, attemptData) {
        const attempts = this.getQuizAttempts();
        attempts[quizId] = attemptData;
        localStorage.setItem('agented_quiz_attempts', JSON.stringify(attempts));
    },

    resetQuizProgress() {
        if (confirm("Are you sure you want to reset all quiz attempt progress?")) {
            localStorage.removeItem('agented_quiz_attempts');
            if (window.location.pathname.toLowerCase().includes('progress.html')) {
                initProgress();
            } else if (window.location.pathname.toLowerCase().includes('quiz.html')) {
                initQuiz();
            }
        }
    },

    calculateQuizProgress(allQuizzes) {
        const quizzes = (allQuizzes && allQuizzes.length > 0) ? allQuizzes : MOCK_DATA.quizzes;
        const attempts = this.getQuizAttempts();
        const totalQuizzes = quizzes.length;
        const attemptedKeys = Object.keys(attempts);
        const attemptedCount = attemptedKeys.length;

        let totalCorrect = 0;
        attemptedKeys.forEach(id => {
            if (attempts[id] && attempts[id].isCorrect) {
                totalCorrect++;
            }
        });

        const overallCompletionPercentage = totalQuizzes > 0 ? Math.round(((attemptedCount / totalQuizzes) * 100) * 10) / 10 : 0;
        const averageQuizScore = attemptedCount > 0 ? Math.round(((totalCorrect / attemptedCount) * 100) * 10) / 10 : 0;

        // Group by topic to analyze strong vs weak topics
        const topicStats = {};
        quizzes.forEach(q => {
            const t = q.topic || 'General';
            if (!topicStats[t]) {
                topicStats[t] = { total: 0, attempted: 0, correct: 0 };
            }
            topicStats[t].total++;
            if (attempts[q.id]) {
                topicStats[t].attempted++;
                if (attempts[q.id].isCorrect) {
                    topicStats[t].correct++;
                }
            }
        });

        const strongTopics = [];
        const weakTopics = [];

        Object.keys(topicStats).forEach(topic => {
            const stat = topicStats[topic];
            if (stat.attempted > 0 && (stat.correct / stat.attempted) >= 0.7) {
                strongTopics.push(topic);
            } else {
                weakTopics.push(topic);
            }
        });

        let masteryLevel = "NOT STARTED";
        if (attemptedCount > 0) {
            if (averageQuizScore >= 85) masteryLevel = "ADVANCED MASTERY";
            else if (averageQuizScore >= 70) masteryLevel = "INTERMEDIATE MASTERY";
            else masteryLevel = "DEVELOPING / NEEDS FOCUS";
        }

        let agentAdvice = "";
        if (attemptedCount === 0) {
            agentAdvice = "ProgressAgent Analysis: No quizzes completed yet. Head to Quiz Agent to attempt questions and build your skill analytics!";
        } else if (weakTopics.length > 0) {
            agentAdvice = `ProgressAgent Analysis: You have completed ${attemptedCount} of ${totalQuizzes} quizzes with an average score of ${averageQuizScore}%. Review concepts in '${weakTopics.slice(0, 3).join(', ')}' to reach Advanced Mastery!`;
        } else {
            agentAdvice = `ProgressAgent Analysis: Outstanding work! You achieved ${averageQuizScore}% average score across ${attemptedCount}/${totalQuizzes} quizzes. You hold Advanced Mastery status!`;
        }

        return {
            totalQuizzes,
            attemptedCount,
            totalCorrect,
            overallCompletionPercentage,
            averageQuizScore,
            masteryLevel,
            strongTopics,
            weakTopics,
            agentAdvice,
            topicStats,
            attempts,
            quizzes
        };
    },

    async fetchAPI(endpoint, options = {}) {
        try {
            const res = await fetch(`${API_BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return await res.json();
        } catch (err) {
            console.warn(`Backend API ${endpoint} unavailable, using intelligent fallback.`, err);
            return null; // Fallback handled by caller
        }
    }
};

// Page Initializer Router
document.addEventListener('DOMContentLoaded', () => {
    // Update User Avatar / Name if logged in
    const currentUser = App.getUser();
    const userNameEls = document.querySelectorAll('.user-display-name');
    userNameEls.forEach(el => el.textContent = currentUser.name || "Alex Rivera");

    // Route page handlers
    const path = window.location.pathname.toLowerCase();

    if (path.includes('login.html')) initLogin();
    else if (path.includes('register.html')) initRegister();
    else if (path.includes('dashboard.html')) initDashboard();
    else if (path.includes('courses.html')) initCourses();
    else if (path.includes('quiz.html')) initQuiz();
    else if (path.includes('recommendations.html')) initRecommendations();
    else if (path.includes('progress.html')) initProgress();
});

// Login Handler
function initLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const res = await App.fetchAPI('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (res && res.status === 'SUCCESS') {
            App.setUser(res.user);
        } else {
            // Mock login success for offline demo
            App.setUser({ name: email.split('@')[0], email: email });
        }
        window.location.href = 'dashboard.html';
    });
}

// Register Handler
function initRegister() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const res = await App.fetchAPI('/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role: 'STUDENT' })
        });

        App.setUser({ name, email });
        window.location.href = 'dashboard.html';
    });
}

// Dashboard Handler & AI Tutor Interactive Chat
async function initDashboard() {
    const report = App.calculateQuizProgress();

    const dashboardData = await App.fetchAPI('/dashboard') || {
        welcome: { studentName: App.getUser().name, targetTopic: "Spring Boot & Microservices" },
        recentCourses: MOCK_DATA.courses,
        userProgress: MOCK_DATA.progress
    };

    // Update Progress Badge on Dashboard if present
    const progBadge = document.querySelector('.badge-progress + .badge');
    if (progBadge) {
        progBadge.textContent = `${report.overallCompletionPercentage}% Complete`;
    }

    // Render Recent Courses
    const coursesContainer = document.getElementById('dashboardCourses');
    if (coursesContainer) {
        coursesContainer.innerHTML = dashboardData.recentCourses.slice(0, 3).map(c => `
            <div class="col-md-4 mb-4">
                <div class="glass-card h-100 d-flex flex-column">
                    <img src="${c.imageUrl}" class="rounded mb-3" style="height:140px; object-fit:cover;" alt="${c.title}">
                    <span class="badge bg-primary w-auto align-self-start mb-2">${c.category}</span>
                    <h5 class="mb-2">${c.title}</h5>
                    <p class="text-muted small flex-grow-1">${(c.description || '').substring(0, 90)}...</p>
                    <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
                        <span class="small text-warning"><i class="fas fa-star me-1"></i>${c.rating}</span>
                        <a href="courses.html" class="btn btn-sm btn-agented-outline">View Course</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Setup Interactive AI Tutor Chat Widget
    setupTutorChat();
}

function setupTutorChat() {
    const chatInput = document.getElementById('tutorQueryInput');
    const sendBtn = document.getElementById('sendTutorQuery');
    const chatContainer = document.getElementById('tutorChatContainer');

    if (!sendBtn || !chatInput || !chatContainer) return;

    const handleSend = async () => {
        const query = chatInput.value.trim();
        if (!query) return;

        // Render User Bubble
        chatContainer.innerHTML += `
            <div class="chat-bubble chat-bubble-user">
                <strong>You:</strong> ${query}
            </div>
        `;
        chatInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Fetch AI Response
        const res = await App.fetchAPI(`/tutor?query=${encodeURIComponent(query)}`) || {
            explanation: `TutorAgent Answer for '${query}': Focus on breaking down the core concepts into 3 key pillars: Architecture, Controller design, and JPA Persistence. Practice with real projects!`
        };

        const explanationText = (res && res.explanation) ? res.explanation : `TutorAgent Answer for '${query}': Practice breaking down concepts into architecture, controller design, and JPA persistence!`;

        // Render Tutor Agent Bubble
        chatContainer.innerHTML += `
            <div class="chat-bubble chat-bubble-agent">
                <div class="d-flex align-items-center mb-1">
                    <span class="agent-badge badge-tutor me-2"><i class="fas fa-robot me-1"></i>TutorAgent</span>
                    <small class="text-muted">Just now</small>
                </div>
                ${explanationText.replace(/\n/g, '<br>')}
            </div>
        `;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
}

// Courses Page Handler
async function initCourses() {
    const courses = await App.fetchAPI('/courses') || MOCK_DATA.courses;
    const container = document.getElementById('coursesCatalog');
    if (!container) return;

    container.innerHTML = courses.map(c => `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="glass-card h-100 d-flex flex-column">
                <img src="${c.imageUrl}" class="rounded mb-3" style="height: 160px; object-fit: cover;" alt="${c.title}">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span class="badge bg-indigo text-light px-2 py-1" style="background:#0284c7">${c.category}</span>
                    <span class="badge bg-dark text-muted border border-secondary">${c.level}</span>
                </div>
                <h4>${c.title}</h4>
                <p class="text-muted small flex-grow-1">${c.description}</p>
                <div class="d-flex justify-content-between align-items-center border-top border-secondary pt-3 mt-2">
                    <span class="text-muted small"><i class="far fa-clock me-1"></i>${c.durationHours} Hours</span>
                    <button class="btn btn-sm btn-agented-primary" onclick="alert('Enrolled in ${c.title}! TutorAgent is ready to assist you.')">Start Learning</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Quiz Page Handler
window.loadedQuizzes = {};

async function initQuiz() {
    const apiQuizzes = await App.fetchAPI('/quiz?topic=Spring%20Boot');
    const quizzes = (apiQuizzes && apiQuizzes.length > 0) ? apiQuizzes : MOCK_DATA.quizzes;
    const container = document.getElementById('quizContainer');
    if (!container) return;

    window.loadedQuizzes = {};
    quizzes.forEach(q => { window.loadedQuizzes[q.id] = q; });

    const attempts = App.getQuizAttempts();

    // Render Quiz Header Summary Banner
    const report = App.calculateQuizProgress(quizzes);
    let bannerHtml = `
        <div class="glass-card mb-4 border-primary border-opacity-25 p-3">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                <div>
                    <h6 class="font-heading mb-1 text-primary"><i class="fas fa-chart-line me-2"></i>Active Quiz Assessment Progress</h6>
                    <span class="small text-muted me-3">Quizzes Answered: <strong>${report.attemptedCount} / ${report.totalQuizzes}</strong></span>
                    <span class="small text-muted me-3">Avg Score: <strong class="text-warning">${report.averageQuizScore}%</strong></span>
                    <span class="small text-muted">Mastery: <strong class="text-success">${report.masteryLevel}</strong></span>
                </div>
                <div class="mt-2 mt-md-0 d-flex gap-2">
                    <a href="progress.html" class="btn btn-sm btn-agented-primary"><i class="fas fa-line-chart me-1"></i>View Full Analytics</a>
                    <button class="btn btn-sm btn-outline-danger" onclick="App.resetQuizProgress()"><i class="fas fa-undo me-1"></i>Reset</button>
                </div>
            </div>
        </div>
    `;

    let quizHtml = quizzes.map((q, idx) => {
        const pastAttempt = attempts[q.id];
        const hasAttempt = !!pastAttempt;
        const selectedVal = hasAttempt ? pastAttempt.selectedAnswer : null;

        return `
        <div class="glass-card mb-4" id="quiz-card-${q.id}">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="agent-badge badge-quiz"><i class="fas fa-brain me-1"></i>QuizAgent Question ${idx + 1}</span>
                <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-secondary">${q.topic || 'General'}</span>
                    ${hasAttempt ? (pastAttempt.isCorrect ? '<span class="badge bg-success"><i class="fas fa-check me-1"></i>Passed</span>' : '<span class="badge bg-danger"><i class="fas fa-times me-1"></i>Incorrect</span>') : ''}
                </div>
            </div>
            <h5>${q.question}</h5>
            <div class="mt-3">
                ${['A', 'B', 'C', 'D'].map(opt => `
                    <div class="form-check p-3 mb-2 rounded border ${selectedVal === opt ? 'border-primary bg-primary bg-opacity-10' : ''}" style="cursor:pointer;">
                        <input class="form-check-input ms-1 me-3" type="radio" name="quiz_${q.id}" id="q_${q.id}_${opt}" value="${opt}" ${selectedVal === opt ? 'checked' : ''}>
                        <label class="form-check-label w-100 fw-bold" for="q_${q.id}_${opt}">
                            <strong>${opt}.</strong> ${q['option' + opt]}
                        </label>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-agented-primary mt-3" onclick="submitQuizAnswer(${q.id})">${hasAttempt ? '<i class="fas fa-redo me-1"></i>Update Answer' : '<i class="fas fa-paper-plane me-1"></i>Submit Answer'}</button>
            <div id="feedback-${q.id}" class="mt-3">
                ${hasAttempt ? `
                    <div class="alert ${pastAttempt.isCorrect ? 'alert-success' : 'alert-danger'} border-0" style="background:${pastAttempt.isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color:${pastAttempt.isCorrect ? '#34d399' : '#f87171'}">
                        <h6 class="mb-1"><i class="fas ${pastAttempt.isCorrect ? 'fa-check-circle' : 'fa-times-circle'} me-2"></i>${pastAttempt.isCorrect ? 'Previous Answer: Correct' : 'Previous Answer: Incorrect'} (Selected ${pastAttempt.selectedAnswer})</h6>
                        <p class="mb-0 small text-muted"><em>Explanation:</em> ${q.explanation || 'Evaluated by QuizAgent.'}</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `}).join('');

    container.innerHTML = bannerHtml + quizHtml;
}

window.submitQuizAnswer = async function(quizId) {
    const selected = document.querySelector(`input[name="quiz_${quizId}"]:checked`);
    const feedbackDiv = document.getElementById(`feedback-${quizId}`);

    if (!selected) {
        if (feedbackDiv) feedbackDiv.innerHTML = `<div class="alert alert-warning py-2">Please select an answer first.</div>`;
        return;
    }

    const val = selected.value;
    const quiz = window.loadedQuizzes[quizId] || MOCK_DATA.quizzes.find(q => q.id == quizId) || {};

    // Call QuizAgent endpoint on backend if online
    const apiResult = await App.fetchAPI('/quiz/evaluate', {
        method: 'POST',
        body: JSON.stringify({ quizId: quizId, selectedAnswer: val })
    });

    const isCorrect = apiResult ? apiResult.isCorrect : (val === quiz.correctAnswer);
    const feedbackText = apiResult ? apiResult.feedback : (isCorrect ? "Excellent! You identified the correct concept." : "Not quite right. Review the topic concept.");
    const exp = quiz.explanation || "Correct choice aligns with standard Java/Spring Boot specifications.";

    // Save Attempt into Local Storage
    App.saveQuizAttempt(quizId, {
        quizId: quizId,
        topic: quiz.topic || 'General',
        question: quiz.question || '',
        selectedAnswer: val,
        correctAnswer: quiz.correctAnswer || '',
        isCorrect: isCorrect,
        score: isCorrect ? 100 : 0,
        timestamp: Date.now()
    });

    if (feedbackDiv) {
        feedbackDiv.innerHTML = `
            <div class="alert ${isCorrect ? 'alert-success' : 'alert-danger'} border-0" style="background:${isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}; color:${isCorrect ? '#34d399' : '#f87171'}">
                <h6 class="mb-1"><i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'} me-2"></i>${isCorrect ? 'Correct Answer!' : 'Incorrect'}</h6>
                <p class="mb-1 small">${feedbackText}</p>
                <p class="mb-0 small text-muted"><em>Explanation:</em> ${exp}</p>
            </div>
        `;
    }

    // Refresh Quiz Header Summary Banner if on quiz page
    if (window.location.pathname.toLowerCase().includes('quiz.html')) {
        initQuiz();
    }
};

// Recommendations Page Handler
async function initRecommendations() {
    const reasonsMap = {
        1: "Directly aligns with your Spring Boot target topic and backend goals.",
        2: "High relevance for LLM agent integration & automated AI workflows.",
        3: "Enhances frontend UI integration for Spring Boot REST endpoints.",
        4: "Strengthen core algorithmic efficiency for high-performance Java services.",
        5: "Complements your microservices mastery path with container orchestration.",
        6: "Recommended based on weak topics identified in recent security quizzes.",
        7: "Cross-discipline path for data analysis and ML model integration.",
        8: "Automate your Spring Boot app deployments with GitHub Actions & Docker.",
        9: "Expand full-stack capabilities with reactive component architecture.",
        10: "Build mobile frontends that consume your Spring Boot backend APIs."
    };
    const matchMap = { 1: 98, 2: 96, 3: 85, 4: 88, 5: 91, 6: 94, 7: 78, 8: 83, 9: 80, 10: 75 };

    const data = await App.fetchAPI('/recommendations') || {
        recommendations: MOCK_DATA.courses.map(c => ({
            course: c,
            matchPercentage: matchMap[c.id] || 85,
            recommendationReason: reasonsMap[c.id] || "Tailored by RecommendationAgent based on your active learning profile."
        })),
        insights: "RecommendationAgent Insight: Completing Spring Boot 3 & AI Agents will place you in the top 5% of learners this month."
    };

    const container = document.getElementById('recContainer');
    const insightsEl = document.getElementById('recInsights');
    if (insightsEl) insightsEl.textContent = data.insights;

    if (container) {
        container.innerHTML = data.recommendations.map(r => `
            <div class="glass-card mb-4">
                <div class="row align-items-center">
                    <div class="col-md-3">
                        <img src="${r.course.imageUrl}" class="img-fluid rounded" style="height:120px; width:100%; object-fit:cover;" alt="${r.course.title}">
                    </div>
                    <div class="col-md-6 my-2 my-md-0">
                        <div class="d-flex align-items-center mb-1">
                            <span class="agent-badge badge-rec me-2"><i class="fas fa-magic me-1"></i>RecommendationAgent</span>
                            <span class="text-success font-heading fw-bold fs-6">${r.matchPercentage}% Match</span>
                        </div>
                        <h4 class="mb-1 text-dark font-heading">${r.course.title}</h4>
                        <p class="text-muted small mb-0">${r.recommendationReason}</p>
                    </div>
                    <div class="col-md-3 text-md-end">
                        <a href="courses.html" class="btn btn-agented-primary">Enroll Now</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Helper for safe topic list parsing
function parseTopicList(val, defaultTopics) {
    if (!val) return defaultTopics;
    if (Array.isArray(val)) return val.map(t => String(t).trim()).filter(Boolean);
    if (typeof val === 'string') return val.split(',').map(t => t.trim()).filter(Boolean);
    if (typeof val === 'object') return Object.values(val).map(t => String(t).trim()).filter(Boolean);
    return defaultTopics;
}

// Progress Page Handler
async function initProgress() {
    const apiQuizzes = await App.fetchAPI('/quiz?topic=Spring%20Boot');
    const allQuizzes = (apiQuizzes && apiQuizzes.length > 0) ? apiQuizzes : MOCK_DATA.quizzes;

    // Calculate dynamic metrics by comparing user attempts against all quizzes
    const report = App.calculateQuizProgress(allQuizzes);

    const fillElem = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    fillElem('progCompletionRate', `${report.overallCompletionPercentage}%`);
    fillElem('progQuizzesRatio', `${report.attemptedCount} of ${report.totalQuizzes} Quizzes Completed`);
    fillElem('progAvgScore', `${report.averageQuizScore}%`);
    fillElem('progScoreRatio', `${report.totalCorrect} Correct out of ${report.attemptedCount} Attempted`);
    fillElem('progMasteryLevel', report.masteryLevel);
    fillElem('progAgentAdvice', report.agentAdvice);
    fillElem('progBarLabel', `${report.overallCompletionPercentage}% Completed`);

    const bar = document.getElementById('progProgressBar');
    if (bar) bar.style.width = `${report.overallCompletionPercentage}%`;

    // Strong Topics Rendering
    const strongEl = document.getElementById('progStrongTopics');
    if (strongEl) {
        if (report.strongTopics.length === 0) {
            strongEl.innerHTML = `<p class="text-muted small mb-0"><em>No strong skill areas identified yet. Answer more quizzes accurately to unlock!</em></p>`;
        } else {
            strongEl.innerHTML = report.strongTopics.map(t => `<span class="badge bg-success bg-opacity-25 text-success border border-success me-2 mb-2 p-2"><i class="fas fa-check-circle me-1"></i>${t}</span>`).join('');
        }
    }

    // Weak Topics Rendering
    const weakEl = document.getElementById('progWeakTopics');
    if (weakEl) {
        if (report.weakTopics.length === 0) {
            weakEl.innerHTML = `<p class="text-success small mb-0"><i class="fas fa-trophy me-1"></i><em>Great job! All attempted topic areas meet high mastery threshold.</em></p>`;
        } else {
            weakEl.innerHTML = report.weakTopics.map(t => `<span class="badge bg-danger bg-opacity-25 text-danger border border-danger me-2 mb-2 p-2"><i class="fas fa-exclamation-triangle me-1"></i>${t}</span>`).join('');
        }
    }

    // Quiz Assessment Breakdown Table Rendering
    const tableContainer = document.getElementById('progQuizTableContainer');
    if (tableContainer) {
        let tableHtml = `
            <table class="table table-hover align-middle mb-0" style="color: var(--text-main);">
                <thead>
                    <tr class="table-light">
                        <th scope="col">#</th>
                        <th scope="col">Topic</th>
                        <th scope="col">Question</th>
                        <th scope="col">Your Choice</th>
                        <th scope="col">Status</th>
                        <th scope="col" class="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        tableHtml += allQuizzes.map((q, idx) => {
            const attempt = report.attempts[q.id];
            const hasAttempt = !!attempt;
            let statusBadge = '';
            let choiceText = '-';

            if (hasAttempt) {
                choiceText = `Option ${attempt.selectedAnswer}`;
                if (attempt.isCorrect) {
                    statusBadge = `<span class="badge bg-success bg-opacity-25 text-success border border-success"><i class="fas fa-check me-1"></i>Correct (100%)</span>`;
                } else {
                    statusBadge = `<span class="badge bg-danger bg-opacity-25 text-danger border border-danger"><i class="fas fa-times me-1"></i>Incorrect (0%)</span>`;
                }
            } else {
                statusBadge = `<span class="badge bg-secondary bg-opacity-25 text-muted border border-secondary"><i class="fas fa-minus me-1"></i>Unattempted</span>`;
            }

            return `
                <tr>
                    <td class="fw-bold text-muted">${idx + 1}</td>
                    <td><span class="badge bg-dark text-muted border border-secondary">${q.topic || 'General'}</span></td>
                    <td class="fw-semibold" style="max-width: 320px;">${q.question}</td>
                    <td><strong class="text-primary">${choiceText}</strong></td>
                    <td>${statusBadge}</td>
                    <td class="text-end">
                        <a href="quiz.html" class="btn btn-sm ${hasAttempt ? 'btn-outline-secondary' : 'btn-agented-primary'}">
                            ${hasAttempt ? '<i class="fas fa-redo me-1"></i>Retake' : '<i class="fas fa-play me-1"></i>Answer'}
                        </a>
                    </td>
                </tr>
            `;
        }).join('');

        tableHtml += `
                </tbody>
            </table>
        `;

        tableContainer.innerHTML = tableHtml;
    }
}

