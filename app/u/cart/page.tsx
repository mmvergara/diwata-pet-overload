"use client";
import { CartProductCard } from "@/components/CartProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  UserCartProducts,
  getUserCartProducts,
  removeProductFromCart,
  updateUserCartProductQuantity,
} from "@/db/cart";
import { formatNumberComma } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<UserCartProducts | null>(
    null,
  );

  const handleUpdateQuantity = async (productId: string, add: number) => {
    const updatedCart = await updateUserCartProductQuantity(productId, add);
    if (!updatedCart) return;

    setCartProducts((prev) => {
      return prev?.map((cartProduct) => {
        if (cartProduct.product.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + add,
          };
        }
        return cartProduct;
      });
    });
  };

  const handleRemoveProductToCart = async (productId: string) => {
    const updatedCart = await removeProductFromCart(productId);
    if (!updatedCart) return;

    setCartProducts((prev) => {
      return prev?.filter(
        (cartProduct) => cartProduct.product.id !== productId,
      );
    });
  };

  const getCartProducts = async () => {
    const cart = await getUserCartProducts();
    if (!cart) return;
    setCartProducts(cart);
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  const totalQuantity =
    cartProducts?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice =
    cartProducts?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ) || 0;
  return (
    <main className="flex flex-col items-center justify-center gap-4 pt-[5vh] text-white">
      <Card className="mx-4 flex w-full max-w-[784px]  flex-row flex-wrap items-center justify-around gap-4 p-4 ">
        <div className="grow rounded-md bg-slate-100 p-2 font-semibold">
          Total Items: {totalQuantity}
        </div>
        <div className="grow rounded-md bg-slate-100 p-2 font-semibold">
          <span className="font-normal">Checkout Price:</span> ₱{" "}
          {formatNumberComma(totalPrice)}.00
        </div>
        <Link href="/u/checkout" className="w-full grow">
          <Button className="w-full grow">
            Checkout
            <ShoppingBag size={16} className="ml-2" />
          </Button>
        </Link>
      </Card>
      <section className="flex flex-wrap justify-center gap-4">
        {cartProducts?.map((cartProduct) => {
          return (
            <CartProductCard
              key={cartProduct.id}
              product={cartProduct.product}
              quantity={cartProduct.quantity}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveProductToCart={handleRemoveProductToCart}
            />
          );
        })}
      </section>
    </main>
  );
};

export default CartPage;
