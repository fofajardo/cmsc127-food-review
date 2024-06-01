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
  "Vegan Adobo",
  100,
  "1",
  4.5,
  ["Vegetarian", "Vegan", "Gluten-Free"]
);

export const sampleFoodItems = [
  sampleFoodItem,
  new FoodItem(
    "2",
    "Sinigang",
    120,
    "1",
    4.9,
    ["Filipino", "Soup"]
  ),
  new FoodItem(
    "3",
    "Kare-Kare",
    150,
    "1",
    2.7,
    ["Filipino", "Peanut Sauce"]
  ),
  new FoodItem(
    "4",
    "Burger",
    120,
    "1",
    3.8,
    ["American", "Fast Food"]
  ),
  new FoodItem(
    "5",
    "Spaghetti",
    100,
    "1",
    2.5,
    ["Italian", "Pasta"]
  )];
