import gql from 'graphql-tag';

export const RestaurantsNameImageUrl = gql`
  query {
    restaurants {
      name
      imgUrl
    }
  }
`;

export const RestaurantCreated = gql`
  subscription {
    restaurantCreated {
      name
      imgUrl
    }
  }
`;

export const CreateRestaurant = gql`
  mutation createRestaurant($newRestaurantData: NewRestaurantDataInput!) {
    createRestaurant(newRestaurantData: $newRestaurantData) {
      name
      imgUrl
    }
  }
`;
