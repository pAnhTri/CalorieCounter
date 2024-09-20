// Import from STL
import { useEffect } from "react";

// Search icon
import searchIcon from "../../assets/search.svg";

// Data type
import { ShortFDCFoodData } from "../../Data/FDCData";

// Utility functions
import { extractNutritionalValue } from "../../Data/ExtractMacroNutrients";

interface MacroProgress {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

interface AddFoodFormProps {
  setShowSearchModal: () => void; // Function to show/hide the search modal.
  foodTracker: ShortFDCFoodData[]; // List of tracked food items containing nutrient information.
  setFoodTracker: (list: ShortFDCFoodData[]) => void; // Function to update the list of tracked food items.
  setLookedUpList: (list: ShortFDCFoodData[]) => void; // Function to set a list of searched/filtered food items.
  setMacroProgress: (progress: MacroProgress) => void; // Function to update the macro progress (calories, proteins, etc.).
}

/**
 * @component
 * This component allows users to add, remove, and track food items in a food tracker.
 * It calculates and displays macro nutrients (calories, protein, fats, carbs) for each food item
 * in the `foodTracker` and provides a form to search for new foods.
 *
 * Dependencies:
 * - Bootstrap for styling.
 *
 * Props:
 * @param {function} setShowSearchModal - Function to toggle the visibility of the search modal.
 * @param {ShortFDCFoodData[]} foodTracker - An array of tracked food items containing nutrient data.
 * @param {function} setFoodTracker - Function to update the list of tracked food items.
 * @param {function} setLookedUpList - Function to set the list of looked-up food items.
 * @param {function} setMacroProgress - Function to update the macro progress (calories, proteins, fats, carbs).
 */
const AddFoodForm = ({
  setShowSearchModal,
  foodTracker,
  setFoodTracker,
  setLookedUpList,
  setMacroProgress,
}: AddFoodFormProps) => {
  // Effects
  /**
   * Calculates the sum of calories, protein, fats, and carbs from the food items in the `foodTracker`.
   * Uses a `useEffect` hook to update the macro progress whenever the `foodTracker` changes.
   */
  const sumCalories = () => {
    const calories = foodTracker.flatMap((item) =>
      item.foodNutrients?.filter(
        (nutrient) => nutrient.nutrientNumber === "208"
      )
    );

    let sumOfCalories = 0;

    for (const calorie of calories) {
      if (calorie) {
        sumOfCalories += calorie.value ? calorie.value : 0;
      }
    }

    return sumOfCalories;
  };

  const sumProtein = () => {
    const proteins = foodTracker.flatMap((item) =>
      item.foodNutrients?.filter(
        (nutrient) => nutrient.nutrientNumber === "203"
      )
    );

    let sumOfProtein = 0;

    for (const protein of proteins) {
      if (protein) {
        sumOfProtein += protein.value ? protein.value : 0;
      }
    }

    return sumOfProtein;
  };

  const sumFat = () => {
    const fats = foodTracker.flatMap((item) =>
      item.foodNutrients?.filter(
        (nutrient) => nutrient.nutrientNumber === "204"
      )
    );

    let sumOfFats = 0;

    for (const fat of fats) {
      if (fat) {
        sumOfFats += fat.value ? fat.value : 0;
      }
    }

    return sumOfFats;
  };

  const sumCarbs = () => {
    const carbs = foodTracker.flatMap((item) =>
      item.foodNutrients?.filter(
        (nutrient) => nutrient.nutrientNumber === "205"
      )
    );

    let sumOfCarbs = 0;

    for (const carb of carbs) {
      if (carb) {
        sumOfCarbs += carb.value ? carb.value : 0;
      }
    }

    return sumOfCarbs;
  };
  /**
   * useEffect hook that recalculates the macro nutrients whenever the `foodTracker` changes.
   * It uses the above functions to sum calories, protein, fats, and carbs, and updates the
   * macro progress by calling `setMacroProgress` with the new values.
   */
  useEffect(() => {
    const sumOfCalories = sumCalories();
    const sumOfProtein = sumProtein();
    const sumOfFats = sumFat();
    const sumOfCarbs = sumCarbs();

    const newMacroProgess = {
      calories: sumOfCalories,
      proteins: sumOfProtein,
      fats: sumOfFats,
      carbs: sumOfCarbs,
    };

    setMacroProgress(newMacroProgess);
  }, [foodTracker]);

  // Extracted nutrient information from the foodTracker using a utility function.
  const workAbleNutrients = extractNutritionalValue(foodTracker);

  /**
   * This function removes a specified food item from the `foodTracker` list. It filters out
   * the provided `foodItem` from the `foodTracker` array and updates both the `foodTracker`
   * and the `lookedUpList` state with the new list of items.
   *
   * @param {ShortFDCFoodData} foodItem - The food item to be removed from the tracker.
   *
   * Steps:
   * 1. Filters the `foodTracker` array to remove the specified `foodItem`.
   * 2. Updates the `foodTracker` state with the new list.
   * 3. Updates the `lookedUpList` state with the new list.
   */
  const removeFoodItem = (foodItem: ShortFDCFoodData) => {
    const newList = foodTracker.filter((item) => item !== foodItem);
    setFoodTracker(newList);
    setLookedUpList(newList);
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ maxWidth: "625px", margin: "0 auto" }}
    >
      <div
        className="d-flex justify-content-between bg-body-tertiary p-2"
        style={{ borderRadius: "10px 10px 0 0", border: "1px solid" }}
      >
        <span
          className="mb-0 ms-2"
          style={{
            lineHeight: "37.6px",
            maxHeight: "37.6px",
            fontSize: "x-large",
          }}
        >
          Food Tracker
        </span>

        <form className="me-2" role="search">
          <div
            style={{
              maxWidth: "236.7px",
              position: "relative",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  maxWidth: "200px",
                }}
              >
                <input
                  onClick={() => {
                    setShowSearchModal();
                  }}
                  className="form-control"
                  style={{
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  id="autoCompleteSearch"
                  type="text"
                  placeholder="Search Food to Add"
                />
              </div>
              <button
                onClick={() => {}}
                type="button"
                className="btn btn-primary"
                style={{
                  backgroundImage: `url(${searchIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  borderTopLeftRadius: "0px",
                  borderBottomLeftRadius: "0px",
                  width: "37.6px",
                  height: "37.6px",
                }}
              ></button>
            </div>
          </div>
        </form>
      </div>
      <div
        style={{
          background: "#c3c3c345",
          border: "1px solid",
          borderTop: "none",
          maxWidth: "625px",
        }}
      >
        <div className="container">
          {foodTracker.length > 0 &&
            foodTracker.map((foodItem, index) => {
              return (
                <div className="row border-bottom" key={foodItem.fdcId}>
                  <div className="col-2">
                    <div className="row">
                      <div className="col-1">
                        <button
                          className="btn btn-close"
                          style={{
                            fontSize: "0.75rem",
                          }}
                          onClick={() => {
                            removeFoodItem(foodItem);
                          }}
                        ></button>
                      </div>
                      <div
                        className="col text-truncate"
                        title={foodItem.description}
                      >
                        {foodItem.description}
                      </div>
                    </div>
                  </div>
                  <div
                    className="col text-truncate"
                    style={{ fontSize: "0.8rem" }}
                    title={`${workAbleNutrients[index].servingSize.toFixed(
                      2
                    )} g`}
                  >
                    {`Serving: ${workAbleNutrients[index].servingSize.toFixed(
                      2
                    )} g`}
                  </div>
                  <div
                    className="col text-truncate"
                    title={`${workAbleNutrients[index].calories.toFixed(
                      2
                    )} kcal`}
                    style={{ fontSize: "0.8rem" }}
                  >
                    {`Calories: ${workAbleNutrients[index].calories.toFixed(
                      2
                    )} kcal`}
                  </div>
                  <div
                    className="col text-truncate"
                    title={`${workAbleNutrients[index].protein.toFixed(2)} g`}
                    style={{ fontSize: "0.8rem" }}
                  >
                    {`Protein: ${workAbleNutrients[index].protein.toFixed(
                      2
                    )} g`}
                  </div>
                  <div
                    className="col text-truncate"
                    title={`${workAbleNutrients[index].fat.toFixed(2)} g`}
                    style={{ fontSize: "0.8rem" }}
                  >
                    {`Fat: ${workAbleNutrients[index].fat.toFixed(2)} g`}
                  </div>
                  <div
                    className="col text-truncate"
                    title={`${workAbleNutrients[index].carbs.toFixed(2)} g`}
                    style={{ fontSize: "0.8rem" }}
                  >
                    {`Carbs: ${workAbleNutrients[index].carbs.toFixed(2)} g`}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AddFoodForm;
