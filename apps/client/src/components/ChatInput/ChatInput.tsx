import { IoAttachOutline, IoSend } from "react-icons/io5";

const ChatInput = () => {
  return (
    <div className="grid grid-cols-[2rem_1fr_2rem] h-10 items-center mx-8 mb-4">
      <IoAttachOutline className="stroke-blue-50 h-7 w-7" />
      <input
        id="chat-input"
        type="text"
        value=""
        className="h-full bg-transparent border-blue-600 border-solid rounded border"
      />
      <IoSend className="fill-blue-50 h-5 w-5 justify-self-center" />
    </div>
  );
};

export default ChatInput;
