import React, { useCallback, useEffect, useRef } from 'react';
import app from '@app/info';
import {
  Alert,
  ArrowCircleUpOutlined,
  DrawOutlined,
  FormatIndentIncreaseOutlined,
  LinkSharp,
  StopCircle,
} from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';

import SideMenu from '@/components/SideMenu';
import { chat } from '@/store/chat';
import { global } from '@/store/global';

const ChatPage = () => {
  const { menuOpen } = global;
  const { messages, activeId, stream, error } = chat;
  const inp = useRef<HTMLInputElement>(null);
  const docu = useRef<HTMLDivElement>(null);
  const chatCompletion = useCallback(async () => {
    if (inp.current?.value) {
      chat.send(inp.current.value);
      inp.current.value = '';
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      docu.current?.scrollTo({
        top: 999999999999,
      });
    }, 5);

    return () => {
      clearTimeout(timer);
    };
  }, [activeId, stream]);
  return (
    <Box sx={{ display: 'flex' }}>
      {menuOpen && <SideMenu />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          height: '100vh',
        }}
      >
        <AppBar
          position="sticky"
          sx={{
            bgcolor: 'rgba(255,255,255,0.65)',
            boxShadow: 'none',
            backdropFilter: 'blur(16px)',
          }}
        >
          <Toolbar
            sx={{
              minHeight: 56,
            }}
          >
            {!menuOpen && (
              <>
                <IconButton onClick={global.toggleMenu}>
                  <FormatIndentIncreaseOutlined />
                </IconButton>
                <IconButton onClick={chat.newChoice}>
                  <DrawOutlined />
                </IconButton>
              </>
            )}
            <Typography
              variant="h6"
              color="textSecondary"
              component="div"
              sx={{ flexGrow: 1, fontSize: 18 }}
            >
              ChatGPT
            </Typography>
            <IconButton
              sx={{ p: 0 }}
              size="small"
              edge="end"
              color="default"
              onClick={() => {
                global.apiModal = true;
              }}
            >
              <Avatar sx={{ p: 0, width: 32, height: 32 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box ref={docu} sx={{ flex: 1, overflowY: 'auto', p: 16, gap: 12 }}>
          {(activeId &&
            messages[activeId]?.map((msg, i) => {
              const isUser = msg.role === 'user';

              return (
                <Container
                  key={`${i}-${msg.created}`}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: isUser ? 'row-reverse' : 'row',
                    marginBottom: 2,
                  }}
                >
                  {!isUser && <Avatar>GPT</Avatar>}
                  <n-md
                    css={`
                      .n-md-body {
                        padding: 0 ${isUser ? 20 : 0}px;
                        background-color: rgb(244 244 244 / ${isUser ? 1 : 0});
                        border-radius: 24px;
                        --text-color: rgb(13, 13, 13);
                        box-shadow: none;
                        --font-size: 1rem;
                        --font-family: '.AppleSystemUIFont';
                        --text-secondary: rgb(93, 93, 93);
                        font-weight: 300;

                        p {
                          margin-block: 10px;
                        }
                      }
                    `}
                  >
                    {msg.content}
                  </n-md>
                </Container>
              );
            })) || (
            <Typography variant="h6" align="center">
              有什么可以帮忙的?
            </Typography>
          )}
          {activeId && !!stream[activeId]?.trim()?.length && (
            <Container
              sx={{
                display: 'flex',
                gap: 2,
              }}
            >
              <Avatar>GPT</Avatar>
              <Typography color="textPrimary" fontSize={16} fontWeight={300}>
                {stream[activeId]}
              </Typography>
            </Container>
          )}
        </Box>
        {error?.message && (
          <Alert variant="filled" severity="error">
            {error.code}: {error.message}
          </Alert>
        )}
        <TextField
          fullWidth
          placeholder="Message ChatGPT..."
          inputRef={inp}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              chatCompletion();
            }
          }}
          slotProps={{
            input: {
              sx: {
                borderRadius: 50,
                ml: '20%',
                mr: '20%',
                width: 'auto',
              },
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <LinkSharp color="GrayText" />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {!stream[activeId]?.length ? (
                    <IconButton type="submit" onClick={chatCompletion}>
                      <ArrowCircleUpOutlined color="GrayText" />
                    </IconButton>
                  ) : (
                    <IconButton type="submit" onClick={chat.unSend}>
                      <StopCircle color="GrayText" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
        />
        <Typography color="textSecondary" fontSize={12} align="center" m={1}>
          {app.description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatPage;
