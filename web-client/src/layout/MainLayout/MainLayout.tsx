import { AppShell, Box, Flex, NavLink, Navbar } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsBookmarkStarFill } from "react-icons/bs";
import { BsFillArchiveFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsTagsFill } from "react-icons/bs";
import CollectionItem from "./CollectionItem";
import { navLinkActiveState } from "@/store/atom";
import { useRecoilState } from "recoil";

const navList = [
  {
    id: 1,
    label: "All bookmarks",
    icon: <BsBookmarkStarFill size="1rem" stroke={1.5} />,
    path: "/all",
  },
  {
    id: 2,
    label: "Starred",
    icon: <AiFillStar size="1rem" stroke={1.5} />,
    path: "/starred",
  },
  {
    id: 3,
    label: "Archived",
    icon: <BsFillArchiveFill size="1rem" stroke={1.5} />,
    path: "/archived",
  },
  {
    id: 4,
    label: "Trash",
    icon: <BsFillTrashFill size="1rem" stroke={1.5} />,
    path: "/trash",
  },
  {
    id: 5,
    label: "Untagged",
    icon: <BsTagsFill size="1rem" stroke={1.5} />,
    path: "/untagged",
  },
];

const MainLayout = () => {
  const [navLink, setNavLink] = useRecoilState(navLinkActiveState);

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
          <Flex direction={"column"} mt={"lg"}>
            {navList.map((el) => (
              <NavLink
                key={el.id}
                label={el.label}
                icon={el.icon}
                onClick={() => setNavLink(el.path)}
                variant={"filled"}
                component={Link}
                to={el.path}
                active={navLink == el.path}
              />
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
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
          padding: 0,
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
