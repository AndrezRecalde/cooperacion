import { Text } from "@mantine/core";

export const TitleCard = ({ title, fz = "sm" }) => {
    return (
        <Text tt="uppercase" fz={fz} fw={700}>
            {title}
        </Text>
    );
};
