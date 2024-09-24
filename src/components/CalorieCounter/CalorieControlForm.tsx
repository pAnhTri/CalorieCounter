import { useEffect, useRef } from "react";

interface UserMacroStats {
  protein: number;
  fat: number;
  carbs: number;
  tdee: number;
  goal: number;
}

interface UserDefinedGoals {
  protein: number;
  fat: number;
  carbs: number;
}

interface CalorieControlFormProps {
  userMacros: UserMacroStats; // The user's current macros and TDEE
  updateUserTDEE: (goal: UserMacroStats) => void; // Function to update the user's TDEE and macro goals
  userMacroGoals: UserDefinedGoals; // The user's current macro nutrients (protein, fat, carbs) ratios
  updateMacroGoals: (updatedGoals: UserDefinedGoals) => void; // Function to update the user's macro nutrients (protein, fat, carbs) ratios
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
 * @param {function} updateUserTDEE - Function to update the user's TDEE and goals based on the new macronutrient distribution.
 * @param {UserDefinedGoals} userMacroGoals - Object containing the user's current macro nutrients (protein, fat, carbs) percentages (0 to 1).
 * @param {function} updateMacroGoals - Function to update the user's current macro nutrients (protein, fat, carbs) percentages.
 * @param {boolean} showMacroControl - Boolean flag to determine if the macro controls should be displayed or focused.
 */
const CalorieControlForm = ({
  userMacros,
  updateUserTDEE,
  userMacroGoals,
  updateMacroGoals,
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
  const updateMacroGoalRatios = () => {
    if (
      userMacroGoals.protein + userMacroGoals.fat + userMacroGoals.carbs ===
      1
    ) {
      const newGoals: UserMacroStats = {
        ...userMacros,
        ...userMacroGoals,
      };
      updateUserTDEE(newGoals);
    }
  };

  // Update macronutrient goals when protein, fat, or carbs values change
  useEffect(() => {
    updateMacroGoalRatios();
  }, [userMacroGoals]);

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
          updateUserTDEE({
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
          updateMacroGoals({
            ...userMacroGoals,
            protein: parseFloat(
              (parseFloat(event.currentTarget.value) / 100).toFixed(2)
            ),
          });
        }}
        type="number"
        className="form-control"
        value={(userMacroGoals.protein * 100).toFixed(0)}
        style={{
          width: "9ch",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      ></input>
      <input
        onChange={(event) => {
          updateMacroGoals({
            ...userMacroGoals,
            protein: parseFloat(event.currentTarget.value),
          });
        }}
        id="proteinControl"
        type="range"
        className="form-range mx-2"
        min={0}
        max={1}
        step={0.01}
        value={userMacroGoals.protein}
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
          updateMacroGoals({
            ...userMacroGoals,
            fat: parseFloat(
              (parseFloat(event.currentTarget.value) / 100).toFixed(2)
            ),
          });
        }}
        type="number"
        className="form-control"
        value={(userMacroGoals.fat * 100).toFixed(0)}
        style={{
          width: "9ch",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      ></input>
      <input
        onChange={(event) => {
          updateMacroGoals({
            ...userMacroGoals,
            fat: parseFloat(event.currentTarget.value),
          });
        }}
        id="fatControl"
        type="range"
        className="form-range mx-2"
        min={0}
        max={1}
        step={0.01}
        value={userMacroGoals.fat}
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
          updateMacroGoals({
            ...userMacroGoals,
            carbs: parseFloat(
              (parseFloat(event.currentTarget.value) / 100).toFixed(2)
            ),
          });
        }}
        type="number"
        className="form-control"
        value={(userMacroGoals.carbs * 100).toFixed(0)}
        style={{
          width: "9ch",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      />
      <input
        onChange={(event) => {
          updateMacroGoals({
            ...userMacroGoals,
            carbs: parseFloat(event.currentTarget.value),
          });
        }}
        id="carbsControl"
        type="range"
        className="form-range mx-2"
        min={0}
        max={1}
        step={0.01}
        value={userMacroGoals.carbs}
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
