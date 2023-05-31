import {
    createStyles,
    Container,
    Title,
    Text,
    Button,
    rem,
} from "@mantine/core";
import { SectionAfiliacion } from "../../components/afiliacion/SectionAfiliacion";
import { useNavigate } from "react-router-dom";
import { IconWorld } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: "#11284b",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
            "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/05/afiliacion-scaled.jpg)",
        paddingTop: `calc(${theme.spacing.xl} * 3)`,
        paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },

    inner: {
        display: "flex",
        justifyContent: "space-between",

        [theme.fn.smallerThan("md")]: {
            flexDirection: "column",
        },
    },

    image: {
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },

    content: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan("md")]: {
            marginRight: 0,
        },
    },

    title: {
        color: theme.white,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        lineHeight: 1.05,
        maxWidth: rem(500),
        fontSize: rem(48),

        [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
            fontSize: rem(34),
            lineHeight: 1.15,
        },
    },

    description: {
        color: theme.white,
        opacity: 0.75,
        maxWidth: rem(500),

        [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
        },
    },

    control: {
        paddingLeft: rem(50),
        paddingRight: rem(50),
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(22),

        [theme.fn.smallerThan("md")]: {
            width: "100%",
        },
    },
}));

export const AfiliacionPage = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();

    const handleRedirectMapa = () => {
        navigate("/cooperacion");
    };

    return (
        <>
            <div className={classes.root}>
                <Container size="lg">
                    <div className={classes.inner}>
                        <div className={classes.content}>
                            <Title className={classes.title}>
                                Únete a nuestra{" "}
                                <Text
                                    component="span"
                                    inherit
                                    variant="gradient"
                                    gradient={{
                                        from: "teal",
                                        to: "lime",
                                        deg: 105,
                                    }}
                                >
                                    Red de Afiliados
                                </Text>{" "}
                                {/* React components library */}
                            </Title>

                            <Text className={classes.description} mt={30}>
                                La Red de Afiliación del Gobierno Autonomo
                                Descentralizado de la Provincia de Esmeraldas es
                                una estrategia para mantener relaciones
                                estratégicas que amplien el desarrollo económico
                                de la provincia de Esmeraldas.
                            </Text>

                            <Button
                                variant="gradient"
                                gradient={{
                                    from: "teal",
                                    to: "lime",
                                    deg: 105,
                                }}
                                size="xl"
                                mt={40}
                                className={classes.control}
                                leftIcon={<IconWorld />}
                                onClick={handleRedirectMapa}
                            >
                                Ver Mapa
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
            <SectionAfiliacion />
        </>
    );
};
