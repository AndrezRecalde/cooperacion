import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
    name: "state",
    initialState: {
        paises: [],
        estados: [],
        ciudades: [],
        cantones: [],
        parroquias: [],
        recintos: [],
    },
    reducers: {
        onLoadPaises: (state, { payload }) => {
            state.paises = payload;
        },
        onLoadEstados: (state, { payload }) => {
            state.estados = payload;
        },
        onLoadCiudades: (state, { payload }) => {
            state.ciudades = payload;
        },
        onLoadCantones: (state, { payload }) => {
            state.cantones = payload;
        },
        onLoadParroquias: (state, { payload }) => {
            state.parroquias = payload;
        },
        onLoadRecintos: (state, { payload }) => {
            state.recintos = payload;
        },
        onClearDependecies: (state) => {
            state.estados = [];
            state.ciudades = [];
            state.parroquias = [];
            state.recintos = [];
        },
        onClearStates: (state) => {
            state.paises = [];
            state.estados = [];
            state.ciudades = [];
            state.cantones = [];
            state.parroquias = [];
            state.recintos = [];
        }
    },
});

export const {
    onLoadPaises,
    onLoadEstados,
    onLoadCiudades,
    onLoadCantones,
    onLoadParroquias,
    onLoadRecintos,
    onClearDependecies,
    onClearStates
} = stateSlice.actions;
