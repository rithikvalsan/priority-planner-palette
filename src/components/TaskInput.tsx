
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
          className="flex-1 border-blue-200 focus-visible:ring-blue-400"
        />
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-[120px] border-blue-200">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Task
      </Button>
    </form>
  );
};

export default TaskInput;
