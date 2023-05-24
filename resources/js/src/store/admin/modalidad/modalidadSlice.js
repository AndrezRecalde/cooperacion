import { createSlice } from "@reduxjs/toolkit";

export const modalidadSlice = createSlice({
    name: "modalidad",
    initialState: {
        isLoading: false,
        modalidades: [],
        activateModalidad: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading  = true;
        },
        onModalidades: (state, { payload }) => {
            state.modalidades = payload;
            state.isLoading = false;
        },
        onAddModalidades: (state, { payload }) => {
            state.modalidades.push(payload);
            (state.activateModalidad = null), (state.errores = undefined);
        },
        onUpdateModalidad: (state, { payload }) => {
            state.modalidades = state.modalidades.map((modalidad) => {
                if (modalidad.id === payload.id) {
                    return payload;
                }
                return modalidad;
            });
        },
        onDeleteModalidad: (state) => {
            if (state.activateModalidad) {
                state.modalidades = state.modalidades.filter(
                    (modalidad) => modalidad.id !== state.activateModalidad.id
                );
                state.activateModalidad = null;
                state.errores = undefined;
            }
        },
        onSetActivateModalidad: (state, { payload }) => {
            state.activateModalidad = payload;
            state.errores = undefined;
        },
        onClearModalidad: (state) => {
            state.modalidades = [];
            state.errores = undefined;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
    },
});

export const {
    onLoading,
    onModalidades,
    onAddModalidades,
    onUpdateModalidad,
    onDeleteModalidad,
    onSetActivateModalidad,
    onClearModalidad,
    onErrores,
} = modalidadSlice.actions;
