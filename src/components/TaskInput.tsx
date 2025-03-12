
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (task: { text: string; priority: string }) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask({ text: taskText.trim(), priority });
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div className="flex gap-2">
        <Input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-900 border-gray-800 text-gray-100 placeholder:text-gray-500 focus-visible:ring-blue-700"
        />
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-[120px] bg-gray-900 border-gray-800 text-gray-100 focus-visible:ring-blue-700">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-800">
            <SelectItem value="high" className="text-gray-100 focus:bg-gray-800">High</SelectItem>
            <SelectItem value="medium" className="text-gray-100 focus:bg-gray-800">Medium</SelectItem>
            <SelectItem value="low" className="text-gray-100 focus:bg-gray-800">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-700 text-white">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Task
      </Button>
    </form>
  );
};

export default TaskInput;
