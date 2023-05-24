import { createSlice } from "@reduxjs/toolkit";

export const periodoSlice = createSlice({
    name: "periodo",
    initialState: {
        isLoading: false,
        periodos: [],
        activatePeriodo: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errores = undefined;
        },
        onPeriodos: (state, { payload }) => {
            state.periodos = payload;
        },
        onAddPeriodo: (state, { payload }) => {
            state.periodos.push(payload);
            (state.activatePeriodo = null), (state.errores = undefined);
        },
        onUpdatePeriodo: (state, { payload }) => {
            state.periodos = state.periodos.map((periodo) => {
                if (periodo.id === payload.id) {
                    return payload;
                }
                return periodo;
            });
        },
        onDeletePeriodo: (state) => {
            if (state.activatePeriodo) {
                state.periodos = state.periodos.filter(
                    (periodo) => periodo.id !== state.activatePeriodo.id
                );
                state.activatePeriodo = null;
                state.errores = undefined;
            }
        },
        onSetActivatePeriodo: (state, { payload }) => {
            state.activatePeriodo = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onClearPeriodos: (state) => {
            state.periodos = [];
            state.activatePeriodo = null;
            state.errores = undefined;
        },
    },
});

export const {
    onLoading,
    onPeriodos,
    onAddPeriodo,
    onUpdatePeriodo,
    onDeletePeriodo,
    onSetActivatePeriodo,
    onErrores,
    onClearPeriodos,
} = periodoSlice.actions;
