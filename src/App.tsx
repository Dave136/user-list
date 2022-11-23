import { useEffect, useRef, useState } from 'react';
import Table, { Column } from 'react-base-table';
import ReactPaginate from 'react-paginate';
import { axios } from './config/axios';
import { PAGE_LIMIT } from './constants';
import UserModal from './components/UserModal';
import Skeleton from './components/Skeleton';
import type { User, ApiResponse } from './types/';
import 'react-base-table/styles.css';
import './index.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMounted = useRef(false);

  const closeModal = () => {
    setShowModal(false);
    setUser(null);
  };

  const getUsers = async () => {
    try {
      if (!isMounted.current && !users.length) {
        setLoading(true);
      }

      const { data } = await axios.get<ApiResponse>(
        `/users?limit=${PAGE_LIMIT}&skip=${PAGE_LIMIT * currentPage}`
      );
      setUsers(data?.users);
      const pageCount = Math.ceil(data.total / PAGE_LIMIT);
      setPageCount(pageCount - 1);
      isMounted.current = true;
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
                width={720}
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
                <Column
                  title="id"
                  key="id"
                  dataKey="id"
                  headerClassName="text-[10px] font-bold text-gray-900"
                  width={150}
                />
                <Column
                  title="Usuario"
                  key="username"
                  dataKey="username"
                  headerClassName="text-[10px] font-bold text-gray-900"
                  width={150}
                />
                <Column
                  title="Nombre"
                  key="firstName"
                  dataKey="firstName"
                  headerClassName="text-[10px] font-bold text-gray-900"
                  width={150}
                />
                <Column
                  title="Apellido"
                  key="lastName"
                  dataKey="lastName"
                  headerClassName="text-[10px] font-bold text-gray-900"
                  width={150}
                />
                <Column
                  title="Edad"
                  key="age"
                  dataKey="age"
                  headerClassName="text-[10px] font-bold text-gray-900"
                  width={80}
                />
                <Column
                  title="Ip"
                  key="ip"
                  dataKey="ip"
                  headerClassName="text-[10px] font-bold text-gray-900"
                  width={250}
                />
              </Table>
            </div>
            <div className="mt-8 flex justify-center">
              <ReactPaginate
                previousLabel="Anterior"
                nextLabel="Siguiente"
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                containerClassName="flex list-none items-center"
                previousLinkClassName="p-2 text-sm border border-[#dcdcdc] rounded-md mr-3 cursor-pointer"
                breakClassName="p-2 text-sm border border-[#dcdcdc] rounded-md mr-3 cursor-pointer"
                nextLinkClassName="p-2 text-sm border border-[#dcdcdc] rounded-md mr-3 cursor-pointer"
                pageClassName="p-2 text-sm border border-[#dcdcdc] rounded-md mr-3 cursor-pointer"
                disabledClassName="cursor-not-allowed"
                activeClassName="border-2 border-gray-700"
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
