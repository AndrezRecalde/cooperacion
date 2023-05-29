import { createSlice } from "@reduxjs/toolkit";

export const afiliacionSlice = createSlice({
    name: "afiliacion",
    initialState: {
        isLoading: false,
        isSend: false,
        afiliaciones: [],
        activeAfiliacion: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errores = undefined;
        },
        onSending: (state) => {
            state.isSend = true;
        },
        onAfiliaciones: (state, { payload }) => {
            state.afiliaciones = payload;
            state.isLoading = false;
        },
        onAddAfiliacion: (state, { payload }) => {
            state.afiliaciones.push(payload);
            state.activeAfiliacion = null;
            state.errores = undefined;
            state.isLoading = false;
        },
        onUpdateAfiliaciones: (state, { payload }) => {
            state.afiliaciones = state.afiliaciones.map((afiliacion) => {
                if (afiliacion.id === payload.id) {
                    return payload;
                }
                return afiliacion;
            });
        },
        onDeleteAfiliacion: (state) => {
            if (state.activeAfiliacion) {
                state.afiliaciones = state.afiliaciones.filter(
                    (afiliacion) => afiliacion.id !== state.activeAfiliacion.id
                );
                state.activeAfiliacion = null;
                state.errores = undefined;
            }
        },
        onSetActivateAfiliacion: (state, { payload }) => {
            state.activeAfiliacion = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onClearAfiliaciones: (state) => {
            state.afiliaciones = [];
            state.errores = undefined;
        },
        onRestartSend: (state) => {
            state.isSend = false;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
        clearErrores: (state) => {
            state.errores = undefined
        }
    },
});

export const {
    onLoading,
    onSending,
    onAfiliaciones,
    onAddAfiliacion,
    onUpdateAfiliaciones,
    onDeleteAfiliacion,
    onSetActivateAfiliacion,
    onClearAfiliaciones,
    onRestartSend,
    onErrores,
    clearErrores
} = afiliacionSlice.actions;
