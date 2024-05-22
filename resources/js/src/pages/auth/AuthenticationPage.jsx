import { rem, createStyles, Paper } from "@mantine/core";
import { AuthForm, Logo, TitlePage } from "../../components";

const useStyles = createStyles(() => ({
    wrapper: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundSize: "cover",
        backgroundImage:
            "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
    },
    wrapper_paper: {
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        maxWidth: rem(450),
    },

    title: {
        marginTop: 'auto',
        fontWeight: '700'
    }
}));

export const AuthenticationPage = () => {
    const { classes } = useStyles();

    return (
        <div className={classes.wrapper}>
            <TitlePage ta="center" className={classes.title}>
                Cooperación Internacional
            </TitlePage>
            <Logo />
            <Paper
                withBorder
                shadow="md"
                p={30}
                mt={20}
                radius="md"
                className={classes.wrapper_paper}
            >
                <AuthForm />
            </Paper>
        </div>
    );
};
