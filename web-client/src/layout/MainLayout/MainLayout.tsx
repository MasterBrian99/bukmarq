import {AppShell, Box, Flex, NavLink, Navbar, Title, ActionIcon, useMantineColorScheme} from "@mantine/core";
import {Link, Outlet} from "react-router-dom";
import {AiFillStar} from "react-icons/ai";
import {BsBookmarkStarFill, BsFillSunFill} from "react-icons/bs";
import {BsFillArchiveFill} from "react-icons/bs";
import {BsFillTrashFill} from "react-icons/bs";
import {BsTagsFill} from "react-icons/bs";
import CollectionItem from "./CollectionItem";
import {navLinkActiveState} from "@/store/atom";
import {useRecoilState} from "recoil";
import {BiSolidMoon} from "react-icons/bi";

const navList = [
    {
        id: 1,
        label: "All bookmarks",
        icon: <BsBookmarkStarFill size="1rem" stroke={1.5}/>,
        path: "/all",
    },
    {
        id: 2,
        label: "Starred",
        icon: <AiFillStar size="1rem" stroke={1.5}/>,
        path: "/starred",
    },
    {
        id: 3,
        label: "Archived",
        icon: <BsFillArchiveFill size="1rem" stroke={1.5}/>,
        path: "/archived",
    },
    {
        id: 4,
        label: "Trash",
        icon: <BsFillTrashFill size="1rem" stroke={1.5}/>,
        path: "/trash",
    },
    {
        id: 5,
        label: "Untagged",
        icon: <BsTagsFill size="1rem" stroke={1.5}/>,
        path: "/untagged",
    },
];

const MainLayout = () => {
    const [navLink, setNavLink] = useRecoilState(navLinkActiveState);
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <AppShell

            padding="md"
            navbar={
                <Navbar mr={260}
                        px={"xs"}
                        width={{base: 260}}
                        height={"100%"}
                        styles={(theme) => ({
                            root: {
                                backgroundColor:
                                    theme.colorScheme === "dark"
                                        ? theme.colors.dark[8]
                                        : theme.colors.gray[0],
                            },
                        })}>
                    <Navbar.Section>
                        <Flex px={'xs'} pt={'sm'} align={'center'} justify={'space-between'}>
                            <Title order={3}>Bookmarq</Title>
                            <ActionIcon variant="default"   onClick={() => toggleColorScheme()}    title="Toggle color scheme">
                                {dark ? <BsFillSunFill size="1.1rem" /> : <BiSolidMoon size="1.1rem" />}

                              </ActionIcon>
                        </Flex>
                    </Navbar.Section>
                    <Navbar.Section grow mt="md">
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
                                <CollectionItem/>
                            </Box>
                        </Box>
                    </Navbar.Section>
                    <Navbar.Section>{/* Footer with user */}asd</Navbar.Section>
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
                <Outlet/>
            </div>
        </AppShell>
    );
};

export default MainLayout;
