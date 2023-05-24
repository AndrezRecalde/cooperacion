import { Text, Title } from "@mantine/core"

export const DivHeader = ({ saludo, usuario }) => {
  return (
    <Title order={4} mt={15}>{saludo}<Text span c="blue"  inherit>{usuario.toString()}</Text></Title>
  )
}
