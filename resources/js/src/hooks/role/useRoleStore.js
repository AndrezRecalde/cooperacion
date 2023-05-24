import { useDispatch, useSelector } from "react-redux";
import gricApi from "../../api/gricApi";
import { onClearRoles, onLoadRoles } from "../../store/admin/role/roleSlice";
import Swal from "sweetalert2";

export const useRoleStore = () => {
    const { roles } = useSelector((state) => state.role);
    const dispatch = useDispatch();

    const startLoadRoles = async () => {
        try {
            const { data } = await gricApi.get("/roles");
            const { roles } = data;
            dispatch(onLoadRoles(roles));
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response ? error.response.data.msg : error,
                confirmButtonColor: "#c81d11",
            });
        }
    };

    const clearRoles = () => {
        dispatch(onClearRoles());
    };

    return {
        roles,

        startLoadRoles,
        clearRoles,
    };
};
