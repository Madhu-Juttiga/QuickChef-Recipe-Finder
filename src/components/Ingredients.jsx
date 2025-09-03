import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

const Ingredients = forwardRef(({ onFilter }, ref) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = {
    nonveg: "Non-Veg 🍗",
    spices: "Masalas/Spices 🌶️",
    vegetables: "Vegetables 🥦",
    fruits: "Fruits 🍎",
  };

  const ingredientGroups = {
    nonveg: ["Chicken","Beef","Mutton","Fish","Pork","Lamb","Prawns","Egg","Duck","Turkey","Goat"],
    spices: ["Salt","Pepper","Cumin","Coriander","Turmeric","Chili Powder","Cardamom","Clove","Cinnamon","Mustard Seeds","Ginger","Garlic"],
    vegetables: ["Potato","Onion","Tomato","Carrot","Spinach","Cabbage","Peas","Broccoli","Cauliflower","Brinjal"],
    fruits: ["Apple","Banana","Mango","Lemon","Orange","Pineapple","Papaya","Strawberry","Grapes","Coconut"],
  };

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        const data = await res.json();
        setIngredients(data.meals || []);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };
    fetchIngredients();
  }, []);

  useImperativeHandle(ref, () => ({
    clearFilters: () => {
      setSelectedIngredients([]);
      setSelectedCategory(null);
    }
  }));

  const getFilteredIngredients = (category) => {
    const group = ingredientGroups[category];
    return ingredients.filter((item) => group.includes(item.strIngredient));
  };

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const removeIngredient = (ingredient) => {
    setSelectedIngredients((prev) => prev.filter((i) => i !== ingredient));
  };

  const handleFilter = async () => {
    if (selectedIngredients.length === 0) return;
    setLoading(true);

    try {
      let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredients[0]}`);
      let data = await res.json();
      let commonMeals = data.meals || [];

      for (let i = 1; i < selectedIngredients.length; i++) {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredients[i]}`);
        data = await res.json();
        const meals = data.meals || [];
        commonMeals = commonMeals.filter((m) =>
          meals.some((x) => x.idMeal === m.idMeal)
        );
      }

      onFilter(commonMeals);
    } catch (error) {
      console.error("Error filtering recipes:", error);
      onFilter([]);
    }

    setLoading(false);
  };

  return (
    <div className="mt-8 text-center">
      {/* Find Recipes Button */}
      <div className="mb-4">
        <button
          onClick={handleFilter}
          disabled={selectedIngredients.length === 0 || loading}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loading ? "Searching..." : "Find Recipes"}
        </button>
      </div>

      {/* Filter by Ingredients label (moved below button) */}
      <h2 className="text-lg sm:text-xl font-serif font-bold text-red-600 dark:text-red-400 mb-6">
        Filter by Ingredients
      </h2>

      {/* Ingredient Categories */}
      <div className="flex justify-center gap-4 mb-4 flex-wrap">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() =>
              setSelectedCategory(selectedCategory === key ? null : key)
            }
            className={`px-4 py-2 rounded-lg border backdrop-blur-md transition
              ${
                selectedCategory === key
                  ? "bg-green-600 text-white border-green-700"
                  : "bg-white/30 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 border-white/20 hover:bg-white/40 dark:hover:bg-gray-700"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Show ingredients only if a category is selected */}
      {selectedCategory && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-40 overflow-y-auto border rounded-lg p-4 mb-6 backdrop-blur-md bg-white/20 dark:bg-gray-800/40">
          {getFilteredIngredients(selectedCategory).map((item) => (
            <button
              key={item.idIngredient}
              onClick={() => toggleIngredient(item.strIngredient)}
              className={`px-3 py-1 rounded-lg border text-sm transition
                ${
                  selectedIngredients.includes(item.strIngredient)
                    ? "bg-green-600 text-white border-green-700"
                    : "bg-white/30 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 border-white/20 hover:bg-white/40 dark:hover:bg-gray-600"
                }`}
            >
              {item.strIngredient}
            </button>
          ))}
        </div>
      )}

      {/* Selected Ingredient Tags */}
      {selectedIngredients.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {selectedIngredients.map((ingredient) => (
            <span
              key={ingredient}
              className="flex items-center gap-2 bg-green-100/50 dark:bg-green-700/30 text-green-700 dark:text-green-200 px-3 py-1 rounded-full text-sm"
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="ml-1 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
});

export default Ingredients;
