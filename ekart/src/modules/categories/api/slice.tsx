import { createSlice } from '@reduxjs/toolkit';

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setData: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null
        },
        setError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {setData, setError, setLoading } = CategoriesSlice.actions;  // export the actions
export default CategoriesSlice.reducer;  // export the reducer