"use client";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const PasswordField = (props: InputProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickReveal = () => {
    onToggle();
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  };

  return (
    <FormControl>
      <FormLabel htmlFor="password">Password</FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="text"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          id="password"
          ref={inputRef}
          name="password"
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          required
          {...props}
        />
      </InputGroup>
    </FormControl>
  );
};

export default PasswordField;
