const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Search by meal name
export const searchMealByName = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by name:", error);
    return [];
  }
};

// Get random meal
export const getRandomMeal = async () => {
  try {
    const res = await fetch(`${BASE_URL}/random.php`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching random meal:", error);
    return null;
  }
};

// Get list of ingredients (for Ingredients.jsx)
export const getAllIngredients = async () => {
  try {
    const res = await fetch(`${BASE_URL}/list.php?i=list`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    return [];
  }
};

// Filter meals by ingredient
export const filterByIngredient = async (ingredient) => {
  try {
    const res = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error filtering meals by ingredient:", error);
    return [];
  }
};
