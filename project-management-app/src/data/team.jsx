export const teamMembers = [
    {
        id: 1,
        name: 'Sarah Chen',
        email: 'sarah.chen@company.com',
        role: 'Project Manager',
        avatar: 'SC',
        status: 'online',
        department: 'Project Management',
        projects: ['Main Project', 'Website Redesign'],
        skills: ['Project Management', 'Agile', 'Scrum', 'Team Leadership'],
        joinDate: '2023-01-15',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        bio: 'Experienced project manager with 8+ years in software development. Passionate about delivering high-quality products on time and within budget.'
    },
    {
        id: 2,
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        role: 'Senior Developer',
        avatar: 'MJ',
        status: 'online',
        department: 'Engineering',
        projects: ['Website Redesign', 'API Development'],
        skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
        joinDate: '2022-08-20',
        phone: '+1 (555) 234-5678',
        location: 'New York, NY',
        bio: 'Full-stack developer with expertise in modern web technologies. Loves solving complex problems and mentoring junior developers.'
    },
    {
        id: 3,
        name: 'Alex Rodriguez',
        email: 'alex.rodriguez@company.com',
        role: 'UI/UX Designer',
        avatar: 'AR',
        status: 'away',
        department: 'Design',
        projects: ['Website Redesign', 'Mobile App'],
        skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
        joinDate: '2023-03-10',
        phone: '+1 (555) 345-6789',
        location: 'Austin, TX',
        bio: 'Creative designer focused on creating intuitive and beautiful user experiences. Believes in user-centered design principles.'
    },
    {
        id: 4,
        name: 'Lisa Wang',
        email: 'lisa.wang@company.com',
        role: 'Frontend Developer',
        avatar: 'LW',
        status: 'offline',
        department: 'Engineering',
        projects: ['Mobile App', 'Main Project'],
        skills: ['React Native', 'JavaScript', 'CSS', 'Git', 'REST APIs'],
        joinDate: '2023-06-05',
        phone: '+1 (555) 456-7890',
        location: 'Seattle, WA',
        bio: 'Frontend specialist with a passion for mobile development. Enjoys creating smooth, responsive user interfaces.'
    },
    {
        id: 5,
        name: 'David Kim',
        email: 'david.kim@company.com',
        role: 'Backend Developer',
        avatar: 'DK',
        status: 'online',
        department: 'Engineering',
        projects: ['API Development', 'Main Project'],
        skills: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Microservices'],
        joinDate: '2022-11-12',
        phone: '+1 (555) 567-8901',
        location: 'Boston, MA',
        bio: 'Backend engineer with strong focus on scalable architecture and database design. Enjoys optimizing performance.'
    },
    {
        id: 6,
        name: 'Emma Thompson',
        email: 'emma.thompson@company.com',
        role: 'QA Engineer',
        avatar: 'ET',
        status: 'online',
        department: 'Quality Assurance',
        projects: ['Website Redesign', 'Mobile App'],
        skills: ['Selenium', 'Jest', 'Cypress', 'Manual Testing', 'Test Planning'],
        joinDate: '2023-04-18',
        phone: '+1 (555) 678-9012',
        location: 'Chicago, IL',
        bio: 'Quality assurance specialist ensuring our products meet the highest standards. Passionate about automated testing.'
    },
    {
        id: 7,
        name: 'Chris Lee',
        email: 'chris.lee@company.com',
        role: 'DevOps Engineer',
        avatar: 'CL',
        status: 'away',
        department: 'Engineering',
        projects: ['API Development', 'Main Project'],
        skills: ['Kubernetes', 'Docker', 'AWS', 'CI/CD', 'Terraform'],
        joinDate: '2022-09-30',
        phone: '+1 (555) 789-0123',
        location: 'Denver, CO',
        bio: 'DevOps engineer focused on infrastructure automation and deployment optimization. Believes in infrastructure as code.'
    },
    {
        id: 8,
        name: 'Jennifer Smith',
        email: 'jennifer.smith@company.com',
        role: 'Product Manager',
        avatar: 'JS',
        status: 'online',
        department: 'Product',
        projects: ['Main Project', 'My second project'],
        skills: ['Product Strategy', 'User Research', 'Data Analysis', 'Roadmapping'],
        joinDate: '2023-02-25',
        phone: '+1 (555) 890-1234',
        location: 'Portland, OR',
        bio: 'Product manager with a data-driven approach to product development. Focuses on user needs and business goals.'
    }
];

export const departments = [
    { id: 'all', name: 'All Departments', count: teamMembers.length },
    { id: 'engineering', name: 'Engineering', count: teamMembers.filter(m => m.department === 'Engineering').length },
    { id: 'design', name: 'Design', count: teamMembers.filter(m => m.department === 'Design').length },
    { id: 'project-management', name: 'Project Management', count: teamMembers.filter(m => m.department === 'Project Management').length },
    { id: 'quality-assurance', name: 'Quality Assurance', count: teamMembers.filter(m => m.department === 'Quality Assurance').length },
    { id: 'product', name: 'Product', count: teamMembers.filter(m => m.department === 'Product').length }
];

export const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-400'
};

export const statusLabels = {
    online: 'Online',
    away: 'Away',
    offline: 'Offline'
}; 