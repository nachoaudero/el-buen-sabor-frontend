import React, { useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { CartItem } from '../../types/cart.types';

const CART_STORAGE_KEY = 'cart_items';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            console.error("Error cargando cart_items de localStorage", e);
            return [];
        }
    });

    // Guardar en localStorage cada vez que cartItems cambia
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (e) {
            console.error("Error guardando cart_items en localStorage", e);
        }
    }, [cartItems]);

    const addItem = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i =>
                    i.id === item.id ? { ...i, cantidad: i.cantidad + item.cantidad } : i
                );
            } else {
                return [...prevItems, item];
            }
        });
    };

    const removeItem = (id: number) => {
        setCartItems(prevItems => prevItems.filter(i => i.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
        try {
            localStorage.removeItem(CART_STORAGE_KEY);
        } catch (e) {
            console.error("Error limpiando cart_items de localStorage", e);
        }
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(i =>
                i.id === id ? { ...i, cantidad: quantity } : i
            )
        );
    };

    const getTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    };

    const getItemCount = () => {
        return cartItems.reduce((acc, item) => acc + item.cantidad, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, updateQuantity, getTotal, getItemCount }}>
            {children}
        </CartContext.Provider>
    );
};
