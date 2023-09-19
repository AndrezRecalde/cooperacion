import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export const InfoHeader = ({ texto }) => {
    return (
        <Alert
            icon={<IconAlertCircle size="2rem" />}
            title="Informacion!"
            color="teal.7"
            mt={15}
            mb={15}
            radius="md"
        >
            {texto}
        </Alert>
    );
};
