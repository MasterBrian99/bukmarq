import { Tabs, Text } from '@mantine/core';

export default function WorkspaceSetting() {
    return (
        <Tabs defaultValue="gallery" orientation="vertical">
            <Tabs.List>
                <Tabs.Tab value="gallery">Settings</Tabs.Tab>
                <Tabs.Tab value="messages">Members</Tabs.Tab>
                <Tabs.Tab value="settings">Import</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery">

                <Text>
                    @mantine/modals package i to open a confirm modal:
                </Text>
            </Tabs.Panel>
            <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>
            <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
        </Tabs>
    );
}
