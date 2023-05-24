import { createSlice } from "@reduxjs/toolkit";

export const uiModalidadSlice = createSlice({
    name: "uiModalidad",
    initialState: {
        isOpenModalidad: false,
    },
    reducers: {
        onOpenModalModalidad: (state) => {
            state.isOpenModalidad = true;
        },
        onCloseModalModalidad: (state) => {
            state.isOpenModalidad = false;
        },
    },
});

export const { onOpenModalModalidad, onCloseModalModalidad } = uiModalidadSlice.actions;
