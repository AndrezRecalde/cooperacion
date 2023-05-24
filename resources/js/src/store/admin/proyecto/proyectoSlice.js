import { createSlice } from "@reduxjs/toolkit";

export const proyectoSlice = createSlice({
    name: "proyecto",
    initialState: {
        isLoading: false,
        proyectos: [],
        activateProyecto: null,
        totalProyectos: [],
        montoEjecutado: null,
        graficoProyectosOds: [],
        graficoProyectosTipos: [],
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errores = undefined;
        },
        onProyectos: (state, { payload }) => {
            state.proyectos = payload;
            state.errores = undefined;
            state.isLoading = false;
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
        onSetTotalProyectos: (state, { payload }) => {
            state.totalProyectos = payload;
        },

        onSetMontoEjecutado: (state, { payload }) => {
            state.montoEjecutado = payload;
        },
        onSetGraficoProyectosOds: (state, { payload }) => {
            state.graficoProyectosOds = payload;
        },
        onSetGraficoProyectosTipos: (state, { payload }) => {
            state.graficoProyectosTipos = payload;
        },
        onSetActivateProyecto: (state, { payload }) => {
            state.activateProyecto = payload;
            state.errores = undefined;
        },
        onClearProyectos: (state) => {
            state.proyectos = [];
            state.errores = undefined;
        },
        onClearTotales: (state) => {
            state.totalProyectos = [];
        },
        onClearMontos: (state) => {
            state.montoEjecutado = null;
        },
        onClearGraficos: (state) => {
            state.graficoProyectosOds = [];
            state.graficoProyectosTipos = [];
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
    onSetTotalProyectos,
    onSetMontoEjecutado,
    onSetGraficoProyectosOds,
    onSetGraficoProyectosTipos,
    onSetActivateProyecto,
    onClearProyectos,
    onClearTotales,
    onClearMontos,
    onClearGraficos,
    onErrores,
} = proyectoSlice.actions;
