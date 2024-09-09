import { useEffect, useRef } from "react";

interface UserMacroStats {
  protein: number;
  fat: number;
  carbs: number;
  tdde: number;
  goal: number;
}

interface CalorieControlFormProps {
  userMacros: UserMacroStats;
  updateUserTDDE: (goal: UserMacroStats) => void;
  userProtein: number;
  updateUserProtein: (protein: number) => void;
  userFat: number;
  updateUserFat: (fat: number) => void;
  userCarbs: number;
  updateUserCarbs: (carbs: number) => void;
  showMacroControl: boolean;
}

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

  useEffect(() => {
    updateMacroGoals();
  }, [userProtein, userFat, userCarbs]);

  useEffect(() => {
    localStorage.setItem(
      "userMacroGoals",
      JSON.stringify(userMacros as UserMacroStats)
    );
  }, [userMacros]);

  const calorieControlReference = useRef(null);

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
