import React, { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle, ClipboardList } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#ffcd00]">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-lg bg-[#ffcd00]/10 flex items-center justify-center shadow-lg">
              <ClipboardList size={32} className="text-[#ffcd00]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#001d4a] mb-1 font-sans">Task Manager</h1>
              <p className="text-base text-[#001d4a]/70">Organize your day efficiently</p>
            </div>
          </div>

          <form onSubmit={addTask} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-100 focus:outline-none focus:border-[#ffcd00] focus:ring-2 focus:ring-[#ffcd00]/20 text-base transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#ffcd00] text-[#001d4a] rounded-lg hover:bg-[#ffcd00]/90 transition-all flex items-center gap-2 font-semibold shadow-md shadow-[#ffcd00]/10 hover:shadow-[#ffcd00]/20"
              >
                <PlusCircle size={20} />
                Add Task
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {tasks.map(task => (
              <div
                key={task.id}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  task.completed ? 'bg-gray-50' : 'bg-white'
                } border-2 border-gray-100 hover:border-[#ffcd00] group`}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-gray-300 hover:text-[#ffcd00] transition-colors"
                >
                  {task.completed ? (
                    <CheckCircle className="text-[#ffcd00]" size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>
                <span
                  className={`flex-1 text-base ${
                    task.completed ? 'text-gray-400 line-through' : 'text-[#001d4a]'
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            {tasks.length === 0 && (
              <div className="text-center py-12 text-[#001d4a]/50 text-base">
                No tasks yet. Add your first task above!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;