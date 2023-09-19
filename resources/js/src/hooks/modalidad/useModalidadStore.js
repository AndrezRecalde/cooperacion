import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import { onAddModalidades, onClearModalidad, onDeleteModalidad, onLoading, onModalidades, onSetActivateModalidad, onUpdateModalidad } from "../../store/admin/modalidad/modalidadSlice";
import Swal from "sweetalert2";

export const useModalidadStore = () => {
    const { isLoading, modalidades, activateModalidad, errores } = useSelector(
        (state) => state.modalidad
    );

    const dispatch = useDispatch();

    const startLoadModalidadesAdmin = async () => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get("/admin/modalidades");
            const { modalidades } = data;
            dispatch(onModalidades(modalidades));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startLoadModalidadesActivas = async () => {
        try {
            const { data } = await gricApi.get("/modalidades/activas");
            const { modalidades } = data;
            dispatch(onModalidades(modalidades));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startAddModalidad = async(modalidad) => {
        try {
            if(modalidad.id){
                const { data } = await gricApi.put(`/admin/update/modalidad/${modalidad.id}`, modalidad);
                dispatch(onUpdateModalidad({...modalidad}));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadModalidadesAdmin();
                return;
            }
            const { data } = await gricApi.post("/admin/create/modalidad", modalidad);
            dispatch(onAddModalidades({ ...modalidad }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1200,
            });
            startLoadModalidadesAdmin();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.msg
                    ? error.response.data.msg
                    : error.response.data.errores
                    ? Object.values(error.response.data.errores)
                    : error.message
                    ? error.message
                    : error,
                confirmButtonColor: "#c81d11",
            });
        }
    }

    const startDeleteModalidad = async(modalidad) => {
        Swal.fire({
            icon: "warning",
            title: "Estas seguro de eliminar?",
            showDenyButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Si",
            denyButtonText: "No",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await gricApi.delete(
                        `/admin/delete/modalidad/${modalidad.id}`
                    );
                    Swal.fire("¡Eliminado!", "", "success");
                    dispatch(onDeleteModalidad(modalidad));
                    startLoadModalidadesAdmin();
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
    }

    const setActivateModalidad = (modalidad) => {
        dispatch(onSetActivateModalidad({...modalidad}));
    }

    const setClearActivateModalidad = () => {
        dispatch(onSetActivateModalidad(null));
    }

    const startClearModalidades = () => {
        dispatch(onClearModalidad());
    }

    return {
        isLoading,
        modalidades,
        activateModalidad,
        errores,

        startLoadModalidadesAdmin,
        startLoadModalidadesActivas,
        startAddModalidad,
        startDeleteModalidad,
        setActivateModalidad,
        setClearActivateModalidad,
        startClearModalidades
    };
};
