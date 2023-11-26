import { Title, Text, Button, Container, Group } from '@mantine/core';

export default function AppErrorBoundaryFallback() {
  return (
    <Container>
      <div>500</div>
      <Title>Oops. something went wrong</Title>
      <Text>Try to refresh this page or feel free to contact us if the problem persists</Text>
      <Group>
        <Button variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
