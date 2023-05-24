import { createSlice } from "@reduxjs/toolkit";

export const uiInternacionalSlice = createSlice({
    name: "uiInternacional",
    initialState: {
        isOpenModalInternacional: false,
    },
    reducers: {
        onOpenModalInternacional: (state) => {
            state.isOpenModalInternacional = true;
        },
        onCloseModalInternacional: (state) => {
            state.isOpenModalInternacional = false;
        },
    },
});

export const { onOpenModalInternacional, onCloseModalInternacional } =
    uiInternacionalSlice.actions;
