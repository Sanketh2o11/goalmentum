import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, Clock } from 'lucide-react';

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
}

const GoalCard = ({ title, category, timeframe, progress, tasks, endDate }: GoalCardProps) => {
  const daysLeft = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const getCategoryColor = (category: string) => {
    const colors = {
      Personal: "bg-purple-100 text-purple-800",
      Career: "bg-blue-100 text-blue-800",
      Fitness: "bg-green-100 text-green-800",
      Education: "bg-orange-100 text-orange-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="goal-card">
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
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`flex items-center p-2 rounded-md ${
                  task.completed ? "bg-secondary/50" : "bg-background"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-sm border mr-2 flex items-center justify-center ${
                    task.completed ? "bg-primary border-primary" : "border-input"
                  }`}
                >
                  {task.completed && (
                    <svg
                      className="w-3 h-3 text-primary-foreground"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
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