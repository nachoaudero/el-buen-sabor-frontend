export interface CartItem {
    id: number;
    nombre: string;
    precio: number;
    imagen?: string;
    cantidad: number;
    tipo: 'insumo' | 'manufacturado' | 'promocion';
}