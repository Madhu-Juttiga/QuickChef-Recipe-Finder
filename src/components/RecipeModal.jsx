import React from "react";

const RecipeModal = ({ meal, onClose }) => {
  if (!meal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Centered Card */}
      <div className="bg-white dark:bg-gray-800/50 dark:backdrop-blur-md w-full max-w-lg rounded-2xl shadow-xl p-6 relative border border-gray-200 dark:border-gray-700 transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
        >
          ✖
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3 text-center text-gray-900 dark:text-gray-100">
          {meal.strMeal}
        </h2>

        {/* Image */}
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        {/* Info */}
        <div className="text-sm text-gray-700 dark:text-gray-300 mb-4 space-y-1">
          <p>
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p>
            <strong>Area:</strong> {meal.strArea}
          </p>
        </div>

        {/* Instructions (scrollable) */}
        <div className="max-h-40 overflow-y-auto text-gray-700 dark:text-gray-300 text-sm mb-4 whitespace-pre-line">
          {meal.strInstructions}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="bg-gray-500 dark:bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-600 transition"
          >
            ← Back
          </button>
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              🎥 Watch Tutorial
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
