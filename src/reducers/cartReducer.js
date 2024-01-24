export const cartInitialState = JSON.parse(localStorage.getItem("cart")) || [];

export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

// actualizar loacStorage
export const updateLocalStorage = (state) => {
  window.localStorage.setItem("cart", JSON.stringify(state));
};

export const cartReducer = (state, action) => {
  // en el type le pasamos el string para identificar que accion hace
  // en el payload le mandamos el objeto que necesitamos (a veces es opcional)
  const { type: actionType, payload: actionPayload } = action;

  // podria usar if en ves de switch
  switch (actionType) {
    // Puedo guardar las acciones en un objeto y pasarlas asi tambien
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = actionPayload;
      const productInCartIndex = state.findIndex((item) => item.id === id);

      // producto esta en el carrito
      if (productInCartIndex >= 0) {
        // 👀 una forma sería usando structuredClone
        // const newState = structuredClone(state)
        // newState[productInCartIndex].quantity += 1

        // 👶 usando el map
        const newState = state.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }

          return item;
        });

        // ⚡ usando el spread operator y slice
        // const newState = [
        //   ...state.slice(0, productInCartIndex),
        //   {
        //     ...state[productInCartIndex],
        //     quantity: state[productInCartIndex].quantity + 1,
        //   },
        //   ...state.slice(productInCartIndex + 1),
        // ];

        updateLocalStorage(newState);
        return newState;
      }

      // producto no esta en el carrito
      const newState = [...state, { ...actionPayload, quantity: 1 }];
      updateLocalStorage(newState);
      return newState;
    }

    case "REMOVE_FROM_CART": {
      const { id } = actionPayload;
      const newState = state.filter((item) => item.id !== id);
      updateLocalStorage(newState);
      return newState;
    }

    case "CLEAR_CART": {
      updateLocalStorage([]);
      return [];
    }
  }
  return state;
};
