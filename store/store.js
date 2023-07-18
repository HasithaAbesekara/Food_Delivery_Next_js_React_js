import create from "zustand";
export const useStore = create((set) => ({
  //cart

  cart: {
    food: [],
  },
  //add food in cart

  addfood: (data) =>
    set((state) => ({
      cart: {
        food: [...state.cart.food, data],
      },
    })),

  //Remove Food
  removeFood: (index) =>
    set((state) => ({
      cart: {
        food: state.cart.food.filter((_, i) => i != index),
      },
    })),

  //cart resate
  resetCart: () =>
    set(() => ({
      cart: {
        food: [],
      },
    })),
}));
