import { UnstyledButton, Group, Avatar, Text, rem, Menu, Title, ActionIcon, Modal, Box, Button, Textarea, TextInput } from '@mantine/core';
// import { IconChevronRight } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { HiMiniChevronRight, TbDots } from '@/utils/icons';
import classes from './WorkspaceButton.module.css';
import WorkspaceCreate from '@/components/WorkspaceButton/WorkspaceCreate.tsx';
import WorkspaceSetting from '@/components/WorkspaceButton/WorkspaceSetting.tsx';

export default function WorkspaceButton() {
    const openCreateWorkspaceModal = () =>
        modals.open({
            title: 'Create new workspace',
            centered: true,
            children: (
               <>
                  <WorkspaceCreate />
               </>
            ),
        });

    const openWorkspaceSettingModal = () =>
        modals.open({
            size: 'xl',
            title: 'Workspace settings',
            centered: true,
            children: (
                <>
                    <WorkspaceSetting />
                </>
            ),
        });

    return (
   <>
       <Menu shadow="md" width="400">

           <Menu.Target>
               <UnstyledButton className={classes.user}>
                   <Group>
                       <Avatar
                         src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                         radius="xl"
                       />
                       <div style={{ flex: 1 }}>
                           <Text size="sm" fw={500}>
                               Workspace Name
                           </Text>

                           <Text c="dimmed" size="xs">
                               Workspace Description...
                           </Text>
                       </div>

                       <HiMiniChevronRight style={{ width: rem(14), height: rem(14) }} />
                   </Group>
               </UnstyledButton>
           </Menu.Target>
           <Menu.Dropdown>
               {/*<Menu.Label>*/}
               {/*    <Group justify="space-between">*/}
               {/*        Workspaces*/}
               {/*        <ActionIcon variant="transparent" aria-label="Settings">*/}
               {/*            /!*<IconAdjustments />*!/*/}
               {/*            <TbDots style={{ width: rem(14), height: rem(14) }} />*/}
               {/*        </ActionIcon>*/}

               {/*    </Group>*/}
               {/*</Menu.Label>*/}
               <Menu.Item>
                   <Group>
                       <Avatar
                         src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                         radius="xl"
                       />
                       <div style={{ flex: 1 }}>
                           <Text size="sm" fw={500}>
                               Workspace Name
                           </Text>

                           <Text c="dimmed" size="xs">
                               Workspace Description...
                           </Text>
                       </div>

                   </Group>
               </Menu.Item>
               <Menu.Divider />
               <Menu.Item onClick={openCreateWorkspaceModal}>
                   Create New Workspace
               </Menu.Item>
               <Menu.Item onClick={openWorkspaceSettingModal}>
                   Current Workspace Settings
               </Menu.Item>
               <Menu.Divider />

           </Menu.Dropdown>
       </Menu>

   </>
    );
}
