import { createSlice } from "@reduxjs/toolkit";

export const proyectoSlice = createSlice({
    name: "proyecto",
    initialState: {
        isLoading: false,
        proyectos: [],
        activateProyecto: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errores = undefined;
        },
        onProyectos: (state, { payload }) => {
            state.proyectos = payload;
            state.isLoading = false;
            state.errores = undefined;
        },
        onAddProyectos: (state, { payload }) => {
            state.proyectos.push(payload);
            state.activateProyecto = null;
            state.errores = undefined;
        },
        onUpdateProyecto: (state, { payload }) => {
            state.proyectos = state.proyectos.map((proyecto) => {
                if (proyecto.id === payload.id) {
                    return payload;
                }
                return proyecto;
            });
        },
        onDeleteProyecto: (state) => {
            if (state.activateProyecto) {
                state.proyectos = state.proyectos.filter(
                    (proyecto) => proyecto.id !== state.activateProyecto.id
                );
                state.activateProyecto = null;
                state.errores = undefined;
            }
        },
        onSetActivateProyecto: (state, { payload }) => {
            state.activateProyecto = payload;
            state.errores = undefined;
        },
        onClearProyectos: (state) => {
            state.proyectos = [];
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onProyectos,
    onAddProyectos,
    onUpdateProyecto,
    onDeleteProyecto,
    onSetActivateProyecto,
    onClearProyectos,
    onErrores,
} = proyectoSlice.actions;
