import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { pedidoService } from "@services/Pedido/pedido.services.ts";
import type {PedidoResponse} from "@dtos/Pedido/PedidoDtos.ts";
import axios from "axios";
import { PedidoStep1EntregaPago } from "@/components/Pedido/PedidoStep1EntregaPago";
import { PedidoStep2Resumen } from "@/components/Pedido/PedidoStep2Resumen";
import { PedidoStep3Confirmado } from "@/components/Pedido/PedidoStep3Confirmado";
import { useCart } from "@/hooks/useCart";
import type {CartItem} from "@/types/cart.types";
import type {FormaPagoEnum, TipoEnvioEnum} from "@dtos/Pedido/Enums.ts";

const PedidoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { cartItems, clearCart } = useCart();
  const [pedido, setPedido] = useState<PedidoResponse | null>(null);
  const [step, setStep] = useState<number>(1);

  const [formaEntrega, setFormaEntrega] = useState<TipoEnvioEnum>("NO_TIPO_ENVIO");
  const [formaPago, setFormaPago] = useState<FormaPagoEnum>("NO_FORMA_PAGO");
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

        if (data.estado !== "NO_ESTADO") {
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

    pedido.estado = "PENDIENTE_DE_PAGO";
    pedido.tipoEnvio = formaEntrega;
    pedido.formaPago = formaPago;
    pedido.totalCosto = 0; //todo hacer una funcion para calcular el costo

    try {
      console.log(pedido)
      const response = await axios.put<PedidoResponse>(`http://localhost:8080/pedido/${pedido.id}`, pedido);
      setPedido(response.data);

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
