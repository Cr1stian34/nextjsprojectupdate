"use client";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useRef } from "react";
import { Logo } from "./common/Logo";
import { OAuthButtonGroup } from "./common/OAuthButtonGroup";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ILogin } from "./interfaces/ILogin";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email().nonempty("obligatorio"),
  password: z
    .string()
    .min(6, "La contraseña debe de tener mas de 6 caracteres"),
});

const HomePage = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ILogin>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  const onSubmit = (e: ILogin) => {
    console.log("datos form=>", e);
    if (
      e.email === "cristian.muyudumbay@gmail.com" &&
      e.password === "3021524c"
    ) {
      toast({
        status: "success",
        duration: 3000,
        title: "Datos correctos",
        description: "Session iniciada",
        isClosable: true,
      });
      reset();
    } else {
      toast({
        status: "error",
        duration: 3000,
        title: "Datos incorrectos",
        description: "Session fallida",
        isClosable: true,
      });
    }
  };
  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>
              Login de tu cuenta
            </Heading>
            <Text color="fg.muted">
              No tienes una cuenta? <Link href="#">Registrate</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg.surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="5">
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...register("email")}
                    type="text"
                    placeholder="Email..."
                  />
                  <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                {/* <PasswordField /> */}
                <FormControl isInvalid={!!errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <InputRightElement>
                      <IconButton
                        variant="text"
                        aria-label={
                          isOpen ? "Mask password" : "Reveal password"
                        }
                        icon={isOpen ? <HiEyeOff /> : <HiEye />}
                        onClick={onClickReveal}
                      />
                    </InputRightElement>
                    <Input
                      type={isOpen ? "text" : "password"}
                      autoComplete="current-password"
                      {...register("password")}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <HStack justify={"space-between"}>
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button variant={"text"} size={"sm"}>
                  Olivisate tu contraseña
                </Button>
              </HStack>
              <Stack spacing={"6"}>
                <Button colorScheme="blue" type="submit">
                  Singn in
                </Button>
                <HStack>
                  <Divider />
                  <Text
                    textStyle={"sm"}
                    whiteSpace={"nowrap"}
                    color={"fg.muted"}
                  >
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default HomePage;
