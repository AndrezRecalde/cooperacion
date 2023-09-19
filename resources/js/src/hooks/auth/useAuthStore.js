import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import { onAuthenticate, onLoading, onLogout, onProfile } from "../../store/auth/authSlice";
import { clearErrores } from "../../store/auth/authSlice";
import Swal from "sweetalert2";

export const useAuthStore = () => {
    const { isLoading, user, profile, errores } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        try {
            const { data } = await gricApi.post("/auth/login", { email, password });
            const { user } = data;
            localStorage.setItem("atf_token", data.access_token);
            localStorage.setItem("profile", JSON.stringify({ nombres: user.nombres, apellidos: user.apellidos, email: user.email }));
            localStorage.setItem("token_init_date", new Date().getTime());
            dispatch(onAuthenticate(user));
        } catch (error) {
            dispatch(onLogout(error.response.data.msg));
            setTimeout(() => {
                dispatch(clearErrores());
            }, 10);
        }
    }

    const startProfile = async() => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get("/profile");
            const { profile } = data;
            dispatch(onProfile(profile));
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

    const checkAuthToken = async () => {
        const token = localStorage.getItem("atf_token");

        if(!token) return dispatch(onLogout());

        try {
            const { data } = await gricApi.get("/refresh");
            const { user } = data;
            localStorage.setItem("atf_token", data.access_token);
            localStorage.setItem("token_init_date", new Date().getTime());
            dispatch(onAuthenticate(user));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        isLoading,
        user,
        profile,
        errores,

        startLogin,
        startProfile,
        checkAuthToken,
        startLogout
    };
};
