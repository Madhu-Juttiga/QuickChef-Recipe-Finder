import React from "react";

const RecipeCard = ({ meal, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(meal)}
      className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border border-white/20 dark:border-gray-700/30 overflow-hidden"
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {meal.strMeal}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          {meal.strArea} • {meal.strCategory}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
