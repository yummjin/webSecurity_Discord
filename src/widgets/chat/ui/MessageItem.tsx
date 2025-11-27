import { useEffect, useRef, type FC } from 'react';
import type { Message } from '@/widgets/chat/types';
import {
  messageItem,
  userInfoImage,
  MessageContent,
  text,
  textOnly,
  meta,
  username,
  timestamp,
} from '@/widgets/chat/styles/MessageItem.css.ts';

interface MessageItemProps {
  msg: Message;
  sameGroup: boolean;
  index: number;
}

const MessageItem: FC<MessageItemProps> = ({ msg, sameGroup, index }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const scripts = contentRef.current.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        const newScript = document.createElement('script');
        newScript.text = script.text;
        Array.from(script.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        script.parentNode?.replaceChild(newScript, script);
      }
    }
  }, [msg.content]);

  return sameGroup ? (
    <div key={index} className={messageItem}>
      <div className={MessageContent}>
        <div ref={contentRef} className={textOnly} dangerouslySetInnerHTML={{ __html: msg.content }} />
      </div>
    </div>
  ) : (
    <div key={index} className={messageItem}>
      <img className={userInfoImage} src={msg.user.image} alt={msg.user.name} />
      <div className={MessageContent}>
        <div className={meta}>
          <span className={username}>{msg.user.name}</span>
          <span className={timestamp}>{msg.timestamp}</span>
        </div>
        <div ref={contentRef} className={text} dangerouslySetInnerHTML={{ __html: msg.content }} />
      </div>
    </div>
  );
};

export default MessageItem;
