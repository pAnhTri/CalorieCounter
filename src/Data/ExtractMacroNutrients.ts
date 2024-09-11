import { ShortFDCFoodData } from "./FDCData";

interface MacroNutrients{
    servingSize: number,
    calories: number,
    protein: number,
    fat: number,
    carbs: number,
}

const extractNutritionalValue = (foodTracker: ShortFDCFoodData[]) => {
    const workableNutrients = foodTracker.map((innerArray) => {
      const filteredNutrients = innerArray.foodNutrients?.filter((nutrient) => {
        return (
          nutrient.number === "203" ||
          nutrient.number === "204" ||
          nutrient.number === "205" ||
          nutrient.number === "208"
        );
      });

      let macroNutrients: MacroNutrients = {
        servingSize: innerArray.servingSize ? innerArray.servingSize : 0,
        calories: 0,
        protein: 0,
        fat:0,
        carbs: 0,
      }

      if (filteredNutrients) {
        macroNutrients.calories = filteredNutrients[3].amount
          ? filteredNutrients[3].amount
          : 0;
          macroNutrients.protein = filteredNutrients[0].amount
          ? filteredNutrients[0].amount
          : 0;
          macroNutrients.fat = filteredNutrients[1].amount
          ? filteredNutrients[1].amount
          : 0;
          macroNutrients.carbs = filteredNutrients[2].amount
          ? filteredNutrients[2].amount
          : 0;
      }

      return macroNutrients;
    }
);

    return workableNutrients;
  };

export {extractNutritionalValue}
