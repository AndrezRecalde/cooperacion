import { useDispatch, useSelector } from "react-redux";
import {
    onAuthenticate,
    onClearErrores,
    onLoadErrores,
    onLoading,
    onLogout,
    onProfile,
    onValidate,
} from "../../store/auth/authSlice";
import gricApi from "../../api/gricApi";
import { useErrorException } from "../error/useErrorException";

export const useAuthStore = () => {
    const { isLoading, user, profile, validate, errores } = useSelector(
        (state) => state.auth
    );

    const dispatch = useDispatch();

    const { ExceptionMessageError } = useErrorException(onLoadErrores);

    const startLogin = async ({ email, password }) => {
        try {
            dispatch(onLoading());
            const { data } = await gricApi.post("/auth/login", {
                email,
                password,
            });
            const { user, access_token } = data;
            localStorage.setItem("atf_token", access_token);
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    nombres: user.nombres,
                    apellidos: user.apellidos,
                    email: user.email,
                })
            );
            localStorage.setItem("token_init_date", new Date().getTime());
            dispatch(onAuthenticate(user));
        } catch (error) {
            console.log(error);
            error.response.data.errores
                ? dispatch(onValidate(error.response.data.errores))
                : dispatch(onLogout(error.response.data.msg));

            setTimeout(() => {
                //dispatch(onClearValidates());
                dispatch(onClearErrores());
            }, 2000);
        }
    };

    const startProfile = async () => {
        dispatch(onLoading());
        try {
            const { data } = await gricApi.get("/profile");
            const { profile } = data;
            dispatch(onProfile(profile));
        } catch (error) {
            ExceptionMessageError(error);
        }
    };

    const checkAuthToken = async () => {
        const token = localStorage.getItem("atf_token");

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await gricApi.get("/refresh");
            const { user, access_token } = data;
            localStorage.setItem("atf_token", access_token);
            localStorage.setItem("token_init_date", new Date().getTime());
            dispatch(onAuthenticate(user));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    const startLogout = async () => {
        try {
            await helpdeskApi.post("/auth/logout");
            localStorage.clear();
            dispatch(onLogout());
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    };

    return {
        isLoading,
        user,
        profile,
        validate,
        errores,

        startLogin,
        startProfile,
        checkAuthToken,
        startLogout,
    };
};
