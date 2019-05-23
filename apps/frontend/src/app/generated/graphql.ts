export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Dish = {
  __typename?: 'Dish',
  id: Scalars['ID'],
  name: Scalars['String'],
  imgUrl: Scalars['String'],
  price: Scalars['Float'],
  creationDate: Scalars['Float'],
  restaurant: Restaurant,
};

export type Mutation = {
  __typename?: 'Mutation',
  createRestaurant: Restaurant,
  removeRestaurant: Restaurant,
  createDish: Dish,
  removeDish: Dish,
};


export type MutationCreateRestaurantArgs = {
  newRestaurantData: NewRestaurantDataInput;
};


export type MutationRemoveRestaurantArgs = {
  id: Scalars['String']
};


export type MutationCreateDishArgs = {
  newDishData: NewDishDataInput
};


export type MutationRemoveDishArgs = {
  id: Scalars['String']
};

export type NewDishDataInput = {
  name: Scalars['String'],
  imgUrl: Scalars['String'],
  price: Scalars['Float'],
  restaurantId: Scalars['String'],
};

export type NewRestaurantDataInput = {
  name: Scalars['String'],
  imgUrl: Scalars['String'],
};

export type Query = {
  __typename?: 'Query',
  restaurant: Restaurant,
  restaurants: Array<Restaurant>,
  dish: Dish,
  dishes: Array<Dish>,
};


export type QueryRestaurantArgs = {
  id: Scalars['String']
};


export type QueryRestaurantsArgs = {
  skip: Scalars['Int'],
  take: Scalars['Int']
};


export type QueryDishArgs = {
  id: Scalars['String']
};


export type QueryDishesArgs = {
  skip: Scalars['Int'],
  take: Scalars['Int']
};

export type Restaurant = {
  __typename?: 'Restaurant',
  id: Scalars['ID'],
  name: Scalars['String'],
  imgUrl: Scalars['String'],
  creationDate: Scalars['Float'],
  dishes: Array<Dish>,
};

export type Subscription = {
  __typename?: 'Subscription',
  restaurantCreated: Restaurant,
  dishCreated: Dish,
};
