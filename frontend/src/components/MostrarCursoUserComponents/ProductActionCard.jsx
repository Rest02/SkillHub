import React from 'react';

function ProductActionCard({ price, onBuyNow, onAddToCart }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
      {/* Precio */}
      <div className="mb-4 text-2xl font-semibold text-gray-800">
        ${price.toFixed(2)}
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col gap-4 w-full">
        <button
          className="py-3 w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-medium shadow-md transition duration-200"
          onClick={onBuyNow}
        >
          Comprar ahora
        </button>
        <button
          className="py-3 w-full text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-lg font-medium shadow-md transition duration-200"
          onClick={onAddToCart}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductActionCard;
