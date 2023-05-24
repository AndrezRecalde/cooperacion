import { createSlice } from "@reduxjs/toolkit";

export const tipoSlice = createSlice({
    name: "tipo",
    initialState: {
        isLoading: false,
        tipos: [],
        activateTipo: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onTipos: (state, { payload }) => {
            state.tipos = payload;
            state.isLoading = false;
        },
        onAddTipo: (state, { payload }) => {
            state.tipos.push(payload);
        },
        onUpdateTipo: (state, { payload }) => {
            state.tipos = state.tipos.map((tipo) => {
                if (tipo.id === payload.id) {
                    return payload;
                }
                return tipo;
            });
        },
        onDeleteTipo: (state) => {
            if (state.activateTipo) {
                state.tipos = state.tipos.filter(
                    (tipo) => tipo.id !== state.activateTipo.id
                );
                state.activateTipo = null;
                state.errores = undefined;
            }
        },
        onSetActivateTipo: (state, { payload }) => {
            state.activateTipo = payload;
            state.errores = undefined;
        },
        onClearTipos: (state) => {
            state.tipos = [];
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onTipos,
    onAddTipo,
    onUpdateTipo,
    onDeleteTipo,
    onSetActivateTipo,
    onClearTipos,
    onErrores,
} = tipoSlice.actions;
