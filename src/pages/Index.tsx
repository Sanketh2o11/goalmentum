import React, { useState } from 'react';
import GoalCard from '../components/GoalCard';
import CategoryFilter from '../components/CategoryFilter';
import AddGoalDialog from '../components/AddGoalDialog';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CATEGORIES = ["Personal", "Career", "Fitness", "Education"];
const TIME_FRAMES = ["1 Week", "2 Weeks", "1 Month", "3 Months", "6 Months", "1 Year"];

const MOTIVATIONAL_QUOTES = {
  Personal: "The only way to do great work is to love what you do.",
  Career: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  Fitness: "Take care of your body. It's the only place you have to live.",
  Education: "Live as if you were to die tomorrow. Learn as if you were to live forever."
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [goals, setGoals] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  const handleAddGoal = (newGoal: any) => {
    setGoals([...goals, { ...newGoal, streak: 0, badges: [] }]);
    toast({
      title: "Goal Created!",
      description: "Your new goal has been added successfully.",
    });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const updateGoalProgress = (goalIndex: number, taskIndex: number, completed: boolean) => {
    const newGoals = [...goals];
    newGoals[goalIndex].tasks[taskIndex].completed = completed;
    
    // Calculate new progress
    const progress = Math.round(
      (newGoals[goalIndex].tasks.filter((t: any) => t.completed).length /
        newGoals[goalIndex].tasks.length) *
        100
    );
    newGoals[goalIndex].progress = progress;

    // Check for achievements
    if (progress === 100 && !newGoals[goalIndex].badges.includes("Completed")) {
      newGoals[goalIndex].badges.push("Completed");
      toast({
        title: "Achievement Unlocked! 🎉",
        description: "You've completed all tasks in this goal!",
      });
    }

    setGoals(newGoals);
  };

  const filteredGoals = selectedCategory === "All"
    ? goals
    : goals.filter(goal => goal.category === selectedCategory);

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 p-6 md:p-8 animate-slide-in`}>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Goal Tracker
            </h1>
            <p className="text-muted-foreground">
              {selectedCategory === "All" 
                ? "Track and achieve your goals"
                : MOTIVATIONAL_QUOTES[selectedCategory as keyof typeof MOTIVATIONAL_QUOTES]}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <AddGoalDialog
              onAddGoal={handleAddGoal}
              categories={CATEGORIES}
              timeframes={TIME_FRAMES}
            />
          </div>
        </div>
        
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal, index) => (
            <div 
              key={index} 
              className="animate-scale-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <GoalCard 
                {...goal} 
                onUpdateTask={(taskIndex, completed) => 
                  updateGoalProgress(index, taskIndex, completed)
                }
              />
            </div>
          ))}
          {filteredGoals.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No goals yet</h3>
              <p className="text-muted-foreground">
                Click the "Add Goal" button to create your first goal
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;