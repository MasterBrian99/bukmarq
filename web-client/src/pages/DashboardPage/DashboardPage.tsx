import { Box, ScrollArea } from "@mantine/core";

const DashboardPage = () => (
  <Box component={ScrollArea}>
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i}>{i}</div>
    ))}
  </Box>
);

export default DashboardPage;
