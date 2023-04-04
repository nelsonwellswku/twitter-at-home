import { useState } from 'react';

type props = {
  options: { text: string, onClick: () => void }[],
  initialText: string,
}

export default function Dropdown(props: props) {
  const [isOpen, setIsOpen] = useState(false);
  const { options } = props;

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleOptionClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="py-2 px-4 bg-blue-300 text-white rounded-md"
        onClick={toggleDropdown}
      >
        {props.initialText}
      </button>
      {isOpen && (
        <div className="absolute w-auto top-full left-0 right-0 z-10 bg-gray-100 rounded-md shadow-lg mt-2">
          {options.map(option => (
            <button
              key={option.text}
              className="block w-auto px-4 py-2 text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-md focus:bg-gray-200 z-10"
              onClick={() => handleOptionClick(option.onClick)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
