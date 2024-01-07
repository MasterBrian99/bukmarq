import { Button, Textarea, TextInput } from '@mantine/core';

export default function WorkspaceCreate() {
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
