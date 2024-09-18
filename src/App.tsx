// Import from STL
import { useEffect, useState } from "react";

// Navigation Component
import NavBar from "./components/NavBar";
import ActivePage from "./Data/ActivePage";

// Calorie Counter Component
import AddFoodForm from "./components/CalorieCounter/AddFoodForm";
import CalorieControlButtons from "./components/CalorieCounter/CalorieControlButtons";
import CalorieControlForm from "./components/CalorieCounter/CalorieControlForm";
import DoughnutChart from "./components/CalorieCounter/DoughnutChart";
import Progress from "./components/CalorieCounter/Progress";
import SearchModal from "./components/CalorieCounter/SearchModal";

// Profile Component
import ProfileForm from "./components/Profile/Form";
import UserData from "./Data/User";
import List from "./components/Profile/List";
import ProfileAlert from "./components/Profile/Alert";

// Diary Component
import DiaryForm from "./components/Diary/Form";

// Functions
import { calculateTDEE } from "./Data/CalculateTDEE";

// Types
import { ShortFDCFoodData } from "./Data/FDCData";

const App = () => {
  // Standard variables
  // Set default for the macro values
  //Initial ratio
  /*
   * Protein: 20% -> 1g = 4kcal
   * Fat: 20% -> 1g = 9kcal
   * Carbs: 60% -> 1g = 4kcal
   *
   */
  const userMacro = {
    protein: 0.2,
    fat: 0.2,
    carbs: 0.6,
    tdde: 0,
    goal: 0,
  };

  //Default values without user profile
  const initialProgress = {
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
  };

  // States
  // State of the active page
  const [activePage, setActivePage] = useState(ActivePage[0]);

  // State of the user
  // User is set based on the available user profile in the local storage
  // User can initially be an existing user or undefined
  const [user, setUser] = useState<UserData>(() => {
    const userProfileStorage = localStorage.getItem("userProfile");
    let userProfile: UserData;
    userProfile = userProfileStorage
      ? JSON.parse(userProfileStorage)
      : undefined;
    return userProfile;
  });

  // Prevents the user from losing the initial data if any
  // Using usermacro from local storage or predefined macros
  const [userDefinedMacros, setUserDefinedMacros] = useState(() => {
    const savedMacros = localStorage.getItem("userMacroGoals");

    let macros: typeof userMacro = savedMacros
      ? JSON.parse(savedMacros)
      : userMacro;
    return macros;
  });

  const [userDefinedProtein, setUserDefinedProtein] = useState(() => {
    const savedMacros = localStorage.getItem("userMacroGoals");

    if (savedMacros) {
      return JSON.parse(savedMacros).protein;
    } else {
      return 0.2;
    }
  });
  const [userDefinedFat, setUserDefinedFat] = useState(() => {
    const savedMacros = localStorage.getItem("userMacroGoals");

    if (savedMacros) {
      return JSON.parse(savedMacros).fat;
    } else {
      return 0.2;
    }
  });
  const [userDefinedCarbs, setUserDefinedCarbs] = useState(() => {
    const savedMacros = localStorage.getItem("userMacroGoals");

    if (savedMacros) {
      return JSON.parse(savedMacros).carbs;
    } else {
      return 0.6;
    }
  });

  // Format of height and weight unit state
  // Decide whether the weight is in kg/ lbs and height in cm/ ft'in''
  const [isWeightInKg, setIsWeightInKg] = useState(false);
  const [isHeightInCm, setIsHeightInCm] = useState(false);

  // State of the render of the user form
  // Mount or unmount the user form to update a user's profile
  const [showUserForm, setShowUserForm] = useState(false);

  // State of alert Alert
  // Controls whether the Alert component when updating the user profile is shown or not
  const [showSuccessfulUpdateAlert, setShowSuccessfulUpdateAlert] =
    useState(false);

  // Doughnut Chart
  // State of the doughnut chart formatting
  // Used to store the user defined dougnut chart render option
  const [chartOptions, setChartOptions] = useState();

  // State of the additional Macro controls
  // Mounts and unmounts the macro control form for custom macro goals
  const [showMacroControl, setShowMacroControl] = useState(false);

  // Search Modal
  // State of the search modal
  // Shows and hides the modal for the search component with FDCAPI
  const [showSearchModal, setShowSearchModal] = useState(false);

  // State of the availble search options
  // Keeps track of the processed list of returned FDCAPI search call
  const [availableOptions, setAvailableOptions] = useState<ShortFDCFoodData[]>(
    []
  );

  // State of the food tracker
  // Keeps track of the items added by the user to count the calories and macros
  const [foodTracker, setFoodTracker] = useState<ShortFDCFoodData[]>([]);

  // State of the looked up items
  // Keeps track of the items the user wants to add to the food tracker
  const [lookedUpFoodList, setLookedUpList] = useState<ShortFDCFoodData[]>([]);

  // State of the progress
  // Set rendered state to be initialProgress values
  const [macroProgress, setMacroProgress] = useState(initialProgress);

  /**
   * Adds unique items from a looked-up food list to an existing food tracker.
   *
   * This function merges two arrays: `foodTracker` and `lookedUpFoodList`.
   * It ensures that all items in the final `foodTracker` array are unique by
   * using a `Set`, which removes any duplicate items. The function then updates
   * the state of `foodTracker` with the merged list.
   *
   * @function
   * @returns {void} This function does not return a value. It updates the `foodTracker` state.
   *
   * @example
   * // Assume initial state of foodTracker: ['Apple', 'Banana']
   * // Assume lookedUpFoodList contains: ['Banana', 'Orange']
   * addItemsToFoodTracker();
   * // After execution, foodTracker becomes: ['Apple', 'Banana', 'Orange']
   */
  const addItemsToFoodTracker = () => {
    const mergedList = [...new Set([...foodTracker, ...lookedUpFoodList])];
    setFoodTracker(mergedList);
  };

  // State of the search modal loading
  // Ensures that the  user cannotmake additional searches when querying with FDCAPI
  const [isLoading, setIsLoading] = useState(false);

  // Page control effect
  // Checks immediately after render once (no dependencies)
  // Effect is default to profile page if there is no user yet
  useEffect(() => {
    if (!user) {
      setActivePage(ActivePage[1]);
    }
  }, []);

  // Macros control effect
  // Dependicies exist, same page is rendered when user exist
  // Checks for user and calculate TDEE to set goal
  useEffect(() => {
    const userTDDE = user ? calculateTDEE(user) : 0;
    setUserDefinedMacros({
      ...userDefinedMacros,
      tdde: userTDDE,
      goal: userTDDE,
    });
  }, [user]);

  return (
    <>
      <NavBar activePage={activePage} switchActivePage={setActivePage}></NavBar>

      {/* Render alert only when user successfully creates profile */}
      {showSuccessfulUpdateAlert && (
        <ProfileAlert
          timeOutAlert={showSuccessfulUpdateAlert}
          dismissAlert={() => setShowSuccessfulUpdateAlert(false)}
        ></ProfileAlert>
      )}

      {/* Render the calorie counter and required components when a user profile exist and the page is set to the Calorie Counter */}
      {user && activePage === ActivePage[0] && (
        <div>
          <DoughnutChart
            doughnutOptions={chartOptions}
            setDoughnutOptions={(options: any) => {
              setChartOptions(options);
            }}
            userMacros={userDefinedMacros}
          ></DoughnutChart>
          <Progress
            userGoals={userDefinedMacros}
            macroProgress={macroProgress}
          ></Progress>
          <CalorieControlButtons
            userMacros={userDefinedMacros}
            updateUserDefinedGoals={(deltaMacro: number) => {
              setUserDefinedMacros({
                ...userDefinedMacros,
                goal: userDefinedMacros.tdde + deltaMacro,
              });
            }}
            switchShowMacroControls={() =>
              setShowMacroControl(!showMacroControl)
            }
          ></CalorieControlButtons>
          {showMacroControl && (
            <CalorieControlForm
              userMacros={userDefinedMacros}
              updateUserTDDE={(macroGoal: typeof userMacro) => {
                setUserDefinedMacros(macroGoal);
              }}
              userProtein={userDefinedProtein}
              updateUserProtein={(protein: number) =>
                setUserDefinedProtein(protein)
              }
              userCarbs={userDefinedCarbs}
              updateUserCarbs={(carbs: number) => setUserDefinedCarbs(carbs)}
              userFat={userDefinedFat}
              updateUserFat={(fat: number) => setUserDefinedFat(fat)}
              showMacroControl={showMacroControl}
            ></CalorieControlForm>
          )}
          <AddFoodForm
            setShowSearchModal={() => {
              setShowSearchModal(true);
            }}
            foodTracker={foodTracker}
            setFoodTracker={setFoodTracker}
            setLookedUpList={setLookedUpList}
            setMacroProgress={(progress: typeof macroProgress) => {
              setMacroProgress(progress);
            }}
          ></AddFoodForm>
          <SearchModal
            showSearchModal={showSearchModal}
            setShowSearchModal={() => {
              setShowSearchModal(false);
            }}
            availableOptions={availableOptions}
            setAvailableOptions={setAvailableOptions}
            lookedUpFoodList={lookedUpFoodList}
            setLookedUpList={setLookedUpList}
            foodTracker={foodTracker}
            setFoodTracker={addItemsToFoodTracker}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          ></SearchModal>
        </div>
      )}
      {/* Render DiaryForm whenever user updates */}
      {activePage === ActivePage[2] && <DiaryForm></DiaryForm>}

      {/* Render the user profile if one exists, else, render just a button for the user to add the profile */}
      {activePage === ActivePage[1] && (
        <>
          {user && !showUserForm && (
            <>
              <List
                user={user}
                weightUnitInKg={isWeightInKg}
                switchWeightUnit={(useKg) => setIsWeightInKg(useKg)}
                heightUnitInCm={isHeightInCm}
                switchHeighUnit={(useCm) => setIsHeightInCm(useCm)}
              ></List>
            </>
          )}
          <ProfileForm
            showUserForm={showUserForm}
            switchShowUserForm={() => setShowUserForm(!showUserForm)}
            updateUser={setUser}
            user={user}
            showSuccessfulProfileAlert={() => {
              setShowSuccessfulUpdateAlert(true);
            }}
          >
            {user ? "Update User" : "Add User"}
          </ProfileForm>
        </>
      )}
    </>
  );
};

export default App;
