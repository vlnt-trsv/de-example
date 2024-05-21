import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewOrder.module.css";
import Typography from "../../../../components/Typography/Typography";
import Button from "../../../../components/Button/Button";
import { createOrder, getProducts } from "../../../../api/api";

const NewOrder = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      id_user: user.id,
      id_product: selectedProduct,
      count: count,
    };

    navigate("/profile/allOrder");
    await createOrder(newOrder); // Отправляем данные на сервер
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.newRequest}>
      <Typography tag="h3">Новый заказ</Typography>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Продукт:
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
          >
            <option value="">Выберите продукт</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Количество:
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
            required
          />
        </label>
        <Button type="submit" variant="outlined">
          Создать
        </Button>
      </form>
    </div>
  );
};

export default NewOrder;
