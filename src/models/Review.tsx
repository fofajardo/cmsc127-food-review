abstract class Review {
  review_id: string;
  notes: string;
  date_written: string;
  user_id: string;
  rating: number; // 0-5
}

export class EstablishmentReview extends Review {
  establishment_id: string;
}

export class FoodItemReview extends Review {
  food_item_id: string;
}
