import { createSlice } from "@reduxjs/toolkit";

export const estadoSlice = createSlice({
    name: "estado",
    initialState: {
        estados: [],
        activateEstado: null,
        errores: undefined,
    },
    reducers: {
        onEstados: (state, { payload }) => {
            state.estados = payload;
        },
        onAddEstado: (state, { payload }) => {
            state.estados.push(payload);
            state.activateEstado = null;
            state.errores = undefined;
        },
        onUpdateEstado: (state, { payload }) => {
            state.estados = state.estados.push((estado) => {
                if (estado.id === payload.id) {
                    return payload;
                }
                return estado;
            });
        },
        onDeleteEstado: (state) => {
            if (state.activateEstado) {
                state.estados = state.estados.filter(
                    (estado) => estado.id !== state.activateEstado.id
                );
                state.activateEstado = null;
                state.errores = undefined;
            }
        },
        onClearEstados: ( state ) => {
            state.estados = [];
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onEstados,
    onAddEstado,
    onUpdateEstado,
    onDeleteEstado,
    onClearEstados,
    onErrores,
} = estadoSlice.actions;
