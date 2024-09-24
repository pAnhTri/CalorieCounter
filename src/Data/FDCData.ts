/**
 * This collection of data types is used to process and handle food information from the USDA FoodData Central (FDC) API.
 * The FDC API provides detailed nutritional information for food items, and these types represent both the raw data 
 * from the API and a simplified structure for internal processing.
 * 
 * The `ShortFDCFoodData` interface represents a simplified structure used for tracking and managing food items within 
 * the application. It includes only the essential fields for food tracking, while `FDCFoodData` represents the full 
 * structure returned by the API.
 * 
 * Purpose:
 * - `ShortFDCFoodData`: A simplified version of the API data tailored for use in the food tracking feature.
 * - `FDCFoodData`: The full structure returned by the API, containing more detailed information about each food item.
 * - `FDCNutrients`: Nutritional data for a food item, including nutrient names, values, and units.
 */

/**
 * Simplified data structure for processing food information in the food tracking feature.
 * 
 * This interface is used internally to store and manage essential food data after calling the USDA FDC API.
 * It includes only the fields necessary for tracking food consumption and calculating nutrient intake.
 * 
 * Fields:
 * - `fdcId`: {number} - A unique identifier for the food item from the FDC API.
 * - `description`: {string} - A short description of the food item.
 * - `foodNutrients`: {FDCNutrients[]} [optional] - An array of nutrients associated with the food item.
 * - `servingSizeUnit`: {string} [optional] - The unit of measurement for the serving size (e.g., grams, ounces).
 * - `servingSize`: {number} [optional] - The serving size for the food item.
 */
interface ShortFDCFoodData {
    fdcId: number;
    description: string;
    foodNutrients?: FDCNutrients[];
    servingSizeUnit?: string;
    servingSize?: number,
  }
  
  /**
 * Represents the nutrient information for a food item as returned by the FDC API.
 * 
 * This interface defines the structure of nutritional data, which includes the nutrient's name, value,
 * and associated metadata such as the derivation description.
 * 
 * Fields:
 * - `nutrientId`: {number} [optional] - The unique identifier for the nutrient.
 * - `nutrientName`: {string} [optional] - The name of the nutrient (e.g., Protein, Fat).
 * - `nutrientNumber`: {string} [optional] - A numeric identifier for the nutrient.
 * - `value`: {number} [optional] - The nutrient value (e.g., grams of protein).
 * - `unitName`: {string} [optional] - The unit of measurement for the nutrient (e.g., grams, milligrams).
 * - `derivationCode`: {string} [optional] - A code representing how the nutrient value was derived.
 * - `derivationDescription`: {string} [optional] - A description of how the nutrient value was derived.
 */
  interface FDCNutrients {
    nutrientId?: number
    nutrientName?: string;
    nutrientNumber?: string;
    value?: number;
    unitName?: string;
    derivationCode?: string;
    derivationDescription?: string;
  }
  
  /**
 * Full data structure representing food items from the FDC API.
 * 
 * This interface defines the complete structure of a food item as returned by the FDC API. It contains
 * detailed information, including food description, serving size, nutrients, and additional metadata such 
 * as brand owner and publication date. It is typically used when working with raw API responses.
 * 
 * Fields:
 * - `dataType`: {string} [optional] - The type of data (e.g., "Branded").
 * - `description`: {string} - A description of the food item.
 * - `fdcId`: {number} - A unique identifier for the food item.
 * - `foodNutrients`: {FDCNutrients[]} [optional] - An array of nutrients for the food item.
 * - `servingSizeUnit`: {string} [optional] - The unit of measurement for the serving size.
 * - `servingSize`: {number} [optional] - The serving size for the food item.
 * - `publicationDate`: {string} [optional] - The date the food data was published.
 * - `brandOwner`: {string} [optional] - The brand owner of the food item (for branded foods).
 * - `gtinUpc`: {string} [optional] - The UPC code for the branded food item.
 * - `ndbNumber`: {number} [optional] - The USDA National Nutrient Database number (for legacy foods).
 * - `foodCode`: {string} [optional] - A code representing the food item.
 */
  interface FDCFoodData {
    dataType?: string;
    description: string;
    fdcId: number;
    foodNutrients?: FDCNutrients[];
    servingSizeUnit?: string;
    servingSize?: number,
    publicationDate?: string;
    brandOwner?: string;
    gtinUpc?: string;
    ndbNumber?: number;
    foodCode?: string;
  }

  export {type ShortFDCFoodData, type FDCFoodData, type FDCNutrients}