import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  PaperProps,
  Box,
  Flex,
  Container,
  Title,
} from '@mantine/core';

export default function LoginPage() {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });
  return (
    <Container size={420} my={40} mt={50}>
      <Title ta="center">Welcome!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {type === 'register' ? ' Already have an account?' : "Don't have an account?"}{' '}
        <Anchor size="sm" component="button" onClick={() => toggle()}>
          {type === 'register' ? 'Login' : 'Create account'}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Username" placeholder="abcd" required />
        {type === 'register' && <TextInput mt="md" label="Email" placeholder="you@mantine.dev" />}

        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl">
          Sign {type === 'register' ? 'up' : 'in'}
        </Button>
      </Paper>
    </Container>
  );
}
