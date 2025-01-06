import React from 'react';

export const GreetingHeader = () => {
  return (
    <div className="flex items-center gap-3 mb-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Hi, I'm Aaron the Customer Engineering intern
      </h1>
      <div className="relative group cursor-pointer">
        <img 
          src="aaron-the-intern.png"
          alt="Aaron the intern" 
          className="w-12 h-12 transition-transform transform group-hover:scale-110"
        />
        <span className="absolute -top-1 -right-1 text-1xl animate-bounce group-hover:animate-none">
          💧
        </span>
      </div>
    </div>
  );
};