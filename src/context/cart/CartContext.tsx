import React from 'react';
import { CartItem } from '../../types/cart.types';

export interface CartContextType {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    updateQuantity: (id: number, quantity: number) => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export const CartContext = React.createContext<CartContextType | undefined>(undefined);