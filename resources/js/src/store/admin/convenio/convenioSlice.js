import { createSlice } from "@reduxjs/toolkit";

/* Tipos de Convenios */

export const convenioSlice = createSlice({
    name: "convenio",
    initialState: {
        convenios: [],
    },
    reducers: {
        onLoadConvenios: (state, { payload }) => {
            state.convenios = payload;
        },
        onClearConvenios: (state) => {
            state.convenios = [];
        },
    },
});

export const { onLoadConvenios, onClearConvenios } = convenioSlice.actions;
