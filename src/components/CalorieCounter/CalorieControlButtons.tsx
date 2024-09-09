import styled from "styled-components";

interface UserMacroStats {
  protein: number;
  fat: number;
  carbs: number;
  tdde: number;
  goal: number;
}

interface CalorieControlButtonsProps {
  userMacros: UserMacroStats;
  updateUserDefinedGoals: (macroDelta: number) => void;
  switchShowMacroControls: () => void;
}

const WeightChangeButton = styled.button.attrs(() => ({
  className: "btn me-2",
}))`
  background-color: #6f6f6f;
  color: white;
  --bs-btn-hover-color: white;
  --bs-btn-hover-bg: #5c5c5c;
`;

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
            updateUserDefinedGoals(-(userMacros.tdde * 0.2));
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
            updateUserDefinedGoals(userMacros.tdde * 0.1);
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
