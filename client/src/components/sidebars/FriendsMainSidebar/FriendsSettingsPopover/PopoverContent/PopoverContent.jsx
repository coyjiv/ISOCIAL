import { Divider, Stack, Switch, Typography } from "@mui/material";

import { PopoverContentWrapper } from "./PopoverContent.styled.js";
import { ActionIconButton } from "../../../../index.js";
import Box from "@mui/material/Box";

const PopoverContent = () => {
  return (
    <PopoverContentWrapper>
      <Typography fontSize="17px" fontWeight="500">
        Notification settings
      </Typography>
      <Typography fontSize="13px">
        You can manage how you are notified about Friends updates.
      </Typography>
      <Divider orientation="horizontal" sx={{ my: "8px" }} />
      <Stack width="100%" direction="row" alignItems="center" gap="8px">
        <ActionIconButton
          icon="notification"
          variant="iconWithBg"
          onClick={() => console.log("settings")}
        />
        <Stack flex="1">
          <Typography> Show notification dots</Typography>
        </Stack>
        <Box>
          <Switch defaultChecked />
        </Box>
      </Stack>
    </PopoverContentWrapper>
  );
};

PopoverContent.displayName = "PopoverContent";

export default PopoverContent;
