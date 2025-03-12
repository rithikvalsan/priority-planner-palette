
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
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-gray-900 to-blue-700 border-blue-800 dark:from-gray-950 dark:to-blue-800 dark:border-blue-900';
      case 'medium':
        return 'bg-gradient-to-r from-gray-900 to-blue-700/70 border-blue-800/70 dark:from-gray-950 dark:to-blue-800/70 dark:border-blue-900/70';
      case 'low':
        return 'bg-gradient-to-r from-gray-900 to-blue-700/40 border-blue-800/40 dark:from-gray-950 dark:to-blue-800/40 dark:border-blue-900/40';
      default:
        return 'bg-gray-900 border-gray-800 dark:bg-gray-950 dark:border-gray-900';
    }
  };

  return (
    <div className="space-y-2">
      {tasks.length === 0 ? (
        <div className="text-center p-4 text-gray-400 dark:text-gray-500 bg-gray-900/50 dark:bg-gray-950/50 rounded-lg border border-gray-800 dark:border-gray-800">
          No tasks yet. Add one above!
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border transition-all animate-in",
              getPriorityStyle(task.priority)
            )}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleTask(task.id)}
                className="border-gray-600 data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700"
              />
              <span className={cn(
                "transition-all text-gray-100 dark:text-gray-100",
                task.completed && "line-through text-gray-500 dark:text-gray-600"
              )}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
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
