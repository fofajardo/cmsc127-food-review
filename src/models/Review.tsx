abstract class Review {
  review_id: string;
  notes: string;
  date_written: string;
  user_id: string;
  rating: number; // 0-5

  constructor(
    review_id: string,
    notes: string,
    date_written: string,
    user_id: string,
    rating: number
  ) {
    this.review_id = review_id;
    this.notes = notes;
    this.date_written = date_written;
    this.user_id = user_id;
    this.rating = rating;
  }
}

export class EstablishmentReview extends Review {
  establishment_id: string;
  constructor(
    review_id: string,
    notes: string,
    date_written: string,
    user_id: string,
    rating: number,
    establishment_id: string
  ) {
    super(review_id, notes, date_written, user_id, rating);
    this.establishment_id = establishment_id;
  }
}

export class FoodItemReview extends Review {
  food_item_id: string;
  constructor(
    review_id: string,
    notes: string,
    date_written: string,
    user_id: string,
    rating: number,
    food_item_id: string
  ) {
    super(review_id, notes, date_written, user_id, rating);
    this.food_item_id = food_item_id;
  }
}
