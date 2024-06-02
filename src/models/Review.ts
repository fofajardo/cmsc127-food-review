abstract class Review {
  review_id: string;
  notes: string;
  date_written: string;
  user_id: string;
  username: string;
  rating: number; // 0-5

  constructor(
    review_id: string,
    notes: string,
    date_written: string,
    user_id: string,
    username: string,
    rating: number
  ) {
    this.review_id = review_id;
    this.notes = notes;
    this.date_written = date_written;
    this.user_id = user_id;
    this.username = username;
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
    username: string,
    rating: number,
    establishment_id: string
  ) {
    super(review_id, notes, date_written, user_id, username, rating);
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
    username: string,
    rating: number,
    food_item_id: string
  ) {
    super(review_id, notes, date_written, user_id, username, rating);
    this.food_item_id = food_item_id;
  }
}


export const sampleEstablishmentReview = new EstablishmentReview(
  "621354",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim.",
  "2021-09-01",
  "143135",
  "JohnDoe",
  4.5,
  "1"
);

export const sampleFoodItemReview = new FoodItemReview(
  "212354",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor",
  "2021-09-01",
  "143135",
  "JohnDoe",
  4.5,
  "1"
);

export const sampleEstablishmentReviews: EstablishmentReview[] = [
  sampleEstablishmentReview,
  new EstablishmentReview(
    "621355",
    "Great selection of craft beers and knowledgeable staff. The pub quiz was a lot of fun, and we'll definitely be back for another try.",
    "2024-06-01",
    "234234",
    "JaneDoe",
    4,
    "2"
  ),
  new EstablishmentReview(
    "621356",
    "The ambiance was lovely, and the service was impeccable. The food was beautifully presented and tasted even better. A perfect place for a special occasion.",
    "2024-05-30",
    "321543",
    "JamesDoe",
    5,
    "3"
  ),
  new EstablishmentReview(
    "621357",
    "Disappointed with the long wait time for food. The burger was a bit dry, but the fries were good. Might give them another chance on a less busy day.",
    "2024-05-28",
    "143135",
    "JohnDoe",
    3,
    "4"
  ),
  new EstablishmentReview(
    "621358",
    "Delicious selection of sushi and friendly service. The restaurant was clean and well-maintained. Would recommend for a quick and satisfying lunch.",
    "2024-05-25",
    "432154",
    "JillDoe",
    4.5,
    "5"
  ),
  new EstablishmentReview(
    "621359",
    "The coffee was strong and flavorful, just what I needed in the morning. The pastries were fresh and delicious. A great spot for a quick coffee break.",
    "2024-05-23",
    "234234",
    "JaneDoe",
    4.5,
    "6"
  )]