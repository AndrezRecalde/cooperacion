import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import {
    onActivateMarker,
    onClearActivateMarker,
    onClearProyectoMarkers,
    onErroresMarker,
    onLoadOrgMarkers,
    onLoadPoints,
    onLoadProyectosMarkers,
} from "../../store/mapa/marker/markerSlice";
import Swal from "sweetalert2";

export const useMarkerStore = () => {
    const {
        proyectosMarkers,
        organizacionesMarkers,
        activateMarker,
        errores,
        initialPoints,
        isLoading
    } = useSelector((state) => state.marker);

    const dispatch = useDispatch();

    const startLoadMarkersProyectos = async () => {
        try {
            const { data } = await gricApi.get("/proyectos/activos");
            const { proyectos } = data;
            dispatch(onLoadProyectosMarkers(proyectos));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadMarkersOrg = async () => {
        try {
            const { data } = await gricApi.get("/organizaciones/activas");
            const { organizaciones } = data;
            dispatch(onLoadOrgMarkers(organizaciones));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const setActiveMarker = (marker) => {
        dispatch(onActivateMarker(marker));
    };

    const startClearActivateMarker = () => {
        dispatch(onClearActivateMarker());
    }

    const startLoadPoints = async (point_id = 2) => {
        try {
            const { data } = await gricApi.post("points", { point_id });
            const { points } = data;
            dispatch(onLoadPoints(points));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };


    const startClearProyectoMarkers = () => {
        dispatch(onClearProyectoMarkers());
    };

    const startOnSearch = async (values) => {
        startClearProyectoMarkers();
        try {
            const { data } = await gricApi.post("/proyecto/search", values);
            if (data.msg) {
                dispatch(onErroresMarker(data.msg));
            } else {
                const { proyectos } = data;
                dispatch(onLoadProyectosMarkers(proyectos));
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    return {
        proyectosMarkers,
        organizacionesMarkers,
        activateMarker,
        errores,
        initialPoints,
        isLoading,

        startLoadMarkersProyectos,
        startLoadMarkersOrg,
        setActiveMarker,
        startClearActivateMarker,
        startLoadPoints,
        startClearProyectoMarkers,
        startOnSearch,
    };
};
