type Props = {
  active: boolean;
  title?: string;
  children: JSX.Element | JSX.Element[];
  close?: () => void;
};

const Modal = ({ title, children }: Props) => {
  return (
    <div className="absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-50 mt-0 flex justify-center items-center">
      <div className="w-xl bg-light-700 p-8 rounded-md">
        <header className="flex justify-between mb-4">
          <h3 className="text-xl">{title}</h3>
          <span className="text-2xl cursor-pointer" onClick={close}>
            &times;
          </span>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
