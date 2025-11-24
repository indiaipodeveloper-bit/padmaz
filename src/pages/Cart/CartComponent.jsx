import { RiDeleteBin3Line } from "react-icons/ri";

const CartComponent = () => {
  const cartProduct = [
    {
      ProductId: 1,
      name: "shirr",
      size: "M",
      color: "red",
      quentity: 2,
      price: 15,
      image: "https://picsum.photos/200/300?random=1",
    },
    {
      ProductId: 2,
      name: "shirr",
      size: "M",
      color: "red",
      quentity: 2,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
  ];
  return (
    <div className="">
      {cartProduct.map((prod, index) => {
        return (
          <div
            key={index}
            className="flex items-start justify-between
                     py-4 border-b"
          >
            <div className="flex items-start">
              <img
                src={prod.image}
                alt={prod.name}
                className="w-20 h-24 object-cover mr-4 rounded "
              />
              <div className="">
                <h3>{prod.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {prod.size} | color : {prod.color}
                </p>
                <div className="flex items-center mt-2">
                  <button className="border rounded cursor-pointer px-2 py-1 text-xl font-medium">
                    -
                  </button>
                  <span className="mx-4">{prod.quentity}</span>
                  <button className="border cursor-pointer rounded px-2 py-1 text-xl font-medium">
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <p className="">${prod.price.toLocaleString()}</p>
              <button className="cursor-pointer">
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartComponent