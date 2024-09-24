import styled from "styled-components";

interface UserMacroStats {
  protein: number;
  fat: number;
  carbs: number;
  tdee: number;
  goal: number;
}

interface CalorieControlButtonsProps {
  userMacros: UserMacroStats; // User's current macro stats
  updateUserDefinedGoals: (macroDelta: number) => void; // Function to update calorie goals
  switchShowMacroControls: () => void; // Function to toggle custom macro controls
}

const WeightChangeButton = styled.button.attrs(() => ({
  className: "btn me-2",
}))`
  background-color: #6f6f6f;
  color: white;
  --bs-btn-hover-color: white;
  --bs-btn-hover-bg: #5c5c5c;
`;

/**
 * @component
 * Renders buttons for managing caloric intake goals:
 * - Lose Weight: Reduces the user's TDEE by 20%.
 * - Maintain Weight: Keeps the current TDEE.
 * - Gain Weight: Increases the user's TDEE by 10%.
 * - Custom Goals: Switches to a custom goal adjustment interface.
 *
 * Dependencies:
 * - Bootstrap for styling.
 *
 * Props:
 * @param {UserMacroStats} userMacros - The user's current macro stats and TDEE.
 * @param {function} updateUserDefinedGoals - Function to adjust calorie goals based on the button clicked.
 * @param {function} switchShowMacroControls - Function to toggle the custom macro controls.
 */
const CalorieControlButtons = ({
  userMacros,
  updateUserDefinedGoals,
  switchShowMacroControls,
}: CalorieControlButtonsProps) => {
  return (
    <div style={{ width: "100%", maxWidth: "625px", margin: "0 auto 1em" }}>
      <div className="d-flex justify-content-between mx-2">
        <WeightChangeButton
          style={{ flex: "1 1 0" }}
          type="button"
          onClick={() => {
            updateUserDefinedGoals(-(userMacros.tdee * 0.2));
          }}
        >
          Lose Weight
        </WeightChangeButton>
        <button
          className="btn btn-success me-2"
          style={{ flex: "1 1 0" }}
          type="button"
          onClick={() => {
            updateUserDefinedGoals(0);
          }}
        >
          Maintain Weight
        </button>
        <WeightChangeButton
          style={{ flex: "1 1 0" }}
          type="button"
          onClick={() => {
            updateUserDefinedGoals(userMacros.tdee * 0.1);
          }}
        >
          Gain Weight
        </WeightChangeButton>
        <button
          className="btn btn-warning"
          style={{ flex: "1 1 0" }}
          type="button"
          onClick={() => switchShowMacroControls()}
        >
          Custom Goals
        </button>
      </div>
    </div>
  );
};

export default CalorieControlButtons;
