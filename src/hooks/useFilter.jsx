import { useEffect, useState } from "react";

const useFilter = (cards) => {
  const [filters, setFilters] = useState({
    status: "",
    product: "",
  });
  const [filteredData, setFilteredData] = useState(cards);

  useEffect(() => {
    const filteredCards = cards.filter((card) => {
      let matches = true;

      if (filters.status && card.id_status !== parseInt(filters.status)) {
        matches = false;
      }

      if (filters.product && card.id_product !== parseInt(filters.product)) {
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
      product: "",
    });
  };

  return { filteredData, filters, updateFilters, clearFilters };
};

export default useFilter;
