import { Image } from "@mantine/core";
import logo from "../../assets/images/logo/logo.png";

export const Logo = ({ maw = 220 }) => {
    return (
        <Image
            maw={maw}
            mx="auto"
            mt="md"
            mb="md"
            radius="xs"
            src={logo}
            alt="logo"
        />
    );
};
