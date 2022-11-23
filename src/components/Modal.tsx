type Props = {
  active: boolean;
  children: JSX.Element | JSX.Element[];
  onClose?: () => void;
};

const Modal = ({ children, onClose, active }: Props) => {
  if (!active) {
    return <div></div>;
  }

  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 mt-0 flex justify-center items-center transition ease">
      <div className="w-xl bg-light-700 p-8 rounded-md relative transition ease">
        <span
          className="text-2xl cursor-pointer absolute top-2 right-4"
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
