import React from "react";
import styles from "./Filter.module.css";

const Filter = ({ filters, updateFilters, statuses, products, order }) => {
  return (
    <div className={styles.filters}>
      <select
        value={filters.status || ""}
        onChange={(e) => updateFilters({ status: e.target.value })}
        key={order.id}
      >
        <option value="">Выберите статус</option>
        {statuses.map((status) => (
          <option key={status.id} value={status.id}>
            {status.name}
          </option>
        ))}
      </select>
      <select
        value={filters.product || ""}
        onChange={(e) => updateFilters({ product: e.target.value })}
      >
        <option value="">Выберите продукт</option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <button onClick={() => updateFilters({ status: "", product: "" })}>
        Сбросить фильтры
      </button>
    </div>
  );
};

export default Filter;
