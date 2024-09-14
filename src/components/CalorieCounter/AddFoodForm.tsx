import { useEffect } from "react";
import searchIcon from "../../assets/search.svg";
import { ShortFDCFoodData } from "../../Data/FDCData";
import { extractNutritionalValue } from "../../Data/ExtractMacroNutrients";

interface MacroProgress {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

interface AddFoodFormProps {
  setShowSearchModal: () => void;
  foodTracker: ShortFDCFoodData[];
  setFoodTracker: (list: ShortFDCFoodData[]) => void;
  setLookedUpList: (list: ShortFDCFoodData[]) => void;
  setMacroProgress: (progress: MacroProgress) => void;
}

const AddFoodForm = ({
  setShowSearchModal,
  foodTracker,
  setFoodTracker,
  setLookedUpList,
  setMacroProgress,
}: AddFoodFormProps) => {
  const workAbleNutrients = extractNutritionalValue(foodTracker);

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
