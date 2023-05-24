import { createSlice } from "@reduxjs/toolkit";

export const tipoCooperacionSlice = createSlice({
    name: "tipoCooperacion",
    initialState: {
        isLoading: false,
        tiposCopperaciones: [],
        activateTipoCoop: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onTiposCooperacion: (state, { payload }) => {
            state.tiposCopperaciones = payload;
            state.isLoading = false;
        },
        onAddTipoCooperacion: (state, { payload }) => {
            state.tiposCopperaciones.push(payload);
        },
        onUpdateTipoCooperacion: (state, { payload }) => {
            state.tiposCopperaciones = state.tiposCopperaciones.map((tipo) => {
                if (tipo.id === payload.id) {
                    return payload;
                }
                return tipo;
            });
        },
        onDeleteTipoCooperacion: (state) => {
            if (state.activateTipoCoop) {
                state.tiposCopperaciones = state.tiposCopperaciones.filter(
                    (tipo) => tipo.id !== state.activateTipoCoop.id
                );
                state.activateTipoCoop = null;
                state.errores = undefined;
            }
        },
        onSetActivateTipoCoop: (state, { payload }) => {
            state.activateTipoCoop = payload;
            state.errores = undefined;
        },
        onClearTiposCoop: (state) => {
            state.tiposCopperaciones = [];
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onTiposCooperacion,
    onAddTipoCooperacion,
    onUpdateTipoCooperacion,
    onDeleteTipoCooperacion,
    onSetActivateTipoCoop,
    onClearTiposCoop,
    onErrores,
} = tipoCooperacionSlice.actions;
