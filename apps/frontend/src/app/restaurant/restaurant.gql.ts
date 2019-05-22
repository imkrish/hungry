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
