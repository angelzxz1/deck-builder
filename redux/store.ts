import { configureStore } from "@reduxjs/toolkit";
import deckListReducer from "@/redux/features/deckListSlice";
import StateReducer from "@/redux/features/statsSlice";
export const store = configureStore({
    reducer: {
        deckList: deckListReducer,
        state: StateReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
