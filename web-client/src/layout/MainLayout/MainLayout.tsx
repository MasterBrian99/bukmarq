import {
  AppShell,
  Box,
  Button,
  Flex,
  Header,
  NavLink,
  Navbar,
  Text,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsBookmarkStarFill } from "react-icons/bs";
import { BsFillArchiveFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsTagsFill } from "react-icons/bs";
import { useState } from "react";
import CollectionItem from "./CollectionItem";

const navList = [
  {
    id: 1,
    label: "All bookmarks",
    icon: <BsBookmarkStarFill size="1rem" stroke={1.5} />,
  },
  {
    id: 2,
    label: "Starred",
    icon: <AiFillStar size="1rem" stroke={1.5} />,
  },
  {
    id: 3,
    label: "Archived",
    icon: <BsFillArchiveFill size="1rem" stroke={1.5} />,
  },
  {
    id: 4,
    label: "Trash",
    icon: <BsFillTrashFill size="1rem" stroke={1.5} />,
  },
  {
    id: 5,
    label: "Untagged",
    icon: <BsTagsFill size="1rem" stroke={1.5} />,
  },
];

const MainLayout = () => {
  const [currentActive, setCurrentActive] = useState(0);
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar
          px={"xs"}
          width={{ base: 260 }}
          height={"100%"}
          styles={(theme) => ({
            root: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[1],
            },
          })}
        >
          {/* Navbar content */}
          <Flex direction={"column"} mt={"lg"}>
            {navList.map((el, i) => (
              <Button
                color="gray"
                variant={currentActive == el.id ? "default" : "subtle"}
                leftIcon={el.icon}
                my={"2px"}
                key={el.id}
                onClick={() => setCurrentActive(el.id)}
                styles={(theme) => ({
                  root: {
                    border: 0,
                    "&:active": {
                      transform: "none",
                    },
                    color: "#000",
                    fontWeight: currentActive == el.id ? "bold" : "normal",
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  },

                  leftIcon: {
                    marginRight: theme.spacing.md,
                  },
                })}
              >
                {el.label}
              </Button>
            ))}
          </Flex>
          <Box>
            <Box>
              <CollectionItem />
            </Box>
          </Box>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        },
      })}
    >
      <div>
        <Outlet />
      </div>
    </AppShell>
  );
};

export default MainLayout;
