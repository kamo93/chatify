import classnames from 'classnames';
import { IoPersonCircleSharp } from 'react-icons/io5';
import Bubble from '../Bubble/Bubble';

interface BubblesProp {
  msgs: Array<string>;
  isUser: boolean;
}

const Bubbles: React.FC<BubblesProp> = ({ msgs, isUser }) => {
  return (
    <div
      className={classnames('grid w-full gap-1 py-4', {
        'grid-cols-[2rem_1fr_8rem]': !isUser,
        'grid-cols-[8rem_1fr_2rem]': isUser,
      })}
    >
      {!isUser ? <IoPersonCircleSharp className="fill-blue-300 w-8 h-8" /> : null}
      <div className={isUser ? 'grid col-start-2 col-end-3 justify-self-end' : ''}>
        {msgs.map(msg => (
          <Bubble isUser={isUser} key={msg}>
            {msg}
          </Bubble>
        ))}
      </div>
      {isUser ? <IoPersonCircleSharp className="fill-blue-300 w-8 h-8" /> : null}
    </div>
  );
};

export default Bubbles;
