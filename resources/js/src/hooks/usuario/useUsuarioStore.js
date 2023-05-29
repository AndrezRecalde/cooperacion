import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import {
    onAddUsuario,
    onClearUsuarios,
    onLoading,
    onSetActivateEstado,
    onUpdateUsuario,
    onUsuarios,
} from "../../store/admin/usuario/usuarioSlice";
import Swal from "sweetalert2";
import { onSetActivateUsuario } from "../../store/admin/usuario/usuarioSlice";

export const useUsuarioStore = () => {
    const { isLoading, usuarios, activateUsuario, activateEstado, errores } =
        useSelector((state) => state.usuario);

    const dispatch = useDispatch();

    const startLoadUsuarios = async () => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get("/usuarios");
            const { usuarios } = data;
            dispatch(onUsuarios(usuarios));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddUsuario = async (usuario) => {
        try {
            if (usuario.id) {
                const { data } = await gricApi.put(
                    `/admin/update/usuario/${usuario.id}`,
                    usuario
                );
                dispatch(onUpdateUsuario({ ...usuario }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadUsuarios();
                return;
            }
            const { data } = await gricApi.post(
                "/admin/create/usuario",
                usuario
            );
            dispatch(onAddUsuario({ ...usuario }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadUsuarios();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startUpdateActivo = async (usuario) => {
        try {
            const { data } = await gricApi.put(
                `/admin/update/usuario/activo/${usuario.id}`,
                usuario
            );
            dispatch(onUpdateUsuario({ ...usuario }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadUsuarios();
            setClearActivateEstado();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startShowForEdit = async ({ id }) => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get(
                `/admin/show/edit/usuario/${id}`
            );
            const { usuario } = data;
            dispatch(onSetActivateUsuario({ ...usuario }));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setActivateUsuario = (usuario) => {
        dispatch(onSetActivateUsuario({ ...usuario }));
    };

    const setActivateEstado = (usuario) => {
        dispatch(onSetActivateEstado(usuario));
    };

    const startDeleteUsuario = async (usuario) => {
        Swal.fire({
            icon: "warning",
            title: `Estas seguro de eliminar ${usuario.nombres}?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await gricApi.delete(`/admin/delete/usuario/${usuario.id}`);
                    Swal.fire("¡Eliminado!", "", "success");
                    startLoadUsuarios();
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response ? error.response.data.msg : error,
                        confirmButtonColor: "#c81d11",
                    });
                }
            }
        });
    };

    const startUpdatePassword = async (usuario, password) => {
        Swal.fire({
            icon: "warning",
            title: `¿Estas seguro de cambiar la contraseña?`,
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const { data } = await gricApi.put(
                        `/admin/update/usuario/password/${usuario.id}`,
                        { password }
                    );
                    Swal.fire({
                        icon: "success",
                        title: data.msg,
                        showConfirmButton: false,
                        timer: 1000,
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response ? error.response.data.msg : error,
                        confirmButtonColor: "#c81d11",
                    });
                }
            }
        });
    };

    const startClearUsuarios = () => {
        dispatch(onClearUsuarios());
    };

    const setClearActivateUsuario = () => {
        dispatch(onSetActivateUsuario(null));
    };

    const setClearActivateEstado = () => {
        dispatch(onSetActivateEstado(null));
    }

    return {
        isLoading,
        usuarios,
        activateUsuario,
        activateEstado,
        errores,

        startLoadUsuarios,
        startAddUsuario,
        startUpdateActivo,
        startShowForEdit,
        setActivateUsuario,
        setActivateEstado,
        startDeleteUsuario,
        startUpdatePassword,
        startClearUsuarios,
        setClearActivateUsuario,
        setClearActivateEstado
    };
};
