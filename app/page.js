"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarProductos() {
      const { data, error } = await supabase
        .from("productos")
        .select("*");

      if (error) {
        console.error("Error cargando productos:", error);
      } else {
        setProductos(data || []);
      }

      setCargando(false);
    }

    cargarProductos();
  }, []);

  return (
    <main style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>MundoShop</h1>
      <p>Bienvenido a nuestra tienda</p>

      <h2>Productos</h2>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos cargados todavía.</p>
      ) : (
        <div>
          {productos.map((producto) => (
            <div key={producto.id}>
              <h3>{producto.nombre}</h3>
              <p>Precio: ${producto.precio}</p>
              <p>Stock: {producto.stock}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
      }
