import { createSlice } from "@reduxjs/toolkit";

export const uiTipoSlice = createSlice({
    name: "uiTipo",
    initialState: {
        isOpenModalTipo: false,
    },
    reducers: {
        onOpenModalTipo: (state) => {
            state.isOpenModalTipo = true;
        },
        onCloseModalTipo: (state) => {
            state.isOpenModalTipo = false;
        },
    },
});

export const { onOpenModalTipo, onCloseModalTipo } = uiTipoSlice.actions;
