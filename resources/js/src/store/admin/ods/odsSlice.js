import { createSlice } from "@reduxjs/toolkit";

export const odsSlice = createSlice({
    name: "ods",
    initialState: {
        objetivos: [],
        activateObjetivo: null,
        errores: undefined,
    },
    reducers: {
        onObjetivos: (state, { payload }) => {
            state.objetivos = payload;
        },
        onSetActivateObjetivo: (state, { payload }) => {
            state.activateObjetivo = payload;
            state.errores = undefined;
        },
        onClearObjetivos: (state) => {
            state.objetivos = [];
            state.errores = undefined;
        }
    },
});

export const { onObjetivos, onSetActivateObjetivo, onClearObjetivos } =
    odsSlice.actions;
