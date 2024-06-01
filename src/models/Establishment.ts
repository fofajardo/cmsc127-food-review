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

// sample with comprehensive details
export const sampleEstablishment = new Establishment(
  "1",
  "Los Baños, Laguna",
  "Let's Eat",
  4.5,
  "1",
"Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim."
);

export const sampleEstablishments = [
  sampleEstablishment,
  new Establishment(
    "2",
    "Los Baños, Laguna",
    "Let's Eat Again",
    4.9,
    "2",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim."
  ),
  new Establishment(
    "3",
    "Los Baños, Laguna",
    "Let's Eat Some More",
    2.7,
    "3",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim."
  ),
  new Establishment(
    "4",
    "Los Baños, Laguna",
    "Let's Eat Again and Again",
    3.8,
    "4",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim. Nullam ac urna eu felis dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque. Suspendisse in orci enim."
  ),
];

 
