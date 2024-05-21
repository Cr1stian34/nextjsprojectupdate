"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Select,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Mi Aplicación
        </Heading>
      </Flex>

      <Spacer />

      {isMobile ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList color={"black"}>
            <MenuItem>
              <Link href="/">Inicio</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/pages/mapbox">Map Box</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/pages/rti">Tabla Ag Grid</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/pages/chartAggrid">Grafica</Link>
            </MenuItem>
            <MenuGroup title="Anime">
              <MenuItem>
                <Link href="/pages/anime">Anime Top</Link>
              </MenuItem>
              <MenuItem>
                <Link href="/pages/animeOpenings">Youtube</Link>
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      ) : (
        <Flex align="center" justify="flex-end">
          <Link href="/">
            <Button colorScheme="teal" mr={4}>
              Inicio
            </Button>
          </Link>
          <Link href="/pages/mapbox">
            <Button colorScheme="teal" mr={4}>
              Map Box
            </Button>
          </Link>
          <Link href="/pages/rti">
            <Button colorScheme="teal" mr={4}>
              Tabla Ag Grid
            </Button>
          </Link>
          <Link href="/pages/chartAggrid">
            <Button colorScheme="teal" mr={4}>
              Grafica
            </Button>
          </Link>
          <Menu>
            <MenuButton as={Button} colorScheme="teal">
              Anime
            </MenuButton>
            <MenuList>
              <MenuItem color={"black"}>
                <Link href="/pages/anime" color="black">
                  Anime
                </Link>
              </MenuItem>
              <MenuItem color={"black"}>
                <Link href="/pages/animeOpenings" color="black">
                  Anime Op
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
