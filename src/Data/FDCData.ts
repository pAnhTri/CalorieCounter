interface ShortFDCFoodData {
    fdcId: number;
    description: string;
    foodNutrients?: FDCNutrients[];
    servingSizeUnit?: string;
    servingSize?: number,
  }
  
  interface FDCNutrients {
    number?: string;
    name?: string;
    amount?: number;
    unitName?: string;
    derivationCode?: string;
    derivationDescription?: string;
  }
  
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