import { Menu } from "@mantine/core";
import { IconFileCertificate, IconPencil, IconTrash } from "@tabler/icons-react";

export const ActionsProyecto = ({ row, handleCertificate, handleEdit, handleDelete }) => {
    return (
        <>
            <Menu.Item onClick={() => handleCertificate(row.original.id)} icon={<IconFileCertificate />}>Ver Documento</Menu.Item>
            <Menu.Item onClick={() => handleEdit(row.original)} icon={<IconPencil />}>Editar</Menu.Item>
            <Menu.Item onClick={() => handleDelete(row.original)} icon={<IconTrash />}>Elimnar</Menu.Item>
        </>
    );
};
