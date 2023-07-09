import { Outlet } from "react-router-dom";
import {
  Box,
  Divider,
  Flex,
  Grid,
  NavLink,
  ScrollArea,
  Text,
  createStyles,
  px,
  rem,
} from "@mantine/core";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import CollectionNavItem from "./CollectionNavItem";
const useStyles = createStyles((theme) => ({
  main: {
    width: "100%",
    height: "100%",
  },
  sideBar: {
    width: `15rem`,
    height: "100%",
    top: 0,
    bottom: 0,
    position: "fixed",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
    paddingBottom: "2rem",
    border: `1px solid ${theme.colors.gray[3]}`,
  },
  header: {
    height: "20rem",
  },
  sideMain: {
    height: `calc(100% - ${"20rem"})`,
  },
}));

const navList = [
  {
    id: 1,
    label: "All bookmarks",
    icon: <AiFillStar size="1rem" stroke={1.5} />,
  },
  {
    id: 2,
    label: "Starred",
    icon: <AiFillStar size="1rem" stroke={1.5} />,
  },
  {
    id: 3,
    label: "Archived",
    icon: <AiFillStar size="1rem" stroke={1.5} />,
  },
  {
    id: 4,
    label: "Trash",
    icon: <AiFillStar size="1rem" stroke={1.5} />,
  },
  {
    id: 5,
    label: "Untagged",
    icon: <AiFillStar size="1rem" stroke={1.5} />,
  },
];

const colList = [
  {
    id: 5,
    label: "Untagged",
    icon: <AiFillStar size="1rem" stroke={1.5} />,
    children: [
      {
        id: 5,
        label: "Untagged",
        icon: <AiFillStar size="1rem" stroke={1.5} />,
      },
      {
        id: 5,
        label: "Untagged",
        icon: <AiFillStar size="1rem" stroke={1.5} />,
      },
      {
        id: 5,
        label: "Untagged",
        icon: <AiFillStar size="1rem" stroke={1.5} />,
        children: [
          {
            id: 5,
            label: "Untagged",
            icon: <AiFillStar size="1rem" stroke={1.5} />,
            children: [
              {
                id: 5,
                label: "Untagged",
                icon: <AiFillStar size="1rem" stroke={1.5} />,
              },
            ],
          },
        ],
      },
      {
        id: 5,
        label: "Untagged",
        icon: <AiFillStar size="1rem" stroke={1.5} />,
      },
      {
        id: 5,
        label: "Untagged",
        icon: <AiFillStar size="1rem" stroke={1.5} />,
      },
      {
        id: 5,
        label: "Untagged",
        icon: <AiFillStar size="1rem" stroke={1.5} />,
      },
      {
        id: 5,
        label: "Untagged",
        icon: <AiFillStar size="1rem" stroke={1.5} />,
      },
      {
        id: 5,
        label: "Untagged",
        icon: <AiFillStar size="1rem" stroke={1.5} />,
        children: [
          {
            id: 5,
            label: "Untagged",
            icon: <AiFillStar size="1rem" stroke={1.5} />,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    label: "Untagged",
    icon: <AiFillStar size="1rem" stroke={1.5} />,
  },
];
const MainLayout = () => {
  const [active, setActive] = useState(0);
  const { classes } = useStyles();
  return (
    <Box className={classes.main}>
      <Box className={classes.sideBar}>
        <Box className={classes.header}>
          <Flex justify={"center"} w={"100%"}>
            <Text size={"xl"}>Bukmarq</Text>
          </Flex>
          <Divider my="sm" mx={"sm"} />
          <Box>
            {navList.map((e) => (
              <NavLink
                key={e.id}
                active={e.id == active}
                variant="filled"
                label={e.label}
                icon={e.icon}
                onClick={() => setActive(e.id)}
              />
            ))}
          </Box>
        </Box>
        <Box
          className={classes.sideMain}
          component={ScrollArea}
          type="scroll"
          scrollbarSize={6}
        >
          <Box>
            <Box mt={"sm"} pl={"xs"}>
              <Text size={"xs"}>Collections</Text>
            </Box>
          </Box>
          {colList.map((el, i) => (
            <CollectionNavItem
              key={i}
              icon={el.icon}
              id={el.id}
              label={el.label}
            >
              {el.children}
            </CollectionNavItem>
          ))}
        </Box>
      </Box>
      <Box
        style={{
          marginLeft: "15rem",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default MainLayout;
