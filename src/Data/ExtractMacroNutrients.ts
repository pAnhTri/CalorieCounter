/**
 * This module provides a utility function to extract the macro nutritional values 
 * (calories, protein, fat, carbs) from a list of food data (`foodTracker`). It 
 * filters relevant nutrients from each food item and returns an array of objects 
 * containing the serving size and the associated macro nutrients.
 * 
 * Dependencies:
 * - ShortFDCFoodData: A data type representing the food items and their nutrient values.
 * 
 * The primary function is:
 * - `extractNutritionalValue(foodTracker: ShortFDCFoodData[])`: Processes the input food 
 * tracker and returns an array of macro nutrient objects, one for each food item.
 */

// Data type
import { ShortFDCFoodData } from "./FDCData";

interface MacroNutrients{
    servingSize: number,
    servingUnit: string,
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
}

/**
 * Extracts the macro nutrients (calories, protein, fat, and carbs) for each food item 
 * in the provided foodTracker. The nutrient values are filtered by their nutrient number.
 * 
 * See https://app.swaggerhub.com/apis/fdcnal/food-data_central_api/1.0.1 for nutrient number.
 * 
 * @param foodTracker - Array of ShortFDCFoodData, which represents food items and their nutrient data.
 * @returns {MacroNutrients[]} An array of objects containing the extracted macro nutrient information 
 * for each food item.
 */
const extractNutritionalValue = (foodTracker: ShortFDCFoodData[]) => {
    if (foodTracker.length == 0) return [];

    // Map over the foodTracker array and extract relevant macro nutrients
    const workableNutrients = foodTracker.map((innerArray) => {
      // Filter nutrients to only include calories (208), protein (203), fat (204), and carbs (205)
      const filteredNutrients = innerArray.foodNutrients?.filter((nutrient) => {
        return (
          nutrient.nutrientNumber === "203" || // Protein
          nutrient.nutrientNumber === "204" || // Fat
          nutrient.nutrientNumber === "205" || // Carbohydrates
          nutrient.nutrientNumber === "208"    // Calories
        );
      });

      const nutrientMap: Record<string, number> = {};

      // Iterate over the filtered nutrients and map the nutrient number to its value
      filteredNutrients?.forEach(({value, nutrientNumber}) => {
        if (value !== undefined) {
          nutrientMap[nutrientNumber as string] = value;
        }
      });

      // Create macroNutrients object
      let macroNutrients: MacroNutrients = {
        servingSize: innerArray.servingSize ? innerArray.servingSize : 0,
        servingUnit: innerArray.servingSizeUnit ? innerArray.servingSizeUnit : "",
        calories: nutrientMap["208"] || 0, // Access calories by nutrient number "208"
        protein: nutrientMap["203"] || 0,  // Access protein by nutrient number "203"
        fat: nutrientMap["204"] || 0,      // Access fat by nutrient number "204"
        carbs: nutrientMap["205"] || 0     // Access carbs by nutrient number "205"
      };

      return macroNutrients;
    }
);

    return workableNutrients;
  };

export {extractNutritionalValue}
