import { createSlice } from "@reduxjs/toolkit";

export const uiPeriodoSlice = createSlice({
    name: "uiPeriodo",
    initialState: {
        isOpenModalPeriodo: false,
    },
    reducers: {
        onOpenModalPeriodo: (state) => {
            state.isOpenModalPeriodo = true;
        },
        onCloseModalPeriodo: (state) => {
            state.isOpenModalPeriodo = false;
        },
    },
});

export const { onOpenModalPeriodo, onCloseModalPeriodo } =
    uiPeriodoSlice.actions;
