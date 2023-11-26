import { Button, Group, Menu, Modal, Textarea, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function WorkspaceCreate() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
                <TextInput
                  label="Workspace Name"
                  placeholder="Workspace Name"
                  required
                />
                <Textarea
                  mt="md"
                  label="Workspace Description"
                  placeholder="Workspace Description"
                />
                <Button fullWidth mt="md">
                    Create Workspace
                </Button>

        </>
    );
}
