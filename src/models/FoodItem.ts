export class FoodItem {
  food_item_id: string;
  name: string;
  price: number;
  establishment_id: string;
  average_rating: number;
  food_types: string[];

  constructor(
    food_item_id: string,
    name: string,
    price: number,
    establishment_id: string,
    average_rating: number,
    food_types: string[]
  ) {
    this.food_item_id = food_item_id;
    this.name = name;
    this.price = price;
    this.establishment_id = establishment_id;
    this.average_rating = average_rating;
    this.food_types = food_types;
  }
}

export const sampleFoodItem = new FoodItem(
  "1",
  "Sample Food Item",
  100,
  "1",
  4.5,
  ["Sample Food Type"]
);
