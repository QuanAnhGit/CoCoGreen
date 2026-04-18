// ============================================================
// COCOGREEN – ChatBubble Component
// ============================================================

import styles from './ChatBubble.module.css';

const renderMessageParts = (message) => {
  if (!message) return message;

  const parts = message.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    const match = part.match(/^\*([^*]+)\*$/);
    if (match) {
      return <em key={index}>{match[1]}</em>;
    }
    return <span key={index}>{part}</span>;
  });
};

/**
 * @param {string} message - The chat message text
 * @param {'user'|'bot'} role - The role of the message sender
 * @param {string} timestamp - Optional timestamp string
 */
export function ChatBubble({ message, role = 'bot', timestamp }) {
  return (
    <div className={`${styles.bubble} ${styles[role]}`}>
      <div className={styles.message}>{renderMessageParts(message)}</div>
      {timestamp && <div className={styles.timestamp}>{timestamp}</div>}
    </div>
  );
}