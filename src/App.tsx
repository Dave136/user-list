import { useEffect, useState } from 'react';
import Table, { Column } from 'react-base-table';
import ReactPaginate from 'react-paginate';
import { axios } from './config/axios';
import { PAGE_LIMIT } from './constants';
import UserModal from './components/UserModal';
import Skeleton from './components/Skeleton';
import type { User, ApiResponse } from './types/';
import 'react-base-table/styles.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<ApiResponse>(
        `/users?limit=${PAGE_LIMIT}&skip=${PAGE_LIMIT * currentPage}`
      );
      setUsers(data?.users);
      setPageCount(Math.ceil(data.total / PAGE_LIMIT));
    } catch (error) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const selectedPage = selected;
    setCurrentPage(selectedPage + 1);
  };

  const emptyRenderer = () => (
    <span className="w-full flex justify-center items-center">
      Cargando ...
    </span>
  );

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto pt-8">
        <h2 className="text-3xl mb-8">Lista de Usuarios</h2>

        {loading ? (
          <Skeleton />
        ) : (
          <>
            <div>
              <Table
                data={users}
                width={600}
                height={400}
                disabled={loading}
                emptyRenderer={emptyRenderer}
                rowEventHandlers={{
                  onClick: ({ rowData }) => {
                    setUser(rowData);
                    setShowModal(true);
                  },
                }}
              >
                <Column title="ID" key="id" dataKey="id" width={100} />
                <Column
                  title="Nombre"
                  key="firstName"
                  dataKey="firstName"
                  width={100}
                />
                <Column
                  title="Apellido"
                  key="lastName"
                  dataKey="lastName"
                  width={100}
                />
                <Column title="Edad" key="age" dataKey="age" width={100} />
                <Column title="Ip" key="ip" dataKey="ip" width={250} />
                <Column
                  title="Usuario"
                  key="username"
                  dataKey="username"
                  width={200}
                />
              </Table>
            </div>
            <div className="mt-8">
              <ReactPaginate
                previousLabel="Anterior"
                nextLabel="Siguiente"
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName="flex list-none items-center"
                previousLinkClassName="p-3 border border-[#dcdcdc] rounded-md mr-3 cursor-pointer"
                breakClassName="p-3 border border-[#dcdcdc] rounded-md mr-3 cursor-pointer"
                nextLinkClassName="p-3 border border-[#dcdcdc] rounded-md mr-3 cursor-pointer"
                pageClassName="p-3 border border-[#dcdcdc] rounded-md mr-3 cursor-pointer"
                disabledClassName="cursor-not-allowed"
                activeClassName="border-2 border-black"
                onPageChange={handlePageClick}
              />
            </div>
          </>
        )}
      </div>
      {users.length && user?.id && (
        <UserModal user={user} active={showModal} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
