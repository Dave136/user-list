import Modal from './Modal';
import type { User } from '../types/';

type Props = {
  user: User;
};

const UserModal = ({ user }: Props) => {
  return (
    <Modal title="Información de usuario" active>
      <section>
        <header className="flex">
          <picture className="flex justify-center ">
            <img
              src={user.image}
              className="w-28 h-28 rounded-full shadow-lg"
            />
          </picture>
          <div className="flex flex-col ml-8 justify-center">
            <h4 className="text-lg">
              {user.firstName} {user.lastName}
            </h4>
            <p className="text-sm text-gray-400 mt-2">
              {user.address?.address}
            </p>
          </div>
        </header>
      </section>
    </Modal>
  );
};

export default UserModal;
