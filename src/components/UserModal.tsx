import Modal from './Modal';
import type { User } from '../types/';

type Props = {
  user: User;
  active: boolean;
  onClose: () => void;
};

const UserModal = ({ user, active, onClose }: Props) => {
  return (
    <Modal active={active} onClose={onClose}>
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
              {user.address?.address} | {user.birthDate}
            </p>
          </div>
        </header>
        <hr className="h-[2px] bg-light-900 mt-6 w-full" />
        <section className="mt-6">
          <header>
            <h3 className="font-bold text-gray-900">Información</h3>
          </header>
          <div className="grid grid-cols-1 gap-4 mt-6">
            <p className="text-gray-400">
              Nombre:{' '}
              <span className="text-gray-900 ml-2">{user.firstName}</span>
            </p>
            <p className="text-gray-400">
              Apellido:{' '}
              <span className="text-gray-900 ml-2">{user.lastName}</span>
            </p>
            <p className="text-gray-400">
              Edad: <span className="text-gray-900 ml-2">{user.age}</span>
            </p>
            <p className="text-gray-400">
              Email: <span className="text-gray-900 ml-2">{user.email}</span>
            </p>
            <p className="text-gray-400">
              Usuario:{' '}
              <span className="text-gray-900 ml-2">{user.username}</span>
            </p>
          </div>
        </section>
      </section>
    </Modal>
  );
};

export default UserModal;
