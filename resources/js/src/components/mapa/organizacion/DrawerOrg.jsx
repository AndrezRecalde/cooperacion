import { Drawer, rem, useMantineTheme } from '@mantine/core';
import { DivTitle } from '../../../components';
import { CardOrganizacion } from './CardOrganizacion';
import { useUiMapa } from '../../../hooks/mapa/useUiMapa';

export const DrawerOrg = () => {

    const theme = useMantineTheme();

    const { isOpenDrawerOrg, drawerOrg } = useUiMapa();

  return (
    <Drawer
            opened={isOpenDrawerOrg}
            onClose={() => drawerOrg(0)}
            overlayProps={{
                color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
              }}
            padding="md"
            title={<DivTitle title="Nuestros Cooperantes" fw={700} />}
            size={rem(550)}
            position="right"
        >
            <CardOrganizacion />
        </Drawer>
  )
}
