import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { pedidoService } from "@/services/pedido.services";
import type { Pedido } from "@/types/pedidos.types";
import axios from "axios";
import { PedidoStep1EntregaPago } from "@/components/Pedido/PedidoStep1EntregaPago";
import { PedidoStep2Resumen } from "@/components/Pedido/PedidoStep2Resumen";
import { PedidoStep3Confirmado } from "@/components/Pedido/PedidoStep3Confirmado";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/types/cart.types";

const PedidoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, clearCart } = useCart();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [step, setStep] = useState<number>(1);

  const [formaEntrega, setFormaEntrega] = useState<"local" | "domicilio" | "">("");
  const [formaPago, setFormaPago] = useState<"efectivo" | "mercadopago" | "">("");
  const [direccion, setDireccion] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  const [pedidoArticulos, setPedidoArticulos] = useState<CartItem[]>([]);

  const LOCAL_STORAGE_KEY = `pedidoArticulos_${id}`;

  const savePedidoArticulosToLocalStorage = (articulos: CartItem[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articulos));
    } catch (e) {
      console.error("Error guardando pedidoArticulos en localStorage", e);
    }
  };

  const loadPedidoArticulosFromLocalStorage = (): CartItem[] => {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error cargando pedidoArticulos de localStorage", e);
      return [];
    }
  };

  const clearPedidoArticulosFromLocalStorage = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      console.error("Error limpiando pedidoArticulos en localStorage", e);
    }
  };

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const data = await pedidoService.getPedidoById(Number(id));
        setPedido(data);

        if (data.estado === 2) {
          setPedidoArticulos(loadPedidoArticulosFromLocalStorage());
          setStep(3);
        }
      } catch (error) {
        console.error("Error al cargar pedido", error);
      }
    };

    if (id) {
      fetchPedido();
    }
  }, [id]);

  const handleFinalizarPedido = async () => {
    if (!pedido) return;

    const pedidoUpdatePayload = {
      tipoEnvio: formaEntrega === "local" ? "TAKEAWAY" : "DELIVERY",
      formaPago: formaPago === "efectivo" ? "EFECTIVO" : "MERCADOPAGO",
      estado: pedido.estado, // dejamos el mismo estado para esta prueba
      inicioPreparacion: new Date().toISOString(),
      finPreparacion: new Date().toISOString(),
      total: pedido.total,
      totalCosto: pedido.totalCosto ?? 0,
      cliente: pedido.cliente ? { id: pedido.cliente.id } : null,
      cajero: pedido.cajero ? { id: pedido.cajero.id } : null,
      cocinero: pedido.cocinero ? { id: pedido.cocinero.id } : null,
      delivery: pedido.delivery ? { id: pedido.delivery.id } : null,
      factura: null,
      detalles: pedido.detalles.map(detalle => ({
        id: detalle.id,
        cantidad: detalle.cantidad,
        subtotal: detalle.subtotal,
        articuloInsumo: detalle.articuloInsumo
          ? { id: detalle.articuloInsumo.id }
          : null,
        articuloManufacturado: detalle.articuloManufacturado
          ? { id: detalle.articuloManufacturado.id }
          : null
      }))
    };

    try {
      await axios.put(`http://localhost:8080/pedido/${pedido.id}`, pedidoUpdatePayload);

      setPedido(prev => prev ? { ...prev, ...pedidoUpdatePayload } : null);

      clearCart();
      clearPedidoArticulosFromLocalStorage();

      setStep(3);
    } catch (error) {
      console.error("Error al finalizar pedido", error);
      alert("Error al finalizar pedido");
    }
  };

  if (!pedido) return <div>Cargando pedido...</div>;

  return (
    <div className="container mt-5">
      {step === 1 && (
        <PedidoStep1EntregaPago
          formaEntrega={formaEntrega}
          setFormaEntrega={setFormaEntrega}
          formaPago={formaPago}
          setFormaPago={setFormaPago}
          direccion={direccion}
          setDireccion={setDireccion}
          telefono={telefono}
          setTelefono={setTelefono}
          onConfirm={() => {
            console.log("Cart al confirmar:", cartItems);

            if (cartItems.length === 0) {
              alert("El carrito está vacío, no se puede confirmar pedido.");
              return;
            }

            setPedidoArticulos(cartItems);
            savePedidoArticulosToLocalStorage(cartItems);
            setStep(2);
          }}
        />
      )}

      {step === 2 && (
        <PedidoStep2Resumen
          formaEntrega={formaEntrega as "local" | "domicilio"}
          formaPago={formaPago as "efectivo" | "mercadopago"}
          items={pedidoArticulos}
          onConfirmFinal={handleFinalizarPedido}
        />
      )}

      {step === 3 && (
        <PedidoStep3Confirmado
          pedidoNumero={pedido.id}
          formaEntrega={formaEntrega as "local" | "domicilio"}
          formaPago={formaPago as "efectivo" | "mercadopago"}
          items={pedidoArticulos}
        />
      )}
    </div>
  );
};

export default PedidoPage;
