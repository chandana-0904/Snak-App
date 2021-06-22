import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;
//Function to handle changes in message text
  const handleChange = (event) => {
    setValue(event.target.value);
    // To render 'typing...' if user is typing in message input box
    isTyping(props, chatId);
  };
//Function to handle message on submitting 
  const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }

    setValue('');
  };
// Function to handle changes in uploade of the image file
  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };
//Message form with input fields to type text, upload image and submit button
  return (
    <form className="message-form" onSubmit={handleSubmit}>
    {/* Input field to type text messages */}
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      {/* Field to upload an image file in message */}
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      {/* Button to submit the text message or uploaded image */}
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" rotate='90' />
      </button>
    </form>
  );
};

export default MessageForm;
