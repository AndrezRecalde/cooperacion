import { Text } from "@mantine/core";

export const TitleSections = ({
    color = "dimmed",
    tt = "uppercase",
    fw,
    fz = 14,
    ta = "left",
    title,
}) => {
    return (
        <Text c={color} fz={fz} tt={tt} ta={ta} fw={fw}>
            {title}
        </Text>
    );
};
