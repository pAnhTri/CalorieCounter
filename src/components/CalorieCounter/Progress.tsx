interface UserMacroStats {
  protein: number;
  fat: number;
  carbs: number;
  tdde: number;
  goal: number;
}

interface ProgressProps {
  userGoals: UserMacroStats;
}

const Progress = ({ userGoals }: ProgressProps) => {
  // Progress bar
  const userTDDEGoals = userGoals.goal;

  const progressReport = (progress: number) => {
    let bg = "danger";
    if (progress > 33) bg = "warning";
    if (progress > 66) bg = "success";
    return bg;
  };

  const macroProgress = {
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
  };

  macroProgress.calories = 2500;
  const calorieProgress = (macroProgress.calories / userTDDEGoals) * 100;
  return (
    <div className="d-flex flex-column">
      <div
        className="d-flex align-self-center flex-fill flex-column"
        style={{ width: "100%", maxWidth: "625px" }}
      >
        <div className="d-flex align-self-center" style={{ height: "2em" }}>
          Goal:{" "}
          <p className={`text-${progressReport(calorieProgress)} mx-1`}>
            {parseInt(calorieProgress.toFixed(0)) <= 100
              ? calorieProgress.toFixed(0)
              : "100"}
            %
          </p>
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
              <p className={`text-${progressReport(calorieProgress)} mx-1`}>
                {parseInt(calorieProgress.toFixed(0)) <= 100
                  ? calorieProgress.toFixed(0)
                  : "100"}
                %
              </p>
            </div>
            <div className="progress mx-2 mb-1" role="progressbar">
              <div
                className={`progress-bar bg-${progressReport(calorieProgress)}`}
                style={{ width: `${calorieProgress}%` }}
              ></div>
            </div>
          </div>
          <div
            className="d-flex align-self-center flex-fill flex-column"
            style={{ width: "100%", maxWidth: "625px" }}
          >
            <div className="d-flex align-self-center" style={{ height: "2em" }}>
              Fat:{" "}
              <p className={`text-${progressReport(calorieProgress)} mx-1`}>
                {parseInt(calorieProgress.toFixed(0)) <= 100
                  ? calorieProgress.toFixed(0)
                  : "100"}
                %
              </p>
            </div>
            <div className="progress mx-2 mb-1" role="progressbar">
              <div
                className={`progress-bar bg-${progressReport(calorieProgress)}`}
                style={{ width: `${calorieProgress}%` }}
              ></div>
            </div>
          </div>
          <div
            className="d-flex align-self-center flex-fill flex-column"
            style={{ width: "100%", maxWidth: "625px" }}
          >
            <div className="d-flex align-self-center" style={{ height: "2em" }}>
              Carbohydrate:{" "}
              <p className={`text-${progressReport(calorieProgress)} mx-1`}>
                {parseInt(calorieProgress.toFixed(0)) <= 100
                  ? calorieProgress.toFixed(0)
                  : "100"}
                %
              </p>
            </div>
            <div className="progress mx-2 mb-1" role="progressbar">
              <div
                className={`progress-bar bg-${progressReport(calorieProgress)}`}
                style={{ width: `${calorieProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
