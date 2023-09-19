import { createSlice } from "@reduxjs/toolkit";

export const organizacionSlice = createSlice({
    name: "organizacion",
    initialState: {
        isLoading: false,
        organizaciones: [],
        activateOrganizacion: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errores = undefined;
        },
        onOrganizaciones: (state, { payload }) => {
            state.organizaciones = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onAddOrganizacion: (state, { payload }) => {
            state.organizaciones.push(payload);
            state.activateOrganizacion = null;
            state.errores = undefined;
        },
        onUpdateOrganizacion: (state, { payload }) => {
            state.organizaciones = state.organizaciones.map((organizacion) => {
                if (organizacion.id === payload.id) {
                    return payload;
                }
                return organizacion;
            });
        },
        onDeleteOrganizacion: (state) => {
            if (state.activateOrganizacion) {
                state.organizaciones = state.organizaciones.filter(
                    (organizacion) =>
                        organizacion.id !== state.activateOrganizacion.id
                );
                state.activateOrganizacion = null;
                state.errores = undefined;
            }
        },
        onSetActivateOrganizacion: (state, { payload }) => {
            state.activateOrganizacion = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onClearOrganizaciones: (state) => {
            state.organizaciones = [];
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onOrganizaciones,
    onAddOrganizacion,
    onUpdateOrganizacion,
    onDeleteOrganizacion,
    onSetActivateOrganizacion,
    onClearOrganizaciones,
    onErrores,
} = organizacionSlice.actions;
