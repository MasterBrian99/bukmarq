import EmojiPick from "@/components/layout/main/EmojiPick";
import { Box, NavLink, Text } from "@mantine/core";
import { Emoji } from "emoji-picker-react";
import { BsFillArchiveFill } from "react-icons/bs";

const CollectionItem = () => {
  const a = 1;
  return (
    <Box w={240}>
      <Text size={"xs"}>Collections</Text>

      <NavLink
        label="First parent link"
        icon={<EmojiPick />}
        childrenOffset={28}
      >
        <NavLink label="First child link" />
        <NavLink label="Second child link" />
        <NavLink label="Nested parent link" childrenOffset={28}>
          <NavLink label="First child link" />
          <NavLink label="Second child link" />
          <NavLink label="Third child link" />
        </NavLink>
      </NavLink>

      <NavLink
        label="Second parent link"
        icon={<BsFillArchiveFill size="1rem" stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink label="First child link" />
        <NavLink label="Second child link" />
        <NavLink label="Third child link" />
      </NavLink>
    </Box>
  );
};

export default CollectionItem;
