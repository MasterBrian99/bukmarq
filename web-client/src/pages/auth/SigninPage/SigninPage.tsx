import { loginAuth } from "@/api/auth";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { useSignIn } from "react-auth-kit";

import { Link, useNavigate } from "react-router-dom";
const SigninPage = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const form = useForm({
    initialValues: {
      password: "",
      username: "",
    },
  });

  const loginMutation = useMutation(loginAuth, {
    onSuccess: (res) => {
      console.log(res);
      if (
        signIn({
          token: res.jwt,
          expiresIn: 600,
          tokenType: "Bearer",
          authState: {},
        })
      ) {
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 300);
        // location.reload();
      }
    },
  });

  function submitLogin() {
    console.log(form.values);
    loginMutation.mutate({
      username: form.values.username,
      password: form.values.password,
    });
  }
  return (
    <Box>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component={Link} to={"../register"}>
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(() => submitLogin())}>
            <TextInput
              label="username"
              placeholder="Username"
              required
              {...form.getInputProps("username")}
            />
            <PasswordInput
              label="password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
            />

            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SigninPage;
