import classNames from 'classnames';
import { ReactNode } from 'react';

interface BubbleProp {
  isUser: boolean;
  children: ReactNode;
}
const Bubble: React.FC<BubbleProp> = ({ isUser, children }) => {
  return (
    <p
      className={classNames('py-2 px-4 rounded-3xl mb-1.5', {
        'bg-blue-700': isUser,
        'bg-blue-400': !isUser,
      })}
    >
      {children}
    </p>
  );
};

export default Bubble;
