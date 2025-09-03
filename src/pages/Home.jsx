import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import Ingredients from "../components/Ingredients";
import RecipeModal from "../components/RecipeModal";
import { searchMealByName } from "../api/mealdb";

const Home = () => {
  // State variables
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [title, setTitle] = useState("👨‍🍳 Chef's Top Picks");

  const ingredientsRef = useRef();

  /**
   * Load 10 random meals on component mount
   */
  useEffect(() => {
    const loadRandomMeals = async () => {
      setLoading(true);
      try {
        const collected = [];
        const ids = new Set();

        while (collected.length < 10) {
          const res = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          const data = await res.json();
          if (data.meals && !ids.has(data.meals[0].idMeal)) {
            collected.push(data.meals[0]);
            ids.add(data.meals[0].idMeal);
          }
        }

        setMeals(collected);
      } catch (error) {
        console.error("Error fetching random meals:", error);
      }
      setLoading(false);
    };

    loadRandomMeals();
  }, []);

  /**
   * Handle search query
   * @param {string} query - Meal name to search
   */
  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setTitle(`🍽 Search results for "${query}"`);

    try {
      const results = await searchMealByName(query);
      setMeals(results || []);
    } catch (error) {
      console.error("Error searching meals:", error);
      setMeals([]);
    }

    setLoading(false);
  };

  /**
   * Reset title when search bar is focused
   */
  const handleSearchFocus = () => {
    if (ingredientsRef.current) ingredientsRef.current.clearFilters();
    setTitle("👨‍🍳 Chef's Top Picks");
  };

  /**
   * Update meals when filtered by ingredients
   * @param {Array} results - Filtered meal results
   */
  const handleFilterByIngredients = (results) => {
    setMeals(results || []);
    setTitle("👨‍🍳 Chef's Top Picks");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Full screen wrapper */}
      <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        {/* Inner container */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">

          {/* Header: Title + Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            {/* Title */}
            <h1
              className="
                text-xl sm:text-2xl md:text-3xl font-serif font-bold
                text-red-600 dark:text-red-400 flex-1
                text-center lg:text-center lg:ml-20
              "
            >
              🍳QuickChef-Recipe Finder
            </h1>

            {/* Dark mode toggle button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="
                ml-2 sm:ml-4 px-3 py-1 sm:px-4 sm:py-2 rounded-lg
                bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200
                hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm sm:text-base flex-shrink-0
              "
            >
              <span className="sm:hidden">{darkMode ? "☀️" : "🌙"}</span>
              <span className="hidden sm:inline">{darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</span>
            </button>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} onFocus={handleSearchFocus} />

          {/* Ingredients Filter */}
          <Ingredients ref={ingredientsRef} onFilter={handleFilterByIngredients} />

          {/* Caption above recipes */}
          {meals.length > 0 && (
            <div className="text-center mb-4 mt-6">
              <h2 className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-300 animate-pulse">
                {title}
              </h2>
            </div>
          )}

          {/* Recipe Grid */}
          {loading ? (
            <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
              Loading...
            </p>
          ) : meals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-2">
              {meals.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  meal={meal}
                  onSelect={(meal) => setSelectedMeal(meal)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
              No meals found.
            </p>
          )}

          {/* Recipe Modal */}
          <RecipeModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />

        </div>
      </div>
    </div>
  );
};

export default Home;
