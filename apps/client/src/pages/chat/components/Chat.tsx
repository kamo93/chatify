import Bubbles from '../../../components/Bubbles/Bubbles';
import ChatInput from '../../../components/ChatInput/ChatInput';
import { Conversation, TextConversation } from '../../../types/Conversion';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ChatProps {}

const User = 'kamo93';
const otherUser = 'andres';

const CONVERSATION_MOCK: Array<TextConversation> = [
  {
    id: '1',
    date: new Date(),
    msgs: [
      'hol Awesome its going to be an amazing deal!',
      "I've ran thought different docs",
      "Hope for the best!✌️{' '}",
    ],
    user: User,
  },
  {
    id: '3',
    date: new Date(),
    msgs: ['Awesome its going to be an amazing deal!'],
    user: otherUser,
  },
  { id: '4', date: new Date(), msgs: ["I've ran thought different docs"], user: User },
  { id: '6', date: new Date(), msgs: ['Hope for the best!✌️ '], user: otherUser },
  {
    id: '7',
    date: new Date(),
    msgs: [
      "Thanks for send the deal , I'll review it and get back to you shortly but this message should be very long so I can check what happend if someone write something very lo7g. Thanks for send the del, I'll review it and get back to you shortly but this message should be very long so I can check what happend if someone write something very lo7g.",
    ],
    user: User,
  },
  { id: '12', date: new Date(), msgs: ['Hope for the best!✌️ '], user: otherUser },
];

function Chat() {
  return (
    <>
      <div className="mx-8 max-h-[calc(100vh_-_53px)] overflow-y-scroll">
        {/* TODO add dates */}
        {/* <p className="text-center">Domingo, 21 de Enero de 2022</p> */}
        {CONVERSATION_MOCK.map(({ id, msgs, user }) => {
          const isUser = user === User;
          return <Bubbles key={id} isUser={isUser} msgs={msgs} />;
        })}
      </div>
      <ChatInput />
    </>
  );
}

export default Chat;
