import { useEffect, useRef } from "react";
import searchIcon from "../../assets/search.svg";
import * as bootstrap from "bootstrap";
import { FDCFoodData, ShortFDCFoodData } from "../../Data/FDCData";
import { extractNutritionalValue } from "../../Data/ExtractMacroNutrients";
import FDCApi from "../../Data/FDCAPIKey";
import axios from "axios";

interface SearchModalProps {
  showSearchModal: boolean;
  setShowSearchModal: () => void;
  availableOptions: ShortFDCFoodData[];
  setAvailableOptions: (list: ShortFDCFoodData[]) => void;
  lookedUpFoodList: ShortFDCFoodData[];
  setLookedUpList: (list: ShortFDCFoodData[]) => void;
  foodTracker: ShortFDCFoodData[];
  setFoodTracker: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

interface FDCResponse {
  totalHits: number;
  currentPage: number;
  totalPages: number;
  foods: FDCFoodData[];
}

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
  const workableNutrients = extractNutritionalValue(availableOptions);

  const searchRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const searchModal = new bootstrap.Modal("#searchModal");

    if (showSearchModal) searchModal.show();
  }, [showSearchModal]);

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
        const searchQuery = `?query=${query}&dataType=Branded,Foundation,Survey%20%28FNDDS%29,SR%20Legacy&pageSize=200&sortBy=lowercaseDescription.keyword&sortOrder=asc&api_key=DEMO_KEY`;
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
