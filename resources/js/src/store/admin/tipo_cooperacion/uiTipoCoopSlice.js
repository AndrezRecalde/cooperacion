import { createSlice } from "@reduxjs/toolkit";

export const uiTipoCoopSlice = createSlice({
    name: "uiTipoCoop",
    initialState: {
        isOpenModalTipoCoop: false,
    },
    reducers: {
        onOpenModalTipoCoop: (state) => {
            state.isOpenModalTipoCoop = true;
        },
        onCloseModalTipoCoop: (state) => {
            state.isOpenModalTipoCoop = false;
        },
    },
});

export const { onOpenModalTipoCoop, onCloseModalTipoCoop } =
    uiTipoCoopSlice.actions;
