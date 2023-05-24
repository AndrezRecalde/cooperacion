import { createSlice } from "@reduxjs/toolkit";

export const grupoAtencionSlice = createSlice({
    name: "grupoAtencion",
    initialState: {
        grupos_atencion: [],
    },
    reducers: {
        onLoadGruposAtencion: (state, { payload }) => {
            state.grupos_atencion = payload;
        },
        onClearGruposAtencion: (state) => {
            state.grupos_atencion = [];
        },
    },
});

export const { onLoadGruposAtencion, onClearGruposAtencion } =
    grupoAtencionSlice.actions;
