import { Menu } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export const MenuActionsAdmin = ({ row, handleEdit, handleDelete }) => {
  return (
    <>
        <Menu.Item onClick={() => handleEdit(row.original)} icon={<IconPencil />}>Editar</Menu.Item>
        {/* <Menu.Item onClick={() => handleDelete(row.original)} icon={<IconTrash />}>Elimnar</Menu.Item> */}
    </>
  )
}
