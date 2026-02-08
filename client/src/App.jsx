import Navbar from "./components/Navbar";
import AnimatedRoutes from "./components/Animation/AnimatedRoutes";
import ToastProvider from "./components/ui/ToastProvider";

function App() {
  return (
    <>
      <ToastProvider />
      <Navbar />
      <AnimatedRoutes />
    </>
  );
}

export default App;
