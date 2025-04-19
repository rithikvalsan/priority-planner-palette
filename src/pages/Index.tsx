
import React, { useState, useEffect } from 'react';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import { toast } from '@/components/ui/use-toast';

interface Task {
  id: string;
  text: string;
  priority: string;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      toast({
        title: "Error",
        description: "Could not load your saved tasks",
        variant: "destructive",
      });
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
      toast({
        title: "Error",
        description: "Failed to save your tasks",
        variant: "destructive",
      });
    }
  }, [tasks]);

  const addTask = ({ text, priority }: { text: string; priority: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      priority,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast({
      title: "Task added",
      description: "Your task has been added successfully",
    });
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
    toast({
      title: "Task deleted",
      description: "Your task has been removed",
    });
  };

  return (
    <div className="min-w-[300px] max-w-[400px] mx-auto p-4 bg-white dark:bg-slate-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#0A4B94] dark:text-[#1E7AC4]">Add a Task</h1>
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
