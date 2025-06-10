export interface CartItem {
    id: number | null;
    nombre: string;
    precio: number;
    imagen?: string;
    cantidad: number;
    tipo: 'insumo' | 'manufacturado';
}