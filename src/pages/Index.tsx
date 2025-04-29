
import React, { useState, useEffect } from 'react';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from "@/components/ui/badge";
import { Flag, Circle } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  priority: string;
  completed: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

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

  const filteredTasks = selectedPriority
    ? tasks.filter((task) => task.priority === selectedPriority)
    : tasks;

  const getTaskCountByPriority = (priority: string) => {
    return tasks.filter(task => task.priority === priority).length;
  };

  const handleTabChange = (value: string) => {
    setSelectedPriority(value === "all" ? null : value);
  };

  const renderPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Flag className="h-3.5 w-3.5 text-[#ea384c]" />;
      case 'medium':
        return <Circle className="h-3.5 w-3.5 text-[#1EAEDB]" />;
      case 'low':
        return <Circle className="h-3.5 w-3.5 text-[#D3E4FD] text-blue-800" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-w-[300px] max-w-[400px] mx-auto p-4 bg-white dark:bg-slate-900 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-[#0A4B94] dark:text-[#1E7AC4]">Add a Task</h1>
      <TaskInput onAddTask={addTask} />
      
      <div className="my-4">
        <Tabs defaultValue="all" onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all" className="text-xs">
              All
              <Badge className="ml-1 bg-gray-200 text-gray-700 text-xs">{tasks.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="high" className="text-xs">
              {renderPriorityIcon('high')}
              <Badge className="ml-1 bg-gray-200 text-gray-700 text-xs">{getTaskCountByPriority('high')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="medium" className="text-xs">
              {renderPriorityIcon('medium')}
              <Badge className="ml-1 bg-gray-200 text-gray-700 text-xs">{getTaskCountByPriority('medium')}</Badge>
            </TabsTrigger>
            <TabsTrigger value="low" className="text-xs">
              {renderPriorityIcon('low')}
              <Badge className="ml-1 bg-gray-200 text-gray-700 text-xs">{getTaskCountByPriority('low')}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TaskList
        tasks={filteredTasks}
        onToggleTask={toggleTask}
        onDeleteTask={deleteTask}
      />
    </div>
  );
};

export default Index;
