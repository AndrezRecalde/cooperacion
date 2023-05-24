import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState: {
        isLoading: false,
        usuarios: [],
        activateUsuario: null,
        errores: undefined,
    },
    reducers: {
        onLoading: (state) => {
            state.isLoading = true;
            state.errores = undefined;
        },
        onUsuarios: (state, { payload }) => {
            state.usuarios = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onAddUsuario: (state, { payload }) => {
            state.usuarios.push(payload);
            state.activateUsuario = null;
            state.errores = undefined;
        },
        onUpdateUsuario: (state, { payload }) => {
            state.usuarios = state.usuarios.map((usuario) => {
                if (usuario.id === payload.id) {
                    return payload;
                }
                return usuario;
            });
        },
        onDeleteUsuario: (state) => {
            if (state.activateUsuario) {
                state.usuarios = state.usuarios.filter(
                    (usuario) => usuario.id !== state.activateUsuario.id
                );
                state.activateUsuario = null;
                state.errores = undefined;
            }
        },
        onSetActivateUsuario: (state, { payload }) => {
            state.activateUsuario = payload;
            state.errores = undefined;
            state.isLoading = false;
        },
        onErrores: (state, { payload }) => {
            state.errores = payload;
        },
        onClearUsuarios: (state) => {
            state.usuarios = [];
            state.activateUsuario = null;
            state.errores = undefined;
        }
    },
});

export const {
    onLoading,
    onUsuarios,
    onAddUsuario,
    onUpdateUsuario,
    onDeleteUsuario,
    onSetActivateUsuario,
    onErrores,
    onClearUsuarios
} = usuarioSlice.actions;
