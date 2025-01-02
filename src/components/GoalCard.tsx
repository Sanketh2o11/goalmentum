import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, Clock, Medal, CheckSquare } from 'lucide-react';

interface Task {
  text: string;
  completed: boolean;
}

interface GoalCardProps {
  title: string;
  category: string;
  timeframe: string;
  progress: number;
  tasks: Task[];
  endDate: Date;
  streak: number;
  badges: string[];
  onUpdateTask: (taskIndex: number, completed: boolean) => void;
}

const GoalCard = ({ 
  title, 
  category, 
  timeframe, 
  progress, 
  tasks, 
  endDate,
  streak,
  badges,
  onUpdateTask 
}: GoalCardProps) => {
  const daysLeft = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const getCategoryColor = (category: string) => {
    const colors = {
      Personal: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800",
      Career: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800",
      Fitness: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800",
      Education: "bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-gradient-to-r from-red-500 to-orange-500";
    if (progress < 70) return "bg-gradient-to-r from-yellow-500 to-green-500";
    return "bg-gradient-to-r from-green-500 to-emerald-500";
  };

  return (
    <Card className="goal-card backdrop-blur-sm bg-opacity-50 dark:bg-opacity-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`category-badge ${getCategoryColor(category)}`}>
            {category}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            {daysLeft} days left
          </div>
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="progress-bar bg-secondary">
              <div
                className={`h-full transition-all duration-500 ease-out ${getProgressColor(progress)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {badges.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {badges.map((badge, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Medal className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">{badge}</span>
                </div>
              ))}
            </div>
          )}

          {streak > 0 && (
            <div className="flex items-center gap-2 text-sm text-orange-500">
              <Target className="w-4 h-4" />
              <span>{streak} day streak!</span>
            </div>
          )}

          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
                  task.completed ? "bg-secondary/50" : "bg-background hover:bg-secondary/20"
                }`}
                onClick={() => onUpdateTask(index, !task.completed)}
                role="button"
                tabIndex={0}
              >
                <div
                  className={`w-4 h-4 rounded-sm border mr-2 flex items-center justify-center transition-colors duration-200 ${
                    task.completed ? "bg-primary border-primary" : "border-input"
                  }`}
                >
                  {task.completed && <CheckSquare className="w-3 h-3 text-primary-foreground" />}
                </div>
                <span
                  className={`text-sm ${
                    task.completed ? "text-muted-foreground line-through" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalCard;