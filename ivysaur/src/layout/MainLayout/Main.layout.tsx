import { useDisclosure } from '@mantine/hooks';
import {AppShell, Burger, Divider, Group, ScrollArea, Skeleton, Text} from '@mantine/core';
import WorkspaceButton from '@/components/WorkspaceButton/WorkspaceButton.tsx';

export default function MainLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
      <AppShell
        header={{ height: 60 }}
        navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
          }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
           <Text>logo</Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar >
          <AppShell.Section>

            <WorkspaceButton />
            <Divider/>
          </AppShell.Section>
          <AppShell.Section p="md" grow my="md" component={ScrollArea}>
            60 links in a scrollable section
            {Array(60)
                .fill(0)
                .map((_, index) => (
                    <Skeleton key={index} h={28} mt="sm" animate={false} />
                ))}
          </AppShell.Section>
          <AppShell.Section>Navbar footer – always at the bottom</AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>Main</AppShell.Main>
      </AppShell>
  );
}
