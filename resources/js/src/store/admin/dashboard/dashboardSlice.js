import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        isLoading: false,
        totalOrganizaciones: [],
        totalProyectos: [],
        totalProyectosModalidades: [],
        totalProyectosOds: [],
        totalProyectosTipos: [],
        totalMontos: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
        },
        onLoadingTotalOrg: (state, { payload }) => {
            state.totalOrganizaciones = payload;
        },
        onLoadingTotalProyectos: (state, { payload }) => {
            state.totalProyectos = payload;
        },
        onLoadingProyectosModalidad: (state, { payload }) => {
            state.totalProyectosModalidades = payload;
        },
        onLoadingProyectosOds: (state, { payload }) => {
            state.totalProyectosOds = payload;
            state.isLoading = false;
        },
        onLoadingProyectosTipos: (state, { payload }) => {
            state.totalProyectosTipos = payload;
        },
        onLoadingTotalMontos: (state, { payload }) => {
            state.totalMontos = payload;
        },
        onClearDashboard: (state) => {
            state.totalOrganizaciones = [];
            state.totalProyectos = [];
            state.totalProyectosModalidades = [];
            state.totalProyectosOds = [];
            state.totalProyectosTipos = [];
            state.totalMontos = null;
        },
        onLoadingErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onLoadingTotalOrg,
    onLoadingTotalProyectos,
    onLoadingProyectosModalidad,
    onLoadingProyectosOds,
    onLoadingProyectosTipos,
    onLoadingTotalMontos,
    onClearDashboard,
    onLoadingErrores,
} = dashboardSlice.actions;
