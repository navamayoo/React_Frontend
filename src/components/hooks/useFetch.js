import { useEffect, useState } from "react";
import NotesService from "../../service/NotesService";

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      NotesService.getAll()
        .then(({ data }) => setData(data))
        .catch((e) => console.error(e))
        .finally((_) => setLoading(false));
    };
    fetchData();
  }, []);

  return {
    data,
    loading,
  };
}
