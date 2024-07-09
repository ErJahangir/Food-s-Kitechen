import React, { useEffect, useState } from "react";
import Burger from "./../assets/burger.jpeg";
import Fries from "./../assets/fries.jpeg";
import Coke from "./../assets/coke.jpeg";
import Pepsi from "./../assets/pepsi.jpeg";
import { IoAddOutline } from "react-icons/io5";
import { IoMdRemove } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const Menu = () => {
  const [quantity, setQuantity] = useState(0);
  const [addedItem, setAddedItem] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const Data = [
    { id: 1, img: Burger, name: "Burger", Price: 200 },
    { id: 2, name: "Fries", img: Fries, Price: 100 },
    { id: 3, img: Coke, name: "Coke", Price: 50 },
    { id: 4, img: Pepsi, name: "Pepsi", Price: 50 },
    { id: 5, img: Coke, name: "Pepsi", Price: 50 },
  ];

  const Modalstyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const addItem = (item) => {
    setAddedItem((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
      if (itemExists) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    setQuantity(quantity + 1);
  };

  const removeItem = (item) => {
    setAddedItem((prevItems) => {
      const itemExists = prevItems.find((i) => i.id === item.id);
      if (itemExists.quantity === 1) {
        return prevItems.filter((i) => i.id !== item.id);
      } else {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }
    });
    setQuantity(quantity - 1);
  };

  const getItemQuantity = (itemId) => {
    const item = addedItem.find((i) => i.id === itemId);
    return item ? item.quantity : 0;
  };

  // calculate Total Amount
  const calculateTotalAmount = () => {
    return addedItem.reduce(
      (total, item) => total + item.quantity * item.Price,
      0
    );
  };

  useEffect(() => {
    setTotalAmount(calculateTotalAmount());
  }, [addedItem]);

  //   console.log(addedItem);
  return (
    <>
      {/* This is Cart */}

      {quantity ? (
        <button
          className="text-3xl absolute top-2 right-[30px] "
          onClick={() => {
            setModalVisible(true);
          }}
        >
          <span className="absolute  text-white bg-slate-500 w-6 rounded-full text-sm mt-[-8px] border border-white">
            {addedItem.length}
          </span>
          <FaCartPlus />
        </button>
      ) : null}

      {/* This is for All Data */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 lg:max-w-[1200px] md:max-w-[600px] max-w-[300px] mx-auto my-2  ">
        {Data.map((item) => (
          <div className="m-2 shadow-md rounded-md p-2" key={item.id}>
            <img src={item.img} alt="" className="h-[200px]" />
            <div className="ml-3">
              <h2 className="text-black text-xl">{item.name}</h2>
              <p className="text-md items-center">Price: {item.Price}</p>
              {getItemQuantity(item.id) > 0 && (
                <div className="flex flex-col">
                  <span>Total: {getItemQuantity(item.id)}</span>
                  <span>
                    Cost (INR): {getItemQuantity(item.id) * item.Price}
                  </span>
                </div>
              )}
            </div>
            <div className="m-2">
              <button
                className="bg-blue-800 px-1 text-3xl text-white"
                onClick={() => addItem(item)}
              >
                <IoAddOutline />
              </button>
              <button
                disabled={quantity == 0}
                className={`${
                  getItemQuantity(item.id) === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-pink-700"
                } text-3xl text-white ml-2`}
                onClick={() => removeItem(item)}
              >
                <IoMdRemove />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* This is for Modal to show added item */}

      <Modal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        style={Modalstyle}
      >
        <div className="w-[500px]  p-6  ">
          <h2>Order Summary</h2>
          {addedItem.length > 0 ? (
            addedItem.map((item) => (
              <div key={item.id} className="flex justify-between my-2">
                <h2>{item.name}:</h2>
                <p>{item.quantity}</p>
                <div>
                  <button
                    className="bg-blue-800 px-1 text-3xl text-white"
                    onClick={() => addItem(item)}
                  >
                    <IoAddOutline />
                  </button>
                  <button
                    className={`${
                      getItemQuantity(item.id) === 0
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-pink-700"
                    } text-3xl text-white ml-2`}
                    onClick={() => removeItem(item)}
                  >
                    <IoMdRemove />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl p-5 lowercase">No any item</p>
          )}
          <span>Total (INR) :{totalAmount} </span>
          <div className="flex gap-4 justify-end mt-4">
            <Link to="/Checkout">
              <button
                disabled={addedItem.length == 0}
                className={`bg-blue-950  text-white p-1 rounded-md`}
              >
                Save and Checkout
              </button>
            </Link>
            <button
              className="text-blue-800 uppercase"
              onClick={() => setModalVisible(!modalVisible)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Menu;
