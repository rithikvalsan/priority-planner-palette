
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Flag, Circle } from 'lucide-react';
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
    let tooltipText = "";
    
    switch (priority) {
      case 'high':
        color = "bg-[#ea384c] hover:bg-[#ea384c]/90";
        icon = <Flag className="h-3.5 w-3.5" />;
        tooltipText = "High Priority";
        break;
      case 'medium':
        color = "bg-[#1EAEDB] hover:bg-[#1EAEDB]/90";
        icon = <Circle className="h-3.5 w-3.5" />;
        tooltipText = "Medium Priority";
        break;
      case 'low':
        color = "bg-[#D3E4FD] hover:bg-[#D3E4FD]/90 text-blue-800";
        icon = <Circle className="h-3.5 w-3.5" />;
        tooltipText = "Low Priority";
        break;
      default:
        color = "bg-gray-500";
        icon = <Circle className="h-3.5 w-3.5" />;
        tooltipText = "Priority";
    }
    
    return (
      <Badge className={`${color} ml-2 flex items-center justify-center w-6 h-6 p-0 rounded-full`} title={tooltipText}>
        {icon}
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
