import { NavLink } from "@mantine/core";
import React from "react";

interface Props {
  id: number;
  label: string;
  icon: React.ReactNode;
  children?: Props[];
}

const CollectionNavItem = (data: Props) => {
  const a = 1;
  return (
    <>
      <NavLink
        key={data.id}
        variant="filled"
        label={data.label}
        icon={data.icon}
      >
        {data.children
          ? data.children.map((el, i) => (
              <CollectionNavItem
                key={el.id}
                icon={el.icon}
                id={el.id}
                label={el.label}
              >
                {el.children}
              </CollectionNavItem>
            ))
          : null}
      </NavLink>
    </>
  );
};

export default CollectionNavItem;
