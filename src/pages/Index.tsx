import React, { useState } from 'react';
import GoalCard from '../components/GoalCard';
import CategoryFilter from '../components/CategoryFilter';
import AddGoalDialog from '../components/AddGoalDialog';

const CATEGORIES = ["Personal", "Career", "Fitness", "Education"];
const TIME_FRAMES = ["1 Week", "2 Weeks", "1 Month", "3 Months", "6 Months", "1 Year"];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [goals, setGoals] = useState<any[]>([]);

  const handleAddGoal = (newGoal: any) => {
    setGoals([...goals, newGoal]);
  };

  const filteredGoals = selectedCategory === "All"
    ? goals
    : goals.filter(goal => goal.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 animate-slide-in">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Goal Tracker</h1>
            <p className="text-muted-foreground">Track and achieve your goals</p>
          </div>
          <AddGoalDialog
            onAddGoal={handleAddGoal}
            categories={CATEGORIES}
            timeframes={TIME_FRAMES}
          />
        </div>
        
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal, index) => (
            <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <GoalCard {...goal} />
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