import { createSlice } from "@reduxjs/toolkit";

export const uiAfiliacionSlice = createSlice({
    name: "uiAfiliacion",
    initialState: {
        isOpenModalAfiActivo: false,
    },
    reducers: {
        onOpenModalAfiActivo: (state) => {
            state.isOpenModalAfiActivo = true;
        },
        onCloseModalAfiActivo: (state) => {
            state.isOpenModalAfiActivo = false;
        },
    },
});

export const { onOpenModalAfiActivo, onCloseModalAfiActivo } =
    uiAfiliacionSlice.actions;
