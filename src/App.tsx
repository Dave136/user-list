import { useEffect, useState } from 'react';
import Table, { Column } from 'react-base-table';
import ReactPaginate from 'react-paginate';
import { axios } from './config/axios';
import { PAGE_LIMIT } from './constants';
import 'react-base-table/styles.css';

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `/users?limit=${PAGE_LIMIT}&skip=${PAGE_LIMIT * currentPage}`
      );
      setUsers(data.users);
      setPageCount(Math.ceil(data.total / PAGE_LIMIT));
    } catch (error) {
      setUsers([]);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const selectedPage = selected;
    setCurrentPage(selectedPage + 1);
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <div>
        <Table data={users} width={600} height={400}>
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
      <div>
        <ReactPaginate
          previousLabel="Anterior"
          nextLabel="Siguiente"
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
        />
      </div>
    </div>
  );
}

export default App;
