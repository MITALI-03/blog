import { createContext, useContext, useReducer, ReactNode } from "react";

type Reducer<S, A> = (state: S, action: A) => S;

type Actions<S> = {
  [key: string]: (dispatch: React.Dispatch<Action>, state: S) => () => void;
};

interface Action {
  type: string;
}

interface DataContextProps<S, A> {
  Context: React.Context<ContextState<S, A>>;
  Provider: React.FC<{ children: ReactNode }>;
}

interface ContextState<S, A> {
  state: S;
  dispatch: React.Dispatch<Action>;
  actions: A;
}

function createDataContext<S, A extends Actions<S>>(
  reducer: Reducer<S, Action>,
  actions: A,
  initialState: S
): DataContextProps<S, A> {
  const Context = createContext<ContextState<S, A>>({
    state: initialState,
    dispatch: () => {},
    actions: actions,
  });

  const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions = Object.entries(actions).reduce(
      (acc, [key, actionFn]) => {
        acc[key as keyof A] = actionFn(
          dispatch,
          state
        ) as unknown as A[keyof A];
        return acc;
      },
      {} as A
    );

    return (
      <Context.Provider value={{ state, dispatch, actions: boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
}

export default createDataContext;
