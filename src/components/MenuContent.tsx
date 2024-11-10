import React from 'react';
import { DrawOutlined, FormatIndentDecreaseOutlined } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';

import { chat } from '@/store/chat';
import { global } from '@/store/global';

export default function MenuContent() {
  const { messages, activeId } = chat;

  return (
    <Stack sx={{ flexGrow: 1, justifyContent: 'space-between' }}>
      <div
        style={{
          display: 'flex',
          position: 'sticky',
          padding: 4,
          top: 0,
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(16px)',
          zIndex: 1,
        }}
      >
        <IconButton onClick={global.toggleMenu}>
          <FormatIndentDecreaseOutlined />
        </IconButton>
        <span style={{ flex: 1 }}></span>
        <IconButton onClick={chat.newChoice}>
          <DrawOutlined />
        </IconButton>
      </div>
      <List dense>
        {Object.keys(messages)
          .map((id, i) => ({
            key: id,
            content: `会话-${i + 1}`,
          }))
          .map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                selected={item.key === activeId}
                sx={{ ml: 1 }}
                style={{
                  borderRadius: 8,
                }}
                onClick={() => {
                  chat.activeId = item.key;
                }}
              >
                <ListItemText primary={item.content} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Stack>
  );
}
