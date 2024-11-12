import { cancelRequest, request } from '@moneko/request';
import sso from 'shared-store-object';

import { global } from './global';

interface Message {
  role: string;
  content: string;
  refusal?: string;
  created?: number;
}
interface Choice {
  logprobs: null;
  finish_reason: 'stop' | 'start';
  index: number;
  message: Message;
}
interface ChatCompletion {
  id: string;
  provider: string;
  model: string;
  object: string;
  created: number;
  choices: Choice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: {
    message: string;
    code: number;
  };
}

export const chat = sso({
  activeId: 'preset' as string | 'preset',
  stream: {} as Record<string, string>,
  created: 0,
  messages: {} as Record<string, Message[]>,
  async send(content: string) {
    if (!chat.activeId) {
      chat.activeId = new Date().getTime().toString(32).substring(2);
    }
    const { activeId } = chat;

    chat.stream[activeId] = '';
    const prevMessages = (chat.messages[activeId as string] || []).concat({
      role: 'user',
      content: content,
      created: new Date().getTime(),
    });

    chat.messages = {
      ...chat.messages,
      [activeId]: prevMessages,
    };
    // 用于累计增量的数据
    let slice_count = 0;
    let rule = '';
    let full_text = '';

    await request('/chat/completions', {
      method: 'POST',
      data: {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: prevMessages,
        stream: true,
      },
      abortId: activeId,
      responseType: 'text',
      onAbort() {
        chat.messages = {
          ...chat.messages,
          [activeId]: prevMessages.concat({ role: rule, content: full_text }),
        };
        chat.stream = {
          ...chat.stream,
          [activeId]: '',
        };
      },
      onProgress(progress) {
        const xhr = progress.target as XMLHttpRequest;

        if (xhr.readyState === xhr.DONE) {
          chat.messages = {
            ...chat.messages,
            [activeId]: prevMessages.concat({ role: rule, content: full_text }),
          };
          chat.stream = {
            ...chat.stream,
            [activeId]: '',
          };
          return;
        }
        const next = xhr.responseText.slice(slice_count); // 只处理新增的数据

        slice_count += next.length;
        next
          .trim()
          .split('\n')
          .forEach((str) => {
            if (str.startsWith('data: {')) {
              try {
                const s = JSON.parse(str.substring(5));

                full_text += s.choices[0].delta.content;
                rule = s.choices[0].delta.rule;
                chat.stream = {
                  ...chat.stream,
                  [activeId]: full_text,
                };
              } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error, str);
              }
              chat.created = new Date().getTime();
            }
          });
      },
    });
  },
  unSend() {
    cancelRequest(chat.activeId);
  },
  async test() {
    await request<ChatCompletion>('/chat/completions', {
      method: 'POST',
      data: {
        model: 'mistralai/mistral-7b-instruct:free',
        messages: [{ role: 'user', content: 'hi' }],
      },
    }).then((resp) => {
      if (!resp.error) {
        global.error = void 0;
        global.closeModal();
      }
    });
  },
  newChoice() {
    const id = new Date().getTime().toString(32).substring(2);

    chat.activeId = id;
    chat.messages[id] = [];
  },
});
