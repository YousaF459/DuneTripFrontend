import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Styles/theme.css';
import "./styles/swal.css";
import { CartProvider } from "./Components/Context/CartContext";

createRoot(document.getElementById('root')).render(
 
    <CartProvider>
  <App />
</CartProvider>
 
)
