import { useEffect } from "react";
import searchIcon from "../../assets/search.svg";
import { FDCFoodData } from "../../Data/FDCData";

interface MacroProgress {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

interface AddFoodFormProps {
  showSearchModal: boolean;
  setShowSearchModal: () => void;
  availableOptions: string[];
  setAvailableOptions: () => void;
  foodTracker: FDCFoodData[];
  setFoodTracker: () => void;
  setMacroProgress: (progress: MacroProgress) => void;
}

const AddFoodForm = ({
  showSearchModal,
  setShowSearchModal,
  availableOptions,
  setAvailableOptions,
  foodTracker,
  setFoodTracker,
  setMacroProgress,
}: AddFoodFormProps) => {
  const sumCalories = () => {
    const calories = foodTracker.flatMap((item) =>
      item.foodNutrients.filter((nutrient) => nutrient.number === "208")
    );

    let sumOfCalories = 0;

    for (const calorie of calories) {
      sumOfCalories += calorie.amount;
    }

    return sumOfCalories;
  };

  const sumProtein = () => {
    const proteins = foodTracker.flatMap((item) =>
      item.foodNutrients.filter((nutrient) => nutrient.number === "203")
    );

    let sumOfProtein = 0;

    for (const protein of proteins) {
      sumOfProtein += protein.amount;
    }

    return sumOfProtein;
  };

  const sumFat = () => {
    const fats = foodTracker.flatMap((item) =>
      item.foodNutrients.filter((nutrient) => nutrient.number === "204")
    );

    let sumOfFats = 0;

    for (const fat of fats) {
      sumOfFats += fat.amount;
    }

    return sumOfFats;
  };

  const sumCarbs = () => {
    const carbs = foodTracker.flatMap((item) =>
      item.foodNutrients.filter((nutrient) => nutrient.number === "205")
    );

    let sumOfCarbs = 0;

    for (const carb of carbs) {
      sumOfCarbs += carb.amount;
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

    return () => {
      setMacroProgress(newMacroProgess);
    };
  }, [foodTracker]);

  const extractNutritionalValue = () => {
    const workableNutrients = foodTracker.map((innerArray) => {
      const filteredNutrients = innerArray.foodNutrients.filter((nutrient) => {
        return (
          nutrient.number === "203" ||
          nutrient.number === "204" ||
          nutrient.number === "205" ||
          nutrient.number === "208"
        );
      });

      return {
        calories: filteredNutrients[3].amount,
        protein: filteredNutrients[0].amount,
        fat: filteredNutrients[1].amount,
        carbs: filteredNutrients[2].amount,
      };
    });

    return workableNutrients;
  };

  const workAbleNutrients = extractNutritionalValue();

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
        <ul className="list-group">
          {foodTracker.map((foodItem, index) => {
            return (
              <li
                key={foodItem.fdcId}
                className="list-group-item d-flex justify-content-between"
                style={{
                  width: "100%",
                }}
              >
                <span
                  style={{
                    width: "100px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {foodItem.description}
                </span>
                <span
                  style={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {`Calories: ${workAbleNutrients[index].calories.toFixed(
                    2
                  )}kcal`}
                </span>
                <span
                  style={{
                    maxWidth: "150px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {`Protein: ${workAbleNutrients[index].protein.toFixed(2)}g`}
                </span>
                <span
                  style={{
                    maxWidth: "100px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {`Fat: ${workAbleNutrients[index].fat.toFixed(2)}g`}
                </span>
                <span
                  style={{
                    maxWidth: "100px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {`Carbs: ${workAbleNutrients[index].carbs.toFixed(2)}g`}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddFoodForm;
