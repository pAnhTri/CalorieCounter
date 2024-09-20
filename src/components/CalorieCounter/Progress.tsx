interface UserMacroStats {
  protein: number;
  fat: number;
  carbs: number;
  tdde: number;
  goal: number;
}

interface MacroProgress {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
}

interface ProgressProps {
  userGoals: UserMacroStats; // The user's macro goals
  macroProgress: MacroProgress; // The user's macro progress
}

/**
 * @component
 * This component displays the user's progress toward their macronutrient goals (calories, protein, fat, carbs).
 * It includes progress bars to visualize how much of each macronutrient has been consumed relative to the user's goals.
 * The progress bars are color-coded based on progress: red (low), yellow (medium), and green (high).
 *
 * Dependencies:
 * - Bootstrap for styling.
 *
 * Props:
 * @param {UserMacroStats} userGoals - The user's macronutrient goals, including calories, protein, fat, and carbs.
 * @param {MacroProgress} macroProgress - The user's current macronutrient intake progress.
 */
const Progress = ({ userGoals, macroProgress }: ProgressProps) => {
  // Progress bar
  const userTDDEGoals = userGoals.goal;

  /**
   * Determines the color of the progress bar based on the progress percentage.
   * @param {number} progress - The current percentage of progress (0 to 100).
   * @returns {string} The Bootstrap background color class based on progress (bg-danger, bg-warning, bg-success).
   */
  const progressReport = (progress: number) => {
    let bg = "danger";
    if (progress > 33) bg = "warning";
    if (progress > 66) bg = "success";
    return bg;
  };

  const calorieProgress = (macroProgress.calories / userTDDEGoals) * 100;
  const proteinProgress = (macroProgress.proteins / userTDDEGoals) * 100;
  const fatProgress = (macroProgress.fats / userTDDEGoals) * 100;
  const carbsProgress = (macroProgress.carbs / userTDDEGoals) * 100;

  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex align-self-center flex-fill flex-column"
        style={{ width: "100%", maxWidth: "625px" }}
      >
        <div className="d-flex align-self-center" style={{ height: "2em" }}>
          Goal:{" "}
          <span className={`text-${progressReport(calorieProgress)} ms-1`}>
            {parseInt(calorieProgress.toFixed(0)) <= 100
              ? calorieProgress.toFixed(0)
              : "100"}
            %
          </span>
          <span className={`text-${progressReport(calorieProgress)} mx-1`}>
            {" "}
            {`(${macroProgress.calories.toFixed(2)}/${userTDDEGoals.toFixed(
              2
            )}) kcal`}{" "}
          </span>
        </div>
        <button
          className="progress mx-2 mb-1"
          role="progressbar"
          data-bs-toggle="collapse"
          data-bs-target="#additionalGoals"
          style={{ height: "30px" }}
        >
          <div
            className={`progress-bar bg-${progressReport(calorieProgress)}`}
            style={{ width: `${calorieProgress}%` }}
          >
            Click for Macro Goals
          </div>
        </button>
      </div>
      <div
        className="collapse"
        id="additionalGoals"
        style={{ margin: "0 auto", maxWidth: "625px", width: "100%" }}
      >
        <div
          className="d-flex align-self-center align-content-start"
          style={{ width: "100%", maxWidth: "625px" }}
        >
          <div
            className="d-flex align-self-center flex-fill flex-column"
            style={{ width: "100%", maxWidth: "625px" }}
          >
            <div className="d-flex align-self-center" style={{ height: "2em" }}>
              Protein:{" "}
              <p className={`text-${progressReport(proteinProgress)} mx-1`}>
                {parseInt(proteinProgress.toFixed(0)) <= 100
                  ? proteinProgress.toFixed(0)
                  : "100"}
                %
              </p>
            </div>
            <div className="progress mx-2 mb-1" role="progressbar">
              <div
                className={`progress-bar bg-${progressReport(proteinProgress)}`}
                style={{ width: `${proteinProgress}%` }}
              ></div>
            </div>
          </div>
          <div
            className="d-flex align-self-center flex-fill flex-column"
            style={{ width: "100%", maxWidth: "625px" }}
          >
            <div className="d-flex align-self-center" style={{ height: "2em" }}>
              Fat:{" "}
              <p className={`text-${progressReport(fatProgress)} mx-1`}>
                {parseInt(fatProgress.toFixed(0)) <= 100
                  ? fatProgress.toFixed(0)
                  : "100"}
                %
              </p>
            </div>
            <div className="progress mx-2 mb-1" role="progressbar">
              <div
                className={`progress-bar bg-${progressReport(fatProgress)}`}
                style={{ width: `${fatProgress}%` }}
              ></div>
            </div>
          </div>
          <div
            className="d-flex align-self-center flex-fill flex-column"
            style={{ width: "100%", maxWidth: "625px" }}
          >
            <div className="d-flex align-self-center" style={{ height: "2em" }}>
              Carbohydrate:{" "}
              <p className={`text-${progressReport(carbsProgress)} mx-1`}>
                {parseInt(carbsProgress.toFixed(0)) <= 100
                  ? carbsProgress.toFixed(0)
                  : "100"}
                %
              </p>
            </div>
            <div className="progress mx-2 mb-1" role="progressbar">
              <div
                className={`progress-bar bg-${progressReport(carbsProgress)}`}
                style={{ width: `${carbsProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
