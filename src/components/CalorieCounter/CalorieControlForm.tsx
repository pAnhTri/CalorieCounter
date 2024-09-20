import { useEffect, useRef } from "react";

interface UserMacroStats {
  protein: number;
  fat: number;
  carbs: number;
  tdde: number;
  goal: number;
}

interface CalorieControlFormProps {
  userMacros: UserMacroStats; // The user's current macros and TDEE
  updateUserTDDE: (goal: UserMacroStats) => void; // Function to update the user's TDEE and macro goals
  userProtein: number; // Current protein ratio
  updateUserProtein: (protein: number) => void; // Function to update protein ratio
  userFat: number; // Current fat ratio
  updateUserFat: (fat: number) => void; // Function to update fat ratio
  userCarbs: number; // Current carb ratio
  updateUserCarbs: (carbs: number) => void; // Function to update carb ratio
  showMacroControl: boolean; // Determines if the macro control UI should be shown
}

/**
 * @component
 * This component allows users to control and adjust their macronutrient goals (Protein, Fat, Carbs) and daily calorie intake.
 * It provides an interface to adjust the user's Total Daily Energy Expenditure (TDEE) and macronutrient ratios using sliders and inputs.
 * The form dynamically updates the user's macronutrient and calorie goals based on their input.
 *
 * Dependencies:
 * - Bootstrap for styling.
 *
 * Props:
 * @param {UserMacroStats} userMacros - Object containing the user's current macros and goals.
 * @param {function} updateUserTDDE - Function to update the user's TDEE and goals based on the new macronutrient distribution.
 * @param {number} userProtein - The user's current protein percentage (0 to 1).
 * @param {function} updateUserProtein - Function to update the user's protein percentage.
 * @param {number} userFat - The user's current fat percentage (0 to 1).
 * @param {function} updateUserFat - Function to update the user's fat percentage.
 * @param {number} userCarbs - The user's current carbohydrate percentage (0 to 1).
 * @param {function} updateUserCarbs - Function to update the user's carbohydrate percentage.
 * @param {boolean} showMacroControl - Boolean flag to determine if the macro controls should be displayed or focused.
 */
const CalorieControlForm = ({
  userMacros,
  updateUserTDDE,
  userProtein,
  updateUserProtein,
  userFat,
  updateUserFat,
  userCarbs,
  updateUserCarbs,
  showMacroControl,
}: CalorieControlFormProps) => {
  // Element Refs
  // Reference for calorie control input to focus when the control is shown
  const calorieControlReference = useRef(null);

  // Effects
  /**
   * Updates the user's macronutrient goals when the sum of protein, fat, and carbs equals 1.
   * It ensures the updated values are used to set the new macronutrient goals.
   */
  const updateMacroGoals = () => {
    if (userProtein + userFat + userCarbs === 1) {
      const newGoals: UserMacroStats = {
        ...userMacros,
        protein: userProtein,
        fat: userFat,
        carbs: userCarbs,
      };
      updateUserTDDE(newGoals);
    }
  };
  // Update macronutrient goals when protein, fat, or carbs values change
  useEffect(() => {
    updateMacroGoals();
  }, [userProtein, userFat, userCarbs]);

  // Save the user's macro goals to localStorage whenever the macros are updated
  useEffect(() => {
    localStorage.setItem(
      "userMacroGoals",
      JSON.stringify(userMacros as UserMacroStats)
    );
  }, [userMacros]);

  // Auto-focus the calorie control input when the macro control is shown
  useEffect(() => {
    if (showMacroControl && calorieControlReference.current) {
      const element: HTMLInputElement = calorieControlReference.current;
      element.focus();
    }
  }, [showMacroControl]);

  const calorieControlJSX = (
    <div className="d-flex my-2 mx-2">
      <label
        htmlFor="calorieControl"
        className="form-label mx-2 flex-shrink-0"
        style={{ width: "7ch" }}
      >
        Calories:
      </label>
      <input
        ref={calorieControlReference}
        onChange={(event) => {
          updateUserTDDE({
            ...userMacros,
            goal: parseFloat(event.currentTarget.value),
          });
        }}
        id="calorieControl"
        type="number"
        className="form-control"
        value={userMacros.goal.toFixed(2)}
      />
    </div>
  );

  const proteinControlJSX = (
    <div className="d-flex mb-2 mx-2">
      <label
        htmlFor="proteinControl"
        className="form-label mx-2 flex-shrink-0"
        style={{ width: "7ch" }}
      >
        Protein:
      </label>
      <input
        onChange={(event) => {
          updateUserProtein(
            parseFloat((parseFloat(event.currentTarget.value) / 100).toFixed(2))
          );
        }}
        type="number"
        className="form-control"
        value={(userProtein * 100).toFixed(0)}
        style={{
          width: "9ch",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      ></input>
      <input
        onChange={(event) => {
          updateUserProtein(parseFloat(event.currentTarget.value));
        }}
        id="proteinControl"
        type="range"
        className="form-range mx-2"
        min={0}
        max={1}
        step={0.01}
        value={userProtein}
      />
    </div>
  );

  const fatControlJSX = (
    <div className="d-flex mb-2 mx-2">
      <label
        htmlFor="fatControl"
        className="form-label mx-2 flex-shrink-0"
        style={{ width: "7ch" }}
      >
        Fat:
      </label>
      <input
        onChange={(event) => {
          updateUserFat(
            parseFloat((parseFloat(event.currentTarget.value) / 100).toFixed(2))
          );
        }}
        type="number"
        className="form-control"
        value={(userFat * 100).toFixed(0)}
        style={{
          width: "9ch",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      ></input>
      <input
        onChange={(event) => {
          updateUserFat(parseFloat(event.currentTarget.value));
        }}
        id="fatControl"
        type="range"
        className="form-range mx-2"
        min={0}
        max={1}
        step={0.01}
        value={userFat}
      />
    </div>
  );

  const carbsControlJSX = (
    <div className="d-flex mb-2 mx-2">
      <label
        htmlFor="carbsControl"
        className="form-label mx-2 flex-shrink-0"
        style={{ width: "7ch" }}
      >
        Carbs:
      </label>
      <input
        onChange={(event) => {
          updateUserCarbs(
            parseFloat((parseFloat(event.currentTarget.value) / 100).toFixed(2))
          );
        }}
        type="number"
        className="form-control"
        value={(userCarbs * 100).toFixed(0)}
        style={{
          width: "9ch",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      />
      <input
        onChange={(event) => {
          updateUserCarbs(parseFloat(event.currentTarget.value));
        }}
        id="carbsControl"
        type="range"
        className="form-range mx-2"
        min={0}
        max={1}
        step={0.01}
        value={userCarbs}
      />
    </div>
  );
  return (
    <div>
      <form>
        <div
          style={{
            border: "2px solid rgb(169, 169, 169)",
            borderRadius: "10px",
            margin: "0 auto",
            height: "100%",
            maxWidth: "625px",
          }}
        >
          {calorieControlJSX}
          {proteinControlJSX}
          {fatControlJSX}
          {carbsControlJSX}
        </div>
      </form>
    </div>
  );
};

export default CalorieControlForm;
