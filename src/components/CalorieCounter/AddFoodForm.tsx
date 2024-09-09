import { useEffect, useRef } from "react";
import searchIcon from "../../assets/search.svg";
import { FDCFoodData, FDCNutrients } from "../../Data/FDCData";
import { object } from "zod";

interface MacroProgress {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

interface AddFoodFormProps {
  showAutoCompleteForm: boolean;
  setShowAutoCompleteForm: (show: boolean) => void;
  availableOptions: string[];
  setAvailableOptions: () => void;
  foodTracker: FDCFoodData[];
  setFoodTracker: () => void;
  setMacroProgress: (progress: MacroProgress) => void;
}

const AddFoodForm = ({
  showAutoCompleteForm,
  setShowAutoCompleteForm,
  availableOptions,
  setAvailableOptions,
  foodTracker,
  setFoodTracker,
  setMacroProgress,
}: AddFoodFormProps) => {
  const searchRef = useRef(null);
  const autofillRef = useRef(null);
  const autocompleteBoxRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click is outside the component
    if (searchRef.current) {
      const searchComponent: any = searchRef.current;

      if (!searchComponent.contains(event.target as Node)) {
        setShowAutoCompleteForm(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (autocompleteBoxRef.current) {
      const autocompleteBox: HTMLDivElement = autocompleteBoxRef.current;
      autocompleteBox.scrollIntoView({ behavior: "smooth" });
    }
  }, [showAutoCompleteForm]);

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
            ref={searchRef}
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
                  ref={autofillRef}
                  onClick={() => {
                    setShowAutoCompleteForm(true);
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
            {showAutoCompleteForm && (
              <div
                ref={autocompleteBoxRef}
                className="overflow-auto"
                style={{
                  maxHeight: "calc(25.6px * 3)",
                  width: "100%",
                  maxWidth: "200px",
                  position: "absolute",
                }}
              >
                {availableOptions.map((value) => {
                  return (
                    <div
                      key={value}
                      onClick={(event) => {
                        event.currentTarget.style.background =
                          event.currentTarget.style.background === "blue"
                            ? "white"
                            : "blue";
                        if (autofillRef.current) {
                          const autoFillSearch: HTMLInputElement =
                            autofillRef.current;
                          autoFillSearch.value =
                            event.currentTarget.textContent ?? "";
                        }
                      }}
                      style={{ border: "1px solid" }}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            )}
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
          {foodTracker.map((foodItem) => {
            return (
              <li key={foodItem.fdcId} className="list-group-item">
                {foodItem.description}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddFoodForm;
