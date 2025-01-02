import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from 'lucide-react';

interface AddGoalDialogProps {
  onAddGoal: (goal: any) => void;
  categories: string[];
  timeframes: string[];
}

const AddGoalDialog = ({ onAddGoal, categories, timeframes }: AddGoalDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [timeframe, setTimeframe] = useState(timeframes[0]);
  const [tasks, setTasks] = useState<string[]>([""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endDate = new Date();
    const days = parseInt(timeframe.split(" ")[0]) * (timeframe.includes("Week") ? 7 : 30);
    endDate.setDate(endDate.getDate() + days);

    onAddGoal({
      title,
      category,
      timeframe,
      tasks: tasks.filter(Boolean).map(task => ({ text: task, completed: false })),
      endDate,
      progress: 0
    });

    setOpen(false);
    setTitle("");
    setCategory(categories[0]);
    setTimeframe(timeframes[0]);
    setTasks([""]);
  };

  const addTask = () => setTasks([...tasks, ""]);
  const removeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter goal title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeframe">Timeframe</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Tasks</Label>
            {tasks.map((task, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={task}
                  onChange={(e) => updateTask(index, e.target.value)}
                  placeholder={`Task ${index + 1}`}
                />
                {tasks.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeTask(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addTask}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </div>
          <Button type="submit" className="w-full">Create Goal</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;