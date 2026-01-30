// Scenario Data
const scenarios = {
    review: {
        userMessage: '"/review this PR"',
        skillInject: 'Review guidelines: Check for bugs, security issues, code style...',
        skillResponse: 'Found 3 issues: Missing null check on line 42, SQL injection risk in query builder...',
        subagentUserMessage: '"Review this PR thoroughly"',
        agentWork: ['Reading PR diff...', 'Analyzing 12 changed files', 'Checking against patterns'],
        summaryContent: 'PR has 3 critical issues and 5 suggestions. See detailed report.',
        recommended: 'skills',
        whyTitle: '🎯 Skills wins: It\'s like having a code reviewer sitting next to you',
        whyExplanation: 'Think of Skills like a colleague who\'s been in the meeting with you all day. When you say "/review this PR," they already know you\'ve been discussing the auth refactor, so they\'ll pay extra attention there. A subagent would be like calling in a contractor who needs to be briefed from scratch every time.',
        factors: [
            { type: 'pro', text: 'Just type /review' },
            { type: 'pro', text: 'Knows your conversation' },
            { type: 'pro', text: 'Rich, detailed feedback' },
            { type: 'con', text: 'Big PRs eat context' }
        ]
    },
    explore: {
        userMessage: '"How does auth work here?"',
        skillInject: 'Explore patterns: Look for auth middleware, JWT handling...',
        skillResponse: 'Based on what I can see, auth uses JWT tokens stored in cookies...',
        subagentUserMessage: '"Explore the auth system"',
        agentWork: ['Hunting through 47 files...', 'Following the breadcrumbs...', 'Mapping the maze...'],
        summaryContent: 'Auth = JWT + refresh tokens. Start at: auth.ts → middleware.ts → session.ts',
        recommended: 'subagents',
        whyTitle: '🔍 Subagents wins: Send a scout, not the whole army',
        whyExplanation: 'Exploring a codebase is like searching a library for a topic you don\'t fully understand yet. You might pull 50 books off the shelves before finding what you need. The Explore subagent does this grunt work in a "side room" using Haiku (fast & cheap) and comes back with just the answer—your main conversation stays clean and focused.',
        factors: [
            { type: 'pro', text: 'Reads 50+ files, no sweat' },
            { type: 'pro', text: 'Explore agent uses Haiku' },
            { type: 'pro', text: 'Your context stays pristine' },
            { type: 'pro', text: 'Returns the TL;DR' }
        ]
    },
    standards: {
        userMessage: '"Follow our team\'s coding standards"',
        skillInject: 'Team standards: TypeScript strict, functional components, no any...',
        skillResponse: 'Got it! I\'ll use TypeScript strict mode, functional components, and no sneaky "any" types.',
        subagentUserMessage: '"Check code against standards"',
        agentWork: ['Loading .eslintrc...', 'Scanning 200+ files', 'Comparing patterns'],
        summaryContent: '15 files break standards. Main culprits: missing types, class components.',
        recommended: 'skills',
        whyTitle: '📏 Skills wins: Rules that stick around',
        whyExplanation: 'Imagine telling a new teammate "we use tabs, not spaces" once, and they remember it forever. That\'s Skills. The standards load into context and apply to everything Claude writes for the rest of your session. With subagents, you\'d have to re-explain your standards every single time—like that teammate with short-term memory loss.',
        factors: [
            { type: 'pro', text: 'Set once, applies forever' },
            { type: 'pro', text: 'Every file follows rules' },
            { type: 'pro', text: 'Stack multiple skills' },
            { type: 'con', text: 'Long rules eat context' }
        ]
    },
    commit: {
        userMessage: '"/commit"',
        skillInject: 'Commit style: conventional commits, ticket numbers, be concise...',
        skillResponse: 'feat(auth): add JWT refresh token support\n\nAuto-refreshes expired tokens. Closes #123',
        subagentUserMessage: '"Generate a commit message"',
        agentWork: ['Reading git diff...', 'Analyzing changes...', 'Formatting message...'],
        summaryContent: 'Suggested: "feat(auth): add JWT refresh"',
        recommended: 'skills',
        whyTitle: '✨ Skills wins: The commit whisperer',
        whyExplanation: 'You just spent 20 minutes building a feature with Claude. You discussed edge cases, debated naming, fixed that weird bug. Now type /commit and Claude writes a perfect commit message because it was there for the whole journey. A subagent would just see the diff and guess—like describing a movie from the closing credits.',
        factors: [
            { type: 'pro', text: 'One keystroke: /commit' },
            { type: 'pro', text: 'Lived through the changes' },
            { type: 'pro', text: 'Your team\'s style baked in' },
            { type: 'pro', text: 'Tiny context footprint' }
        ]
    },
    refactor: {
        userMessage: '"Refactor auth to use OAuth"',
        skillInject: 'Refactoring guide: Preserve tests, update incrementally...',
        skillResponse: 'I\'ll start refactoring. First, let me understand the current auth...',
        subagentUserMessage: '"Plan the OAuth migration"',
        agentWork: ['Mapping current auth flow...', 'Tracing 34 tangled files...', 'Finding the scary parts...'],
        summaryContent: 'Auth touches 34 files in 5 modules. Start here: AuthProvider → middleware → routes',
        recommended: 'subagents',
        whyTitle: '🗺️ Subagents wins: Reconnaissance before the invasion',
        whyExplanation: 'Big refactors are like renovating a house—you need to know where all the pipes are before you start swinging a hammer. A subagent does the messy exploration work (reading 34 files, tracing dependencies) and hands you a clean blueprint. Your main context stays focused on the actual renovation.',
        factors: [
            { type: 'pro', text: 'Maps the danger zones' },
            { type: 'pro', text: 'Finds hidden dependencies' },
            { type: 'pro', text: 'Clean, actionable plan' },
            { type: 'pro', text: 'No exploration clutter' }
        ]
    },
    debug: {
        userMessage: '"Help! TypeError: Cannot read property of undefined"',
        skillInject: 'Debug mode: Check stack trace, identify null refs, trace data flow...',
        skillResponse: 'Ah, I see it! UserService.ts line 42—user.profile is undefined when the API returns early...',
        subagentUserMessage: '"Find what\'s causing this error"',
        agentWork: ['Hunting the bug...', 'Following the stack trace...', 'Checking edge cases...'],
        summaryContent: 'Bug found: UserService.ts:42 missing null check after API call.',
        recommended: 'skills',
        whyTitle: '🐛 Skills wins: Debugging is a conversation',
        whyExplanation: 'Debugging is like playing detective with a partner. You share a clue ("it crashes here"), Claude spots something ("that variable looks suspicious"), you test a theory ("what if I add a null check?"). This back-and-forth needs shared memory. A subagent would be like swapping partners every 5 minutes.',
        factors: [
            { type: 'pro', text: 'Real-time back-and-forth' },
            { type: 'pro', text: 'Remembers dead ends' },
            { type: 'pro', text: 'Asks smart questions' },
            { type: 'con', text: 'Deep dives use context' }
        ]
    },
    docs: {
        userMessage: '"Document all the API endpoints"',
        skillInject: 'Doc style: JSDoc format, include examples, describe params...',
        skillResponse: 'I\'ll document each endpoint. Starting with /api/users...',
        subagentUserMessage: '"Generate complete API docs"',
        agentWork: ['Discovering all routes...', 'Reading 28 endpoint files...', 'Building the spec...'],
        summaryContent: '28 endpoints cataloged across 6 routers. OpenAPI spec ready!',
        recommended: 'subagents',
        whyTitle: '📚 Subagents wins: The tireless librarian',
        whyExplanation: 'Generating API docs means reading every endpoint file, extracting types, finding examples—tedious work that would fill your context with boilerplate. A subagent is like sending an intern to catalog everything. They disappear for a while, then return with a complete, organized document. You never see the mess.',
        factors: [
            { type: 'pro', text: 'Catalogs everything' },
            { type: 'pro', text: 'Handles tedious work' },
            { type: 'pro', text: 'Returns polished output' },
            { type: 'pro', text: 'Works in background' }
        ]
    }
};

// Current state
let currentScenario = 'review';
let isPlaying = false;
let animationTimeouts = [];

// DOM Elements
const scenarioButtons = document.querySelectorAll('.scenario-btn');
const playBtn = document.getElementById('playBtn');
const resetBtn = document.getElementById('resetBtn');

// Panel Elements
const skillsPanel = document.getElementById('skillsPanel');
const subagentsPanel = document.getElementById('subagentsPanel');
const skillsBadge = document.getElementById('skillsBadge');
const subagentsBadge = document.getElementById('subagentsBadge');

// Why Section Elements
const whyCard = document.getElementById('whyCard');
const whyTitle = document.getElementById('whyTitle');
const whyExplanation = document.getElementById('whyExplanation');
const whyFactors = document.getElementById('whyFactors');

// Skills Animation Elements
const skillUser = document.getElementById('skillUser');
const skillUserMsg = document.getElementById('skillUserMsg');
const skillArrow1 = document.getElementById('skillArrow1');
const skillClaude = document.getElementById('skillClaude');
const skillArrow2 = document.getElementById('skillArrow2');
const skillInject = document.getElementById('skillInject');
const skillInjectContent = document.getElementById('skillInjectContent');
const skillArrow3 = document.getElementById('skillArrow3');
const skillResponse = document.getElementById('skillResponse');
const skillResponseContent = document.getElementById('skillResponseContent');

// Subagents Animation Elements
const subagentUser = document.getElementById('subagentUser');
const subagentUserMsg = document.getElementById('subagentUserMsg');
const subagentArrow1 = document.getElementById('subagentArrow1');
const subagentClaude = document.getElementById('subagentClaude');
const spawnArrow = document.getElementById('spawnArrow');
const agentContext = document.getElementById('agentContext');
const work1 = document.getElementById('work1');
const work2 = document.getElementById('work2');
const work3 = document.getElementById('work3');
const returnArrow = document.getElementById('returnArrow');
const summaryReturn = document.getElementById('summaryReturn');
const summaryContent = document.getElementById('summaryContent');

// Wizard Elements
const wizardQuestion = document.getElementById('wizardQuestion');
const wizardOptions = document.getElementById('wizardOptions');
const wizardResult = document.getElementById('wizardResult');
const questionText = document.getElementById('questionText');
const resultRecommendation = document.getElementById('resultRecommendation');
const resultExplanation = document.getElementById('resultExplanation');
const restartWizard = document.getElementById('restartWizard');

// Wizard Questions
const wizardFlow = {
    start: {
        question: 'What are you trying to do?',
        options: [
            { text: '🔍 Explore or search through code', next: 'codebaseSize' },
            { text: '⌨️ Create a /command users can type', next: 'skillResult' },
            { text: '🎨 Make Claude follow certain rules/style', next: 'contextNeeded' },
            { text: '⚡ Run multiple things at once', next: 'subagentResult' }
        ]
    },
    codebaseSize: {
        question: 'How deep does the rabbit hole go?',
        options: [
            { text: 'Shallow dive — just a few files', next: 'contextNeeded' },
            { text: 'Medium plunge — 10-50 files', next: 'subagentResult' },
            { text: 'Deep sea expedition — 50+ files', next: 'subagentResultStrong' }
        ]
    },
    contextNeeded: {
        question: 'Does it need to remember our conversation?',
        options: [
            { text: 'Yes! "Remember that bug we discussed..."', next: 'skillResult' },
            { text: 'Nope, it can work with a blank slate', next: 'costSensitive' }
        ]
    },
    costSensitive: {
        question: 'How much do you care about token costs?',
        options: [
            { text: 'Every token counts 💰', next: 'subagentResult' },
            { text: 'Quality over cost', next: 'skillResult' }
        ]
    },
    skillResult: {
        result: 'skills',
        title: '🎯 Use a Skill!',
        explanation: 'Skills are your pair programmer—they remember your conversation, respond to /commands, and keep your team\'s rules in mind. Perfect for interactive work like debugging, reviewing, and committing.'
    },
    subagentResult: {
        result: 'subagents',
        title: '🔍 Use a Subagent!',
        explanation: 'Subagents are your research team—they dive deep, read tons of files, and come back with a clean summary. Your main conversation stays uncluttered. Great for exploration, documentation, and planning.'
    },
    subagentResultStrong: {
        result: 'subagents',
        title: '🚀 Definitely Subagent!',
        explanation: 'With 50+ files to explore, a subagent is the only sane choice. Imagine stuffing 50 files into your conversation—chaos! Send a subagent instead. It\'ll do the heavy lifting and return with just the goods.'
    }
};

let currentWizardStep = 'start';

// Initialize
function init() {
    updateScenarioContent();
    setupEventListeners();
    renderWizardStep('start');
}

function setupEventListeners() {
    // Scenario buttons
    scenarioButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            scenarioButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentScenario = btn.dataset.scenario;
            resetAnimations();
            updateScenarioContent();
        });
    });

    // Play/Reset buttons
    playBtn.addEventListener('click', () => {
        if (!isPlaying) {
            playAnimations();
        }
    });

    resetBtn.addEventListener('click', resetAnimations);

    // Wizard restart
    restartWizard.addEventListener('click', () => {
        wizardResult.style.display = 'none';
        wizardQuestion.style.display = 'block';
        renderWizardStep('start');
    });
}

function updateScenarioContent() {
    const scenario = scenarios[currentScenario];

    // Update skill side
    skillUserMsg.textContent = scenario.userMessage;
    skillInjectContent.textContent = scenario.skillInject;
    skillResponseContent.textContent = scenario.skillResponse;

    // Update subagent side
    subagentUserMsg.textContent = scenario.subagentUserMessage;
    work1.textContent = scenario.agentWork[0];
    work2.textContent = scenario.agentWork[1];
    work3.textContent = scenario.agentWork[2];
    summaryContent.textContent = scenario.summaryContent;

    // Update why section content (but hide recommendation badges until animation completes)
    updateWhySection(scenario);
    hideRecommendationBadges();
}

function hideRecommendationBadges() {
    // Reset panel states - no highlighting until animation completes
    skillsPanel.classList.remove('recommended', 'not-recommended');
    subagentsPanel.classList.remove('recommended', 'not-recommended');
    skillsBadge.classList.remove('visible');
    subagentsBadge.classList.remove('visible');
    whyCard.classList.remove('visible');
}

function showRecommendation() {
    const scenario = scenarios[currentScenario];

    // Apply recommendation highlighting
    if (scenario.recommended === 'skills') {
        skillsPanel.classList.add('recommended');
        subagentsPanel.classList.add('not-recommended');
        skillsBadge.classList.add('visible');
    } else {
        subagentsPanel.classList.add('recommended');
        skillsPanel.classList.add('not-recommended');
        subagentsBadge.classList.add('visible');
    }

    // Show the why section
    whyCard.classList.add('visible');
}

function updateWhySection(scenario) {
    // Update why section content
    whyTitle.textContent = scenario.whyTitle;
    whyExplanation.textContent = scenario.whyExplanation;

    // Update factors
    whyFactors.innerHTML = '';
    scenario.factors.forEach(factor => {
        const factorEl = document.createElement('span');
        factorEl.className = `why-factor ${factor.type}`;
        factorEl.innerHTML = `<span>${factor.type === 'pro' ? '✓' : '~'}</span> ${factor.text}`;
        whyFactors.appendChild(factorEl);
    });
}

function clearTimeouts() {
    animationTimeouts.forEach(t => clearTimeout(t));
    animationTimeouts = [];
}

function resetAnimations() {
    clearTimeouts();
    isPlaying = false;
    playBtn.textContent = 'Play';

    // Reset skill animations
    [skillUser, skillClaude].forEach(el => el.classList.remove('visible'));
    [skillArrow1, skillArrow2, skillArrow3].forEach(el => el.classList.remove('visible'));
    skillUserMsg.classList.remove('visible');
    skillInject.classList.remove('visible');
    skillResponse.classList.remove('visible');

    // Reset subagent animations
    [subagentUser, subagentClaude].forEach(el => el.classList.remove('visible'));
    subagentArrow1.classList.remove('visible');
    subagentUserMsg.classList.remove('visible');
    spawnArrow.classList.remove('visible');
    agentContext.classList.remove('visible');
    [work1, work2, work3].forEach(el => el.classList.remove('visible'));
    returnArrow.classList.remove('visible');
    summaryReturn.classList.remove('visible');
}

function playAnimations() {
    resetAnimations();
    isPlaying = true;
    playBtn.textContent = 'Playing...';

    // Skills Animation Timeline
    const skillTimeline = [
        { delay: 0, action: () => skillUser.classList.add('visible') },
        { delay: 300, action: () => skillUserMsg.classList.add('visible') },
        { delay: 600, action: () => skillArrow1.classList.add('visible') },
        { delay: 900, action: () => skillClaude.classList.add('visible') },
        { delay: 1200, action: () => skillArrow2.classList.add('visible') },
        { delay: 1500, action: () => skillInject.classList.add('visible') },
        { delay: 2000, action: () => skillArrow3.classList.add('visible') },
        { delay: 2300, action: () => skillResponse.classList.add('visible') }
    ];

    // Subagents Animation Timeline
    const subagentTimeline = [
        { delay: 0, action: () => subagentUser.classList.add('visible') },
        { delay: 300, action: () => subagentUserMsg.classList.add('visible') },
        { delay: 600, action: () => subagentArrow1.classList.add('visible') },
        { delay: 900, action: () => subagentClaude.classList.add('visible') },
        { delay: 1200, action: () => spawnArrow.classList.add('visible') },
        { delay: 1500, action: () => agentContext.classList.add('visible') },
        { delay: 1800, action: () => work1.classList.add('visible') },
        { delay: 2100, action: () => work2.classList.add('visible') },
        { delay: 2400, action: () => work3.classList.add('visible') },
        { delay: 2700, action: () => returnArrow.classList.add('visible') },
        { delay: 3000, action: () => summaryReturn.classList.add('visible') }
    ];

    // Execute timelines
    [...skillTimeline, ...subagentTimeline].forEach(({ delay, action }) => {
        const timeout = setTimeout(action, delay);
        animationTimeouts.push(timeout);
    });

    // Show recommendation after animations complete
    const recommendTimeout = setTimeout(() => {
        showRecommendation();
    }, 3200);
    animationTimeouts.push(recommendTimeout);

    // Reset play button after animations complete
    const finalTimeout = setTimeout(() => {
        isPlaying = false;
        playBtn.textContent = 'Play';
    }, 3500);
    animationTimeouts.push(finalTimeout);
}

// Wizard Functions
function renderWizardStep(stepId) {
    currentWizardStep = stepId;
    const step = wizardFlow[stepId];

    if (step.result) {
        // Show result
        wizardQuestion.style.display = 'none';
        wizardResult.style.display = 'block';

        resultRecommendation.textContent = step.title;
        resultRecommendation.className = 'result-recommendation ' + step.result;
        resultExplanation.textContent = step.explanation;
    } else {
        // Show question
        questionText.textContent = step.question;
        wizardOptions.innerHTML = '';

        step.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'wizard-option';
            btn.textContent = option.text;
            btn.addEventListener('click', () => renderWizardStep(option.next));
            wizardOptions.appendChild(btn);
        });
    }
}

// Start the app
init();
