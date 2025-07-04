import { useState } from 'react';
import Layout from '../components/Layout';
import { tasksMock } from '../data/project';

const columns = [
  { key: 'recent', title: 'Recently assigned' },
  { key: 'today', title: 'Do today' },
  { key: 'nextweek', title: 'Do next week' },
  { key: 'later', title: 'Do later' },
];

const priorityColors = {
  High: 'bg-red-500 text-white',
  Medium: 'bg-yellow-400 text-gray-900',
  Low: 'bg-green-400 text-gray-900',
};

// For demo, assign tasks to columns by id or status
const getColumnTasks = (tasks) => ({
  recent: tasks.filter(t => t.id === 1 || t.id === 2),
  today: [],
  nextweek: [],
  later: [],
});

const Tasks = ({ onLogout, projects = [] }) => {
  const [tasks, setTasks] = useState(tasksMock);
  const columnTasks = getColumnTasks(tasks);

  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Layout onLogout={onLogout} projects={projects}>
      {/* Board Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-lg text-gray-900">WB</div>
          <h1 className="text-2xl font-bold text-white">My tasks</h1>
        </div>
      </div>
      {/* Board Tabs and Options */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex gap-2">
          <button className="text-black/80 border-b-2 border-blue-500 px-2 pb-1 font-medium">Board</button>
          <button className="text-black/40 hover:text-white/80 px-2 pb-1 font-medium">Dashboard</button>
        </div>
        <div className="flex-1" />
      </div>
      {/* Kanban Board */}
      <div className="flex gap-4 w-full overflow-x-auto pb-8 min-h-[70vh]">
        {columns.map(col => (
          <div key={col.key} className="bg-[#18191c] rounded-xl min-w-[300px] w-72 flex flex-col p-3 flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-white text-base flex items-center gap-2">
                {col.title}
                <span className="bg-gray-700 text-gray-200 text-xs rounded-full px-2 py-0.5 ml-1">{columnTasks[col.key]?.length || 0}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-1 min-h-[60vh]">
              {columnTasks[col.key]?.length === 0 && (
                <div className="w-full py-2 text-gray-400 text-sm rounded bg-transparent border-2 border-dashed border-gray-700 mt-2 text-center">No tasks</div>
              )}
              {columnTasks[col.key]?.map(task => (
                <div key={task.id} className="bg-[#232428] rounded-lg p-4 shadow flex flex-col gap-2 border border-gray-800">
                  <div className="flex items-center gap-2 mb-1">
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-colors duration-200 ${task.completed ? 'border-green-400 bg-green-400' : 'border-gray-400 bg-transparent hover:border-cyan-400'}`}
                      aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {task.completed ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <span className="block w-3 h-3 rounded-full bg-transparent"></span>
                      )}
                    </button>
                    <div className={`font-medium text-white ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${priorityColors[task.priority]}`}>{task.priority}</span>
                  </div>
                  <div className="text-xs text-gray-400">{task.due ? `Jul 7 – 9` : ''}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Tasks; 