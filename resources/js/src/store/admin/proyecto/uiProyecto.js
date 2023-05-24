import { createSlice } from "@reduxjs/toolkit";

export const uiProyecto = createSlice({
    name: "uiProyecto",
    initialState: {
        isOpenModalProyecto: false,
        isOpenModalProyectoActivo: false,
        isOpenModalDeleteProyecto: false,
    },
    reducers: {
        onOpenModalProyecto: (state) => {
            state.isOpenModalProyecto = true;
        },
        onCloseModalProyecto: (state) => {
            state.isOpenModalProyecto = false;
        },
        onOpenModalProyectoActivo: (state) => {
            state.isOpenModalProyectoActivo = true;
        },
        onCloseModalProyectoActivo: (state) => {
            state.isOpenModalProyectoActivo = false;
        },
        onOpenModalProyectoDelete: (state) => {
            state.isOpenModalDeleteProyecto = true;
        },
        onCloseModalProyectoDelete: (state) => {
            state.isOpenModalDeleteProyecto = false;
        }
    },
});

export const {
    onOpenModalProyecto,
    onCloseModalProyecto,
    onOpenModalProyectoActivo,
    onCloseModalProyectoActivo,
    onOpenModalProyectoDelete,
    onCloseModalProyectoDelete
} = uiProyecto.actions;
