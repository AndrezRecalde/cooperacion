import {
    Container,
    Group,
    Image,
    Title,
    createStyles,
    rem,
} from "@mantine/core";
import { FormAfiliacion } from "./form/FormAfiliacion";
import logo from "../../assets/images/logo/LogoGadpe.png";

const useStyles = createStyles((theme) => ({
    titleSection: {
        lineHeight: 1,
        fontWeight: 900,
        textAlign: "center",
        marginTop: theme.spacing.xl,
    },

    highlight: {
        backgroundColor: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
        }).background,
        padding: rem(5),
        paddingTop: 0,
        borderRadius: theme.radius.sm,
        display: "inline-block",
        color: theme.colorScheme === "dark" ? theme.white : "inherit",
    },
}));

export const SectionAfiliacion = () => {
    const { classes } = useStyles();

    return (
        <Container size="md" py="xl">
            <Group position="center">
                <Image
                    maw={180}
                    mx="auto"
                    radius="md"
                    src={logo}
                    alt="Random image"
                />
            </Group>

            <Title tt="uppercase" className={classes.titleSection} order={3}>
                Formulario de{" "}
                <span className={classes.highlight}>Inscripción</span>{" "}
            </Title>

            <FormAfiliacion />
        </Container>
    );
};
