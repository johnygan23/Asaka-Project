export const initialProjects = [
    { id: 1, name: 'Main Project', status: 'Active', color: '#22d3ee', description: 'This is the main project for the team, focusing on core feature development.' },
    { id: 2, name: 'My second project', status: 'Paused', color: '#a78bfa', description: 'A secondary project for exploring new technologies.' },
    { id: 3, name: 'Website Redesign', status: 'Active', color: 'bg-cyan-500', description: 'Complete redesign of the company website with modern UI/UX principles, focusing on user engagement and conversion optimization.' },
    { id: 4, name: 'Mobile App', status: 'Paused', color: 'bg-yellow-400', description: 'Development of the native mobile application for iOS and Android.' },
    { id: 5, name: 'API Development', status: 'Completed', color: 'bg-green-500', description: 'Building out the new v3 API for public consumption.' },
];

export const tasksMock = [
    { id: 1, title: 'Draft project brief', status: 'upcoming', due: '2024-07-08', priority: 'High', completed: false },
    { id: 2, title: 'Schedule kickoff meeting', status: 'upcoming', due: '2024-07-09', priority: 'Medium', completed: false },
    { id: 3, title: 'Submit report', status: 'completed', due: '2024-07-01', priority: 'Low', completed: true },
    { id: 4, title: 'Review requirements', status: 'overdue', due: '2024-07-03', priority: 'High', completed: false },
];

// Optional: goals for each project. Keyed by projectId so components can pick what they need.
export const projectGoalsMap = {
    1: [
        { id: 1, title: 'Define Scope', description: 'Establish project boundaries and deliverables', dateRange: 'Jul 1 - Jul 3', status: 'Completed', progress: 100 },
        { id: 2, title: 'Assemble Team', description: 'Recruit and onboard team members', dateRange: 'Jul 4 - Jul 6', status: 'Completed', progress: 100 },
    ],
    3: [
        { id: 1, title: 'Design Phase', description: 'Create wireframes and mockups', dateRange: 'Jun 22 - 24', status: 'In Progress', progress: 60 },
        { id: 2, title: 'Development', description: 'Build frontend and backend components', dateRange: 'Jun 23 - 25', status: 'Upcoming', progress: 0 },
        { id: 3, title: 'Backend Integration', description: 'Integrate the frontend with backend services', dateRange: 'Jun 24 - 26', status: 'Upcoming', progress: 0 },
    ],
};