
import React, { useState } from 'react';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';

interface Task {
  id: string;
  text: string;
  priority: string;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = ({ text, priority }: { text: string; priority: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      priority,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-w-[300px] max-w-[400px] mx-auto p-4 bg-white dark:bg-slate-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#0A4B94] dark:text-[#1E7AC4]">Task Manager</h1>
      <TaskInput onAddTask={addTask} />
      <TaskList
        tasks={tasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default Index;
