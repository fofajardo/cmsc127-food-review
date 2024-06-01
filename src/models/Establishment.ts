export class Establishment {
  food_establishment_id: string;
  location: string;
  name: string;
  average_rating: number; // 0-5
  user_id: string; // owner
  description: string;

  constructor(
    food_establishment_id: string,
    location: string,
    name: string,
    average_rating: number,
    user_id: string,
    description: string
  ) {
    this.food_establishment_id = food_establishment_id;
    this.location = location;
    this.name = name;
    this.average_rating = average_rating;
    this.user_id = user_id;
    this.description = description;
  }
}

export const sampleEstablishment = new Establishment(
  "1",
  "Sample Location",
  "Sample Establishment",
  4.5,
  "1",
  "Sample Description"
);
