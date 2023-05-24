import { createSlice } from "@reduxjs/toolkit";

export const uiMapaSlice = createSlice({
    name: "uiMapaSlice",
    initialState: {
        isOpenDrawerMenu: false,
        isOpenDrawerOrg: false,
        isOpenModalMarker: false,
        isOpenDrawerProyectos: false,
        isOpenModalInformation: false,
        isOpenModalChart: false
    },
    reducers: {
        onOpenDrawerMenu: (state) => {
            state.isOpenDrawerMenu = true;
        },
        onCloseDrawerMenu: (state) => {
            state.isOpenDrawerMenu = false;
        },
        onOpenDrawerOrg: (state) => {
            state.isOpenDrawerOrg = true;
        },
        onCloseDrawerOrg: (state) => {
            state.isOpenDrawerOrg = false;
        },
        onOpenModalMarker: (state) => {
            state.isOpenModalMarker = true;
        },
        onCloseModalMarker: (state) => {
            state.isOpenModalMarker = false;
        },
        onOpenDrawerProyectos: (state) => {
            state.isOpenDrawerProyectos = true;
        },
        onCloseDrawerProyectos: (state) => {
            state.isOpenDrawerProyectos = false;
        },
        onOpenModalInformation: (state) => {
            state.isOpenModalInformation = true;
        },
        onCloseModalInformation: (state) => {
            state.isOpenModalInformation = false;
        },
        onOpenModalChart: (state) => {
            state.isOpenModalChart = true;
        },
        onCloseModalChart: (state) => {
            state.isOpenModalChart = false;
        }
    },
});

export const {
    onOpenDrawerMenu,
    onCloseDrawerMenu,
    onOpenDrawerOrg,
    onCloseDrawerOrg,
    onOpenModalMarker,
    onCloseModalMarker,
    onOpenDrawerProyectos,
    onCloseDrawerProyectos,
    onOpenModalInformation,
    onCloseModalInformation,
    onOpenModalChart,
    onCloseModalChart
} = uiMapaSlice.actions;
