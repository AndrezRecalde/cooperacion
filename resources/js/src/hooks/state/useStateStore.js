import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import {
    onClearStates,
    onLoadCantones,
    onLoadCiudades,
    onLoadEstados,
    onLoadPaises,
    onLoadParroquias,
    onLoadRecintos,
} from "../../store/state/stateSlice";
import Swal from "sweetalert2";

export const useStateStore = () => {
    const { paises, estados, ciudades, cantones, parroquias, recintos } =
        useSelector((state) => state.state);

    const dispatch = useDispatch();

    const startLoadPaises = async () => {
        try {
            const { data } = await gricApi.get("/paises");
            const { paises } = data;
            dispatch(onLoadPaises(paises));
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadEstados = async (country_id) => {
        try {
            const { data } = await gricApi.post("/estados", { country_id });
            const { states } = data;
            dispatch(onLoadEstados(states));
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadCiudades = async (state_id) => {
        try {
            const { data } = await gricApi.post("/ciudades", { state_id });
            const { ciudades } = data;
            dispatch(onLoadCiudades(ciudades));
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadCantones = async () => {
        try {
            const { data } = await gricApi.get("/cantones");
            const { cantones } = data;
            dispatch(onLoadCantones(cantones));
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadParroquias = async (canton_id) => {
        try {
            const { data } = await gricApi.post("/parroquias", { canton_id });
            const { parroquias } = data;
            dispatch(onLoadParroquias(parroquias));
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const startLoadRecintos = async (parroquia_id) => {
        try {
            const { data } = await gricApi.post("/recintos", { parroquia_id });
            const { recintos } = data;
            dispatch(onLoadRecintos(recintos));
        } catch (error) {
            //console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.message : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const starClearStates = () => {
        dispatch(onClearStates());
    }

    return {
        paises,
        estados,
        ciudades,
        cantones,
        parroquias,
        recintos,

        startLoadPaises,
        startLoadEstados,
        startLoadCiudades,

        startLoadCantones,
        startLoadParroquias,
        startLoadRecintos,
        starClearStates
    };
};
