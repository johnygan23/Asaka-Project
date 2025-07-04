export const initialProjects = [
    { id: 1, name: 'Main Project', status: 'Active', color: '#22d3ee' },
    { id: 2, name: 'My second project', status: 'Paused', color: '#a78bfa' },
    { id: 3, name: 'Website Redesign', status: 'Active', color: 'bg-cyan-500' },
    { id: 4, name: 'Mobile App', status: 'Paused', color: 'bg-yellow-400' },
    { id: 5, name: 'API Development', status: 'Completed', color: 'bg-green-500' },
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
        { id: 1, title: 'Define Scope', period: 'Jul 1 - Jul 3' },
        { id: 2, title: 'Assemble Team', period: 'Jul 4 - Jul 6' },
    ],
    3: [
        { id: 1, title: 'Complete UI/UX Design', period: 'Jun 22 - 24' },
        { id: 2, title: 'Implement Frontend', period: 'Jun 23 - 25' },
        { id: 3, title: 'Backend Integration', period: 'Jun 24 - 26' },
    ],
};