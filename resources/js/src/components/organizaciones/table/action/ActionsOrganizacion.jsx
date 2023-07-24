import { Menu } from "@mantine/core";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";

export const ActionsOrganizacion = ({ row, handleShow, handleEdit, handleDelete }) => {
  return (
    <>
    <Menu.Item onClick={() => handleShow(row.original.id)} icon={<IconEye />}>Ver</Menu.Item>
    <Menu.Item onClick={() => handleEdit(row.original)} icon={<IconPencil />}>Editar</Menu.Item>
    <Menu.Item onClick={() => handleDelete(row.original)} icon={<IconTrash />}>Elimnar</Menu.Item>
</>
  )
}
