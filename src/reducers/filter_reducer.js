import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((product) => product.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
        },
      };
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === 'price-lowest') {
        tempProducts = filtered_products.sort((a, b) => a.price - b.price);
      }
      if (sort === 'price-highest') {
        tempProducts = filtered_products.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name-a') {
        tempProducts = filtered_products.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === 'name-z') {
        tempProducts = filtered_products.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return {
        ...state,
        filtered_products: tempProducts,
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };
    case FILTER_PRODUCTS:
      const { all_products } = state;
      let tempFilteredProducts = [...all_products];
      const { text, category, company, color, price, shipping } = state.filters;

      // Filtering
      if (text) {
        tempFilteredProducts = tempFilteredProducts.filter((product) => {
          return product.name.toLowerCase().includes(text.toLowerCase());
        });
      }

      if (category !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter((product) => {
          return product.category === category;
        });
      }

      if (company !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter((product) => {
          return product.company === company;
        });
      }

      if (color !== 'all') {
        tempFilteredProducts = tempFilteredProducts.filter((product) => {
          return product.color === color;
        });
      }

      if (price >= 0 && price <= state.filters.max_price) {
        tempFilteredProducts = tempFilteredProducts.filter((product) => {
          return product.price <= price;
        });
      }

      if (shipping) {
        tempFilteredProducts = tempFilteredProducts.filter((product) => {
          return product.shipping === true;
        });
      }

      return {
        ...state,
        filtered_products: tempFilteredProducts,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
