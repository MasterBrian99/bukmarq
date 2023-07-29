import {
  CollectionChild,
  CollectionTree,
  getAllCollections,
} from "@/api/collection";
import { navLinkActiveState } from "@/store/atom";
import { hasChildren } from "@/utils/util";
import { Box, Button, NavLink, Text } from "@mantine/core";
import React, { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
const CollectionItem = () => {
  const collectionQuery = useQuery<CollectionTree>({
    queryKey: "collection_list",
    queryFn: () => getAllCollections(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  if (collectionQuery.isLoading) return "Loading...";
  if (collectionQuery.error) return "Error...";
  return (
    <Box w={240}>
      <Text size={"xs"}>Collections</Text>
      {collectionQuery.isLoading
        ? "Loading"
        : collectionQuery.data?.data.map((el) => (
            <MenuItem key={el.id} item={el} />
          ))}
      {}
    </Box>
  );
};

export default CollectionItem;

const MenuItem = ({ item }: { item: CollectionChild }) => {
  const [navLink, setNavLink] = useRecoilState(navLinkActiveState);
  const navigate = useNavigate();

  const Component = hasChildren(item?.children) ? MultiLevel : SingleLevel;
  return (
    <>
      <Component
        item={item}
        onClick={() => {
          setNavLink(`/collection/${String(item.id)}`);
          navigate(`/collection/${String(item.id)}`);
        }}
        active={navLink == `/collection/${String(item.id)}`}
        defaultOpened
        draggable

      />
    </>
  );
};

interface Pr {
  item: CollectionChild;
  onClick: () => void;
  active: boolean;
    defaultOpened:boolean
    draggable:boolean
  // eslint-disable-next-line no-unused-vars
}

const SingleLevel = (props: Pr) => {
  const { item, ...rest } = props;

  return (
    <>
      <NavLink
        key={item.id}
        label={item.name}
        icon={<FcFolder size="1rem" stroke={1.5} />}
        variant={"filled"}
        {...rest}
        childrenOffset={28}

      />
    </>
  );
};
const MultiLevel = (props: Pr) => {
  const { item, ...rest } = props;
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <Button
        style={{
          position: "absolute",
          right: 0,
          zIndex: 20,
        }}
        styles={() => ({
          root: {
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        })}
        mr={"xs"}
        variant={"subtle"}
        onClick={() => setOpen(!open)}
      />

      <NavLink
        opened={open}
        key={item.id}
        label={item.name}
        icon={<FcFolder size="1rem" stroke={1.5} />}
        variant={"filled"}
        {...rest}
        childrenOffset={8}
        // rightSection={<span />}
      >
        {item &&
          item.children &&
          item.children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
      </NavLink>
    </React.Fragment>
  );
};
