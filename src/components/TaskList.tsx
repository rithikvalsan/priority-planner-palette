
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  text: string;
  priority: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100/50 border-red-200 dark:bg-red-950/30 dark:border-red-800/50';
      case 'medium':
        return 'bg-blue-100/50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800/50';
      case 'low':
        return 'bg-teal-100/50 border-teal-200 dark:bg-teal-950/30 dark:border-teal-800/50';
      default:
        return 'bg-gray-100 border-gray-200 dark:bg-gray-800/30 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-2">
      {tasks.length === 0 ? (
        <div className="text-center p-4 text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/20 rounded-lg border border-gray-200 dark:border-gray-700">
          No tasks yet. Add one above!
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border transition-all animate-in",
              getPriorityColor(task.priority)
            )}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <span className={cn(
                "transition-all",
                task.completed && "line-through text-gray-500 dark:text-gray-400"
              )}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
