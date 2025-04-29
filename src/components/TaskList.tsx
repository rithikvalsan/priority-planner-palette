
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Flag, Circle, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";

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
        return 'bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700';
      case 'medium':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800';
      case 'low':
        return 'bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-800';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800';
    }
  };

  const renderPriorityTag = (priority: string) => {
    let color = "";
    let icon = null;
    
    switch (priority) {
      case 'high':
        color = "bg-[#8B5CF6] hover:bg-[#7E69AB]";
        icon = <Flag className="h-3 w-3 mr-1" />;
        break;
      case 'medium':
        color = "bg-[#0EA5E9] hover:bg-[#0EA5E9]/90";
        icon = <Star className="h-3 w-3 mr-1" />;
        break;
      case 'low':
        color = "bg-slate-500 hover:bg-slate-600";
        icon = <Circle className="h-3 w-3 mr-1" />;
        break;
      default:
        color = "bg-gray-500";
        icon = <Circle className="h-3 w-3 mr-1" />;
    }
    
    return (
      <Badge className={`${color} ml-2 flex items-center text-xs`}>
        {icon}
        {priority}
      </Badge>
    );
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={cn(
            "flex items-center justify-between p-3 rounded-lg border transition-all",
            getPriorityColor(task.priority)
          )}
        >
          <div className="flex items-center gap-3 flex-1">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleTask(task.id)}
              className="border-blue-500 data-[state=checked]:bg-blue-600"
            />
            <div className="flex items-center flex-wrap">
              <span className={cn(
                "transition-all",
                task.completed && "line-through text-slate-500 dark:text-slate-400"
              )}>
                {task.text}
              </span>
              {renderPriorityTag(task.priority)}
            </div>
          </div>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-slate-500 hover:text-red-500 transition-colors ml-2"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
