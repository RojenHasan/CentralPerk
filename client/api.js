import sanityClient from './sanity';
let sanityQuery = (query, params) => sanityClient.fetch(query, params);

export const getFeaturedResturants = () => {
    return sanityQuery(`
      *[_type == 'featured'] {
  ...,
  restaurants[]->{
    ...,
    type->{
      name
    },
    dishes[]->{
      ...
    }
  }

}

    `);
}

export const getCategories = () => {
    return sanityQuery(`
        *[_type == 'category'] | order(name asc)
    `);
}

export const getFeaturedResturantById = id => {
    return sanityQuery(`
        *[_type == 'featured' && _id == $id] {
            ...,
            resturants[]->{
                ...,
                dishes[]->,
                type->{
                    name
                }
            }
        }[0]
    `, { id })
}

export const getAllRestaurants = () => {
    return sanityQuery(`
    *[_type == 'resturant'] {
      ...,
      type->{
        name
      },
      dishes[]->{
        ...
      }
    }
  `);
}
