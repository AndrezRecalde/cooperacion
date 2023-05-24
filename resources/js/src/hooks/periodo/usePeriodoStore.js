import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import {
    onAddPeriodo,
    onPeriodos,
    onSetActivatePeriodo,
    onUpdatePeriodo,
} from "../../store/admin/periodo/periodoSlice";
import Swal from "sweetalert2";

export const usePeriodoStore = () => {
    const { isLoading, periodos, activatePeriodo, errores } = useSelector(
        (state) => state.periodo
    );

    const dispatch = useDispatch();

    const startLoadPeriodosAdmin = async () => {
        try {
            const { data } = await gricApi.get("/admin/periodos");
            const { periodos } = data;
            dispatch(onPeriodos(periodos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadPeriodos = async () => {
        try {
            const { data } = await gricApi.get("/periodos");
            const { periodos } = data;
            dispatch(onPeriodos(periodos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startAddPeriodo = async (periodo) => {
        try {
            if (periodo.id) {
                const { data } = await gricApi.put(
                    `/admin/update/periodo/${periodo.id}`,
                    periodo
                );
                dispatch(onUpdatePeriodo({ ...periodo }));
                Swal.fire({
                    icon: "success",
                    title: data.msg,
                    showConfirmButton: false,
                    timer: 1000,
                });
                startLoadPeriodosAdmin();
                return;
            }
            const { data } = await gricApi.post(
                "/admin/create/periodo",
                periodo
            );
            dispatch(onAddPeriodo({ ...periodo }));
            Swal.fire({
                icon: "success",
                title: data.msg,
                showConfirmButton: false,
                timer: 1000,
            });
            startLoadPeriodosAdmin();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setActivatePeriodo = (periodo) => {
        dispatch(onSetActivatePeriodo({ ...periodo }));
    };
    const setClearActivatePeriodo = () => {
        dispatch(onSetActivatePeriodo(null));
    };

    return {
        isLoading,
        periodos,
        activatePeriodo,
        errores,

        startLoadPeriodos,
        startLoadPeriodosAdmin,
        startAddPeriodo,
        setActivatePeriodo,
        setClearActivatePeriodo,
    };
};
