// Import Search icon
import searchIcon from "../../assets/search.svg";

// Import STL
import { useEffect, useRef } from "react";

// Import bootstrap types
import * as bootstrap from "bootstrap";

// Import ultility functions
import { extractNutritionalValue } from "../../Data/ExtractMacroNutrients";

// Import axios for API calls
import axios from "axios";

// Import type of food data
import { FDCFoodData, ShortFDCFoodData } from "../../Data/FDCData";

// Import the API key to use
import FDCApi from "../../Data/FDCAPIKey";

interface FDCResponse {
  totalHits: number;
  currentPage: number;
  totalPages: number;
  foods: FDCFoodData[];
}

interface SearchModalProps {
  showSearchModal: boolean; // Determines if the modal should be visible
  setShowSearchModal: () => void; // Function to toggle the modal
  availableOptions: ShortFDCFoodData[]; // Available food options fetched from the API
  setAvailableOptions: (list: ShortFDCFoodData[]) => void; // Function to update available options
  lookedUpFoodList: ShortFDCFoodData[]; // List of searched food items
  setLookedUpList: (list: ShortFDCFoodData[]) => void; // Function to update the looked-up food list
  foodTracker: ShortFDCFoodData[]; // User's current food tracker
  setFoodTracker: () => void; // Function to update the food tracker
  isLoading: boolean; // Boolean indicating if the data is loading
  setIsLoading: (loading: boolean) => void; // Function to set the loading state
}

/**
 * @component
 * This component renders a modal that allows users to search for food items and add them to the food tracker.
 * It communicates with the USDA FoodData Central API to retrieve nutritional information for different foods.
 * Users can toggle food items and add them to their daily food tracker. The modal dynamically updates based on the search input.
 *
 * Dependencies:
 * - Bootstrap for styling.
 * - Axios for making API requests.
 *
 * Props:
 * @param {boolean} showSearchModal - Flag to control the visibility of the modal.
 * @param {function} setShowSearchModal - Function to toggle the visibility of the modal.
 * @param {ShortFDCFoodData[]} availableOptions - An array of available food options to display.
 * @param {function} setAvailableOptions - Function to set available food options after API calls.
 * @param {ShortFDCFoodData[]} lookedUpFoodList - An array of food items the user has searched for.
 * @param {function} setLookedUpList - Function to update the searched food list.
 * @param {ShortFDCFoodData[]} foodTracker - Array of food items that the user has added to their daily tracker.
 * @param {function} setFoodTracker - Function to update the food tracker with selected items.
 * @param {boolean} isLoading - Boolean indicating if the data is loading.
 * @param {function} setIsLoading - Function to set the loading state.
 */
const SearchModal = ({
  showSearchModal,
  setShowSearchModal,
  availableOptions,
  setAvailableOptions,
  lookedUpFoodList,
  setLookedUpList,
  foodTracker,
  setFoodTracker,
  isLoading,
  setIsLoading,
}: SearchModalProps) => {
  // Element refs
  // Reference to the search input element
  const searchRef = useRef<HTMLInputElement>(null);

  // Effects
  // Adds event listeners for focusing the input when the modal opens and closing the modal when hidden
  useEffect(() => {
    const searchModalEventListener = document.getElementById("searchModal");
    searchModalEventListener?.addEventListener("shown.bs.modal", () => {
      if (searchRef.current) {
        searchRef.current.focus();
      }
    });
    searchModalEventListener?.addEventListener("hide.bs.modal", () => {
      setShowSearchModal();
    });
  }, []);

  // Show or hide the modal based on the `showSearchModal` prop
  useEffect(() => {
    const searchModal = new bootstrap.Modal("#searchModal");

    if (showSearchModal) searchModal.show();
  }, [showSearchModal]);

  // Call the FDC API to search food nutrient values
  useEffect(() => {
    // Make sure that the API call only happens while the search is active
    if (isLoading) {
      let query = "";

      if (searchRef.current) {
        query = searchRef.current.value;
      }

      if (query) {
        const serverPath = "https://api.nal.usda.gov/fdc/v1/foods/search";
        const searchQuery = `?query=${query}&dataType=Branded,Foundation,Survey%20%28FNDDS%29,SR%20Legacy&pageSize=200&sortBy=lowercaseDescription.keyword&sortOrder=asc&api_key=${FDCApi}`;
        axios
          .get(serverPath + searchQuery)
          .then((response) => {
            const foodInfo: FDCResponse = response.data;
            const foodShortInfo: ShortFDCFoodData[] = foodInfo.foods.map(
              ({
                fdcId,
                description,
                foodNutrients,
                servingSizeUnit,
                servingSize,
              }: FDCFoodData) => ({
                fdcId,
                description,
                foodNutrients,
                servingSizeUnit,
                servingSize,
              })
            );

            /* Process the units
             * Standard units should be:
             * serving size: varying => need to get info from the object property
             * calories: kcal
             * protein: g
             * fat: g
             * carbs: g
             */
            setAvailableOptions(foodShortInfo);
          })
          .catch((error) => {
            console.log(error.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  }, [isLoading]);

  /**
   * Toggles food items in the lookedUpFoodList and updates the tracker accordingly.
   *
   * @param {ShortFDCFoodData} foodItem - The food item to toggle in the list.
   */
  const handleToggle = (foodItem: ShortFDCFoodData) => {
    if (
      lookedUpFoodList.includes(foodItem) &&
      !foodTracker.includes(foodItem)
    ) {
      setLookedUpList(lookedUpFoodList.filter((item) => item !== foodItem));
    } else {
      setLookedUpList([...lookedUpFoodList, foodItem]);
    }
  };

  // Extracted nutrient information from the availableOptions using a utility function.
  const workableNutrients = extractNutritionalValue(availableOptions);

  return (
    <div>
      <div className="modal fade" id="searchModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header justify-content-center">
              <div style={{ display: "contents" }}>
                <form>
                  <input
                    ref={searchRef}
                    type="text"
                    className="form-control"
                    placeholder="Search Food"
                    style={{
                      borderRadius:
                        "var(--bs-border-radius) 0 0 var(--bs-border-radius)",
                    }}
                  />
                </form>
                <button
                  className={`btn btn-primary ${isLoading ? "disabled" : ""}`}
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                  }}
                  style={{
                    backgroundImage: `url(${searchIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius:
                      "0 var(--bs-border-radius) var(--bs-border-radius) 0",
                    aspectRatio: "1/1",
                    alignSelf: "stretch",
                  }}
                ></button>
              </div>
            </div>
            <div className="modal-body">
              <div
                className="container overflow-auto"
                style={{ maxHeight: "250px" }}
              >
                {!isLoading ? (
                  availableOptions.length > 0 &&
                  availableOptions.map((foodItem, index) => {
                    return (
                      <div
                        className="row border-bottom"
                        onClick={() => handleToggle(foodItem)}
                        key={foodItem.fdcId}
                        style={{
                          background: `${
                            lookedUpFoodList.includes(foodItem)
                              ? "aquamarine"
                              : "white"
                          }`,
                        }}
                      >
                        <div
                          className="col-2 text-truncate"
                          title={foodItem.description}
                        >
                          {foodItem.description}
                        </div>
                        <div className="col" style={{ fontSize: "0.8rem" }}>
                          {`Serving: ${workableNutrients[
                            index
                          ].servingSize.toFixed(2)} ${
                            workableNutrients[index].servingUnit
                          }`}
                        </div>
                        <div className="col" style={{ fontSize: "0.8rem" }}>
                          {`Calories: ${workableNutrients[
                            index
                          ].calories.toFixed(2)} kcal`}
                        </div>
                        <div className="col" style={{ fontSize: "0.8rem" }}>
                          {`Protein: ${workableNutrients[index].protein.toFixed(
                            2
                          )} g`}
                        </div>
                        <div className="col" style={{ fontSize: "0.8rem" }}>
                          {`Fat: ${workableNutrients[index].fat.toFixed(2)} g`}
                        </div>
                        <div className="col" style={{ fontSize: "0.8rem" }}>
                          {`Carbs: ${workableNutrients[index].carbs.toFixed(
                            2
                          )} g`}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              {" "}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className={`btn btn-primary ${isLoading ? "disabled" : ""}`}
                onClick={() => setFoodTracker()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
