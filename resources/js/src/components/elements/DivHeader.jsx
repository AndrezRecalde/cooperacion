import { Text, Title } from "@mantine/core";

export const DivHeader = ({ saludo, usuario }) => {
    return (
        <Title order={3} mt={20} mb={20}>
            {saludo}
            <Text fs="italic" span c="teal.5" inherit>
                {usuario.toString()}
            </Text>
        </Title>
    );
};
