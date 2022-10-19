import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import './App.css';

// Importing Components
import CreateOption from "./page/create-options";

function App() {
  return (
    <>
      <ToastContainer />
    
      <CreateOption />
    </>
  );
}

export default App;
