"use client";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
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
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
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

      <div className="lg:hidden">
        <Flex align="center" justify="flex-end">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList color={"black"}>
              <MenuItem>
                <Link href={"/"}>Inicio</Link>
              </MenuItem>
              <MenuItem>
                <Link href={"/pages/mapbox"}>Map Box</Link>
              </MenuItem>
              <MenuItem>
                <Link href={"/pages/rti"}>Tabla Ag Grid</Link>
              </MenuItem>
              <MenuItem>
                <Link href={"/pages/chartAggrid"}>Grafica</Link>
              </MenuItem>
              <MenuItem>
                <Popover trigger="hover" placement="right-start">
                  <PopoverTrigger>
                    <Box as="span" cursor="pointer">
                      Anime
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverBody className="flex flex-col">
                      <Link href={"/pages/anime"}>Anime Top</Link>
                      <Link href={"/pages/animeOpenings"}>Youtube</Link>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </div>

      <div className="hidden lg:inline-flex">
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
      </div>
    </Flex>
  );
};

export default Navbar;
