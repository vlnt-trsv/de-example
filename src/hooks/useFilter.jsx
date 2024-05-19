import { useEffect, useState } from "react";

const useFilter = (cards) => {
  const [filters, setFilters] = useState({
    status: "",
    car: "",
  });
  const [filteredData, setFilteredData] = useState(cards);

  useEffect(() => {
    const filteredCards = cards.filter((card) => {
      let matches = true;

      if (filters.status && card.id_status !== parseInt(filters.status)) {
        matches = false;
      }

      if (filters.car && card.id_car !== parseInt(filters.car)) {
        matches = false;
      }

      return matches;
    });

    setFilteredData(filteredCards);
  }, [cards, filters]);

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      car: "",
    });
  };

  return { filteredData, filters, updateFilters, clearFilters };
};

export default useFilter;
