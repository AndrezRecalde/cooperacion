import { createSlice } from "@reduxjs/toolkit";

export const markerSlice = createSlice({
    name: "marker",
    initialState: {
        proyectosMarkers: [],
        organizacionesMarkers: [],
        activateMarker: null,
        errores: null,
        initialPoints: {},
    },
    reducers: {
        onLoadProyectosMarkers: (state, { payload = [] }) => {
            payload.forEach((marker) => {
                const exists = state.proyectosMarkers.some(
                    (dbMarker) => dbMarker.id === marker.id
                );
                if (!exists) {
                    state.proyectosMarkers.push(marker);
                }
            });
        },
        onLoadOrgMarkers: (state, { payload = [] }) => {
            payload.forEach((marker) => {
                const exists = state.organizacionesMarkers.some(
                    (dbMarker) => dbMarker.id === marker.id
                );
                if (!exists) {
                    state.organizacionesMarkers.push(marker);
                }
            });
        },
        onActivateMarker: (state, { payload }) => {
            state.activateMarker = payload;
        },
        onClearActivateMarker: (state) => {
            state.activateMarker = null;
        },
        onClearProyectoMarkers: (state) => {
            state.proyectosMarkers = [];
        },
        onClearOrgMakers: (state) => {
            state.organizacionesMarkers = [];
        },
        onLoadPoints: (state, { payload }) => {
            state.initialPoints = payload;
        },
        onClearPoints: (state) => {
            state.initialPoints = {};
        },
        onErroresMarker: (state, { payload }) => {
            state.errores = payload;
        }
    },
});

export const {
    onLoadProyectosMarkers,
    onLoadOrgMarkers,
    onActivateMarker,
    onClearActivateMarker,
    onClearProyectoMarkers,
    onClearOrgMakers,
    onLoadPoints,
    onClearPoints,
    onErroresMarker
} = markerSlice.actions;
