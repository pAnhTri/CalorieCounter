import { ShortFDCFoodData } from "./FDCData";

interface MacroNutrients{
    servingSize: number,
    servingUnit: string,
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
}

const extractNutritionalValue = (foodTracker: ShortFDCFoodData[]) => {
    if (foodTracker.length == 0) return []; 
    const workableNutrients = foodTracker.map((innerArray) => {
      const filteredNutrients = innerArray.foodNutrients?.filter((nutrient) => {
        return (
          nutrient.nutrientNumber === "203" ||
          nutrient.nutrientNumber === "204" ||
          nutrient.nutrientNumber === "205" ||
          nutrient.nutrientNumber === "208"
        );
      });

      //console.log(filteredNutrients);
      const nutrientMap: Record<string, number> = {};

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
