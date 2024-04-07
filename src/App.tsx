import { useEffect, useState } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  MoreHorizontal,
  X,
} from "lucide-react";
import { Table } from "./components/table";
import { TableHeader } from "./components/table-header";
import { TableRow } from "./components/table-row";
import { TableCell } from "./components/table-cell";
import { IconButton } from "./components/icon-button";

interface IPeople {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export function App() {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'));
    }

    return 1;
  });
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL('https://swapi.dev/api/people/');

    url.searchParams.set('page', String(page));

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setPeople(response.results);
        setTotal(response.count);
      })
  }, [page]);

  const setCurrentPage = (page: number) => {
    const url = new URL(window.location.toString());

    url.searchParams.set('page', String(page));

    window.history.pushState({}, '', url);

    setPage(page);
  }

  const goToFirstPage = () => {
    setCurrentPage(1)
  }

  const goToLastPage = () => {
    setCurrentPage(totalPages)
  }

  const goToPreviousPage = () => {
    setCurrentPage(page - 1)
  }

  const goToNextPage = () => {
    setCurrentPage(page + 1)
  }

  return (
    <div className="max-w-[716px] mx-auto py-5 flex flex-col gap-5">
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Height</TableHeader>
            <TableHeader>Mass</TableHeader>
            <TableHeader>Gender</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {people.map((person, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.height}</TableCell>
                <TableCell>{person.mass}</TableCell>
                <TableCell>{person.gender}</TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <TableRow>
            <td className="py-3 px-4 text-zinc-300" colSpan={3}>
              Mostrando {people.length} de {total} itens
            </td>
            <td className="py-3 px-4 text-sm text-zinc-300 text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>Página {page} de {totalPages}</span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </td>
          </TableRow>
        </tfoot>
      </Table>
    </div>
  )
}

export default App
