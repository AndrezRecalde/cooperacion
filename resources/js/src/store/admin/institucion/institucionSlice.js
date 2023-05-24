import { createSlice } from "@reduxjs/toolkit";

export const institucionSlice = createSlice({
    name: "institucion",
    initialState: {
        instituciones: [],
    },
    reducers: {
        onLoadInstituciones: (state, { payload }) => {
            state.instituciones = payload;
        },
        onClearInstituciones: (state) => {
            state.instituciones = [];
        },
    },
});

export const { onLoadInstituciones, onClearInstituciones } =
    institucionSlice.actions;
