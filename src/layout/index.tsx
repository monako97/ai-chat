import React, { useCallback, useEffect, useRef } from "react";
import { Navigate, useOutlet } from "@moneko/react";
import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  Divider,
  TextField,
} from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import theme from "neko-ui/es/theme";

import { chat } from "@/store/chat";
import { global } from "@/store/global";

import "neko-ui/es/button";
import "neko-ui/es/md";
import "neko-ui/es/typography";

theme.setScheme("light");

const Layout = () => {
  const outlet = useOutlet();
  const { error } = chat;
  const { OPENROUTER_API_KEY, apiModal } = global;
  const inp = useRef<HTMLInputElement>(null);
  const saveApi = useCallback(async () => {
    global.OPENROUTER_API_KEY = inp.current?.value as string;
    const resp = await chat.test();

    if (resp) {
      return;
    }
    global.closeModal();
  }, []);

  useEffect(() => {
    if (error) {
      global.apiModal = true;
    }
  }, [error]);
  return (
    <StyledEngineProvider injectFirst>
      <Dialog
        open={apiModal}
        closeAfterTransition
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {error && (
          <Alert variant="filled" severity="error">
            <AlertTitle>{error.code}</AlertTitle>
            {error.message}
          </Alert>
        )}
        <TextField
          inputRef={inp}
          sx={{ m: 5 }}
          multiline
          label="OpenRouter API Key"
          placeholder="请填写您的 OpenRouter API key!"
          defaultValue={OPENROUTER_API_KEY}
          autoFocus
        />
        <Divider />
        <Button size="medium" onClick={saveApi}>
          保存
        </Button>
      </Dialog>
      {outlet || <Navigate to="/chat" replace />}
    </StyledEngineProvider>
  );
};

export default Layout;
