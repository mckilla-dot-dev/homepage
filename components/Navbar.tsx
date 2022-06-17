import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { MenuLink } from "components";

const menuItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Posts",
    href: "/posts",
  },
];

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("blue.500", "gray.900")} px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box>
            <Link href="/" passHref>
              <a>
                <Image
                  src="/logo_white.png"
                  alt="endevrs-logo"
                  height={60}
                  width={233}
                />
              </a>
            </Link>
          </Box>

          <Flex alignItems="center">
            <IconButton
              icon={<MdMenu />}
              aria-label="menu icon"
              variant="link"
              fontSize="40px"
              color="white"
              onClick={onOpen}
            />
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  Basic Drawer
                </DrawerHeader>

                <DrawerBody>
                  {menuItems.map((item) => (
                    <MenuLink key={item.label} onClose={onClose} {...item} />
                  ))}
                </DrawerBody>

                <DrawerFooter>
                  <Button onClick={toggleColorMode}>
                    {colorMode === "light" ? <FaMoon /> : <FaSun />}
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
