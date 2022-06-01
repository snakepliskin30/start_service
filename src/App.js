import React from "react";
import "./App.css";
const StartService = React.lazy(() =>
  import("./components/panel/StartService")
);

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <StartService />
    </React.Suspense>
  );
}

export default App;
