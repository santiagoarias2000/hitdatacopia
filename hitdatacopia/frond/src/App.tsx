import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import { CompleteRouting } from "./app/utilities/routes/CompleteRouting";

const loading =<div>Por favor sea paciente</div>;
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <CompleteRouting/>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
