import React, { useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { CartItem } from '../../types/cart.types';

const CART_STORAGE_KEY = 'cart_items';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
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