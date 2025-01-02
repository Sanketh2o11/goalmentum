import React from 'react';
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedCategory === "All" ? "default" : "outline"}
        onClick={() => onSelectCategory("All")}
        className="rounded-full"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;