import { createSlice } from "@reduxjs/toolkit";

export const internacionalSlice = createSlice({
    name: "internacionalSlice",
    initialState: {
        isLoading: false,
        referencias: [],
        activateReferencia: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onReferencias: (state, { payload }) => {
            state.referencias = payload;
            state.isLoading = false;
        },
        onAddReferencia: (state, { payload }) => {
            state.referencias.push(payload);
        },
        onUpdateReferencia: (state, { payload }) => {
            state.referencias = state.referencias.map((ref) => {
                if (ref.id === payload.id) {
                    return payload;
                }
                return ref;
            });
        },
        onSetActivateReferencia: (state, { payload }) => {
            state.activateReferencia = payload;
            state.errores = undefined;
        },
        onClearReferencias: (state) => {
            state.referencias = [];
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onReferencias,
    onAddReferencia,
    onUpdateReferencia,
    onSetActivateReferencia,
    onClearReferencias,
    onErrores,
} = internacionalSlice.actions;
