import { createSlice } from "@reduxjs/toolkit";

export const uiOrganizacionSlice = createSlice({
    name: "uiOrganizacion",
    initialState: {
        isOpenModalAddOrg: false,
        isOpenModalShowOrg: false,
        isOpenModalOrgActivo: false,
    },
    reducers: {
        onOpenModalOrg: (state) => {
            state.isOpenModalAddOrg = true;
        },
        onCloseModalOrg: (state) => {
            state.isOpenModalAddOrg = false;
        },
        onOpenModalShowOrg: (state) => {
            state.isOpenModalShowOrg = true;
        },
        onCloseModalShowOrg: (state) => {
            state.isOpenModalShowOrg = false;
        },
        onOpenModalOrgActivo: (state) => {
            state.isOpenModalOrgActivo = true;
        },
        onCloseModalOrgActivo: (state) => {
            state.isOpenModalOrgActivo = false;
        },
    },
});

export const {
    onOpenModalOrg,
    onCloseModalOrg,
    onOpenModalShowOrg,
    onCloseModalShowOrg,
    onOpenModalOrgActivo,
    onCloseModalOrgActivo,
} = uiOrganizacionSlice.actions;
