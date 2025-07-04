import { useState } from 'react';
import Layout from '../components/Layout';
import { initialProjects, tasksMock } from '../data/project';

const statusColors = {
  Active: 'bg-green-100 text-green-700',
  Paused: 'bg-yellow-100 text-yellow-700',
  Completed: 'bg-gray-200 text-gray-700',
};

const getToday = () => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString(undefined, options);
};

const priorityColors = {
  High: 'bg-red-500 text-white',
  Medium: 'bg-yellow-400 text-gray-900',
  Low: 'bg-green-400 text-gray-900',
};

function DonutChart({ completed, incomplete, completedColor, incompleteColor, textColor = '#fff' }) {
  const total = completed + incomplete;
  const r = 40;
  const c = 2 * Math.PI * r;
  const completedPercent = total ? completed / total : 0;
  const incompletePercent = total ? incomplete / total : 0;
  const completedLen = c * completedPercent;
  const incompleteLen = c * incompletePercent;
  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      {/* Incomplete */}
      <circle
        cx="80" cy="80" r={r}
        fill="none" stroke={incompleteColor} strokeWidth="18"
        strokeDasharray={`${incompleteLen} ${c - incompleteLen}`}
        strokeDashoffset={0}
      />
      {/* Completed */}
      <circle
        cx="80" cy="80" r={r}
        fill="none" stroke={completedColor} strokeWidth="18"
        strokeDasharray={`${completedLen} ${c - completedLen}`}
        strokeDashoffset={-incompleteLen}
      />
      {/* Center text */}
      <text x="80" y="90" textAnchor="middle" fontSize="32" fill={textColor} fontWeight="bold">{total}</text>
    </svg>
  );
}

const Home = ({ onLogout }) => {
  const [tab, setTab] = useState('upcoming');
  const userName = 'Wong';
  const [tasks, setTasks] = useState(tasksMock);
  const [notepad, setNotepad] = useState('');
  const [projects] = useState(initialProjects);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const incompleteTasks = totalTasks - completedTasks;
  const upcomingTasks = tasks.filter(t => t.status === 'upcoming').length;

  const filteredTasks = tasks.filter(t => {
    if (tab === 'completed') return t.completed;
    if (tab === 'overdue') return t.status === 'overdue' && !t.completed;
    if (tab === 'upcoming') return t.status === 'upcoming' && !t.completed;
    return false;
  });

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed, status: !task.completed ? 'completed' : 'upcoming' } : task
    ));
  };

  const projectCompleted = projects.filter(p => p.status === 'Completed').length;

  return (
    <Layout onLogout={onLogout} projects={projects}>
      <main className="flex-1 flex flex-col bg-gray-50 min-h-screen">
        <div className="flex-1 flex flex-col items-center justify-start px-4 py-8">
          {/* Date and Welcome */}
          <div className="text-center mb-6">
            <div className="text-gray-600 text-lg font-medium">{getToday()}</div>
            <div className="text-4xl font-bold text-gray-900 mt-2">Good afternoon, {userName}</div>
          </div>
          {/* Modern Bar with Task Stats */}
          <div className="flex items-center gap-8 bg-gray-800 rounded-2xl px-8 py-4 mb-8 shadow max-w-xl w-full">
            {/* Total Tasks */}
            <div className="flex items-center gap-2 text-gray-200">
              <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" /></svg>
              <span className="font-semibold text-xl">{totalTasks}</span>
              <span className="text-gray-400 ml-1">total tasks</span>
            </div>
            {/* Divider */}
            <div className="h-6 w-px bg-gray-700" />
            {/* Completed Tasks */}
            <div className="flex items-center gap-2 text-gray-200">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              <span className="font-semibold text-xl">{completedTasks}</span>
              <span className="text-gray-400 ml-1">completed</span>
            </div>
            {/* Divider */}
            <div className="h-6 w-px bg-gray-700" />
            {/* Upcoming Tasks */}
            <div className="flex items-center gap-2 text-gray-200">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
              <span className="font-semibold text-xl">{upcomingTasks}</span>
              <span className="text-gray-400 ml-1">upcoming</span>
            </div>
          </div>
          {/* My Tasks Widget */}
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-0 border border-gray-200 mb-8">
            <div className="flex items-center gap-4 px-8 pt-8 pb-2">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <div className="text-xl font-semibold text-gray-900">My tasks</div>
                <div className="text-gray-500 text-sm">Widget</div>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex gap-2 px-8 mt-6 border-b border-gray-200">
              {['upcoming', 'overdue', 'completed'].map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors duration-200 focus:outline-none ${tab === t ? 'border-cyan-400 text-cyan-600' : 'border-transparent text-gray-400 hover:text-cyan-400'}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            {/* Task List */}
            <div className="px-8 py-6">
              {filteredTasks.length === 0 ? (
                <div className="text-gray-500 text-center py-8">No tasks in this category.</div>
              ) : (
                <ul className="space-y-4">
                  {filteredTasks.map(task => (
                    <li key={task.id} className="flex items-center justify-between bg-gray-100 rounded-lg px-5 py-4 group transition">
                      {/* Complete Icon */}
                      <button
                        onClick={() => toggleComplete(task.id)}
                        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-colors duration-200 mr-4 ${task.completed ? 'border-green-400 bg-green-400' : 'border-gray-300 bg-white group-hover:border-cyan-400'}`}
                        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {task.completed ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                          <span className="block w-3 h-3 rounded-full bg-transparent"></span>
                        )}
                      </button>
                      {/* Task Name */}
                      <span className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>{task.title}</span>
                      {/* Priority */}
                      <span className={`px-2 py-1 rounded text-xs font-semibold ml-4 ${priorityColors[task.priority]}`}>{task.priority}</span>
                      {/* Due Date */}
                      <span className="text-gray-500 text-sm ml-6 min-w-[100px] text-right">{task.due}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Projects and Notepad Row */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 mb-8">
            {/* Projects Widget */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-0 border border-gray-200 mb-8 md:mb-0">
              <div className="flex items-center gap-4 px-8 pt-8 pb-2">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-2xl">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-cyan-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-6 4v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3" /></svg>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">Projects</div>
                  <div className="text-gray-500 text-sm">You're working on</div>
                </div>
              </div>
              <div className="px-8 py-6">
                {projects.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">No projects found.</div>
                ) : (
                  <ul className="space-y-4">
                    {projects.map(project => (
                      <li key={project.id} className="flex items-center justify-between bg-gray-100 rounded-lg px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className={`w-4 h-4 rounded-full ${project.color}`}></span>
                          <span className="text-lg font-medium text-gray-900">{project.name}</span>
                          {project.role && <span className="ml-3 px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-700">{project.role}</span>}
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[project.status]}`}>{project.status}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Notepad Widget */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-0 border border-gray-200">
              <div className="flex items-center gap-4 px-8 pt-8 pb-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-yellow-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 3.5a2.121 2.121 0 113 3L7 19.5 3 21l1.5-4L16.5 3.5z" /></svg>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">Private Notepad</div>
                  <div className="text-gray-500 text-sm">Only you can see this</div>
                </div>
              </div>
              <div className="px-8 py-6">
                <textarea
                  className="w-full min-h-[120px] bg-gray-100 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-200 resize-vertical"
                  placeholder="Write your notes here..."
                  value={notepad}
                  onChange={e => setNotepad(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Pie Chart Row */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
            {/* Project Completion Donut Chart (white card, original title) */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-0 border border-gray-200 flex flex-col items-center justify-center">
              <div className="flex items-center gap-4 px-8 pt-8 pb-2 w-full">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /></svg>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">Total Projects By Completion Status</div>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center py-6">
                <DonutChart
                  completed={projectCompleted}
                  incomplete={projects.length - projectCompleted}
                  completedColor="#22c55e"
                  incompleteColor="#e5e7eb"
                  textColor="#222"
                />
              </div>
            </div>
            {/* Task Completion Donut Chart (white card, original title) */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-0 border border-gray-200 flex flex-col items-center justify-center">
              <div className="flex items-center gap-4 px-8 pt-8 pb-2 w-full">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-2xl">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-cyan-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <div className="text-xl font-semibold text-gray-900">Total Tasks By Completion Status</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center w-full py-6">
                <DonutChart
                  completed={completedTasks}
                  incomplete={incompleteTasks}
                  completedColor="#a5b4fc"
                  incompleteColor="#ddd6fe"
                  textColor="#222"
                />
                {/* Legend */}
                <div className="flex flex-col gap-2 ml-8">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#a5b4fc]"></span>
                    <span className="text-gray-700">Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#ddd6fe]"></span>
                    <span className="text-gray-700">Incomplete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home; 