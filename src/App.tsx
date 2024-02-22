import Message from "./components/Message";

function App() {
  const message = "Hello, World!"; 
  return <div>{Message(message)}</div>;
}

export default App;