import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice ({
    name: 'account',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setData: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }
});

export const { setLoading, setData, setError } = accountSlice.actions;  // export the actions
export default accountSlice.reducer;  // export the reducer