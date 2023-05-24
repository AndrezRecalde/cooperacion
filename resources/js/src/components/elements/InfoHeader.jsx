import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export const InfoHeader = ({ texto }) => {
    return (
        <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Informacion!"
            color="teal"
            mb={15}
            radius="md"
        >
            {texto}
        </Alert>
    );
};
