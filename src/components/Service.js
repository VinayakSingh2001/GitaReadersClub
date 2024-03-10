import React from "react";

const Service = ({ name, about1, about2, about3, desc, img }) => {
  return (
    <div>
      <div className="transform overflow-hidden duration-200 border p-4 hover:scale-105 cursor-pointer">
        <div className="flex justify-center ">
          <img
            className="w-60 h-60 object-cover "
            src={img}
            alt="Product Image"
          />
        </div>

        <div className="p-4 text-black-[0.9] h-[190px] flex flex-col items-center overflow-hidden">
          <h2 className="text-2xl text-center font-medium">{name}</h2>
          <div className="text-black-[0.5]">
            <p className="mr-2 text-lg text-center text-slate-700">{about1}</p>
            <p className="mr-2 text-lg text-center text-slate-700">{about2}</p>
            <p className="mr-2 text-lg text-center text-slate-700">{about3}</p>
            <p className="text-base font-medium line-through">{desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
