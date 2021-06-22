import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
//Chat Feed display
const ChatFeed = (props) => {
  // extracting chats, Id of loggedIn User, userName, messages from props
  const { chats, activeChat, userName, messages } = props;

  const chat = chats && chats[activeChat];
//display user's avatars who read message below every message
  const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
    <div
      key={`read_${index}`}
      className="read-receipt"
      style={{
        float: isMyMessage ? 'right' : 'left',
        backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
      }}
    />
  ));
//Render messages on ChatFeed. If user send message display on right side else display messages on left side of ChatFeed
  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1]; //getting key of lastmessage
      const isMyMessage = userName === message.sender.username;//checking that message is the message sent by user currently LoggedIn or not

      return (
        <div key={`msg_${index}`} style={{ width: '100%' }}>
          <div className="message-block">
            {isMyMessage
              ? <MyMessage message={message} /> //if message is sent by currently LoggedIn user
              
              : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/> //if message is not sent by currently LoggedIn User
               } 
              

          </div>
          {/* Arranging the positions of messsages based on sender */}
          <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return <div />;

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
      {/* Chat Room title */}
        <div className="chat-title">{chat?.title}</div>
        {/*display User's names present in ChatRoom */}
        <div className="chat-subtitle">
          {chat.people.map((person) => ` ${person.person.username}`)}
        </div>
      </div>
      {/* displaying messages in ChatFeed*/}
      {renderMessages()}
      <div style={{ height: '100px' }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;

