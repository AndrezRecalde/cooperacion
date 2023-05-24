import { Text } from '@mantine/core'

export const DivTitle = ({ title, fw = 500, fz = "xs" }) => {

  return (
    <Text tt="uppercase" fw={fw} fz={fz} c="dimmed">{title}</Text>
  )
}
