import { Provider } from "react-redux";
import { configureStore } from "./redux/store";

import "./styles/css/app.css";
import Game from "./components/game";

const App = () => {
  return (
    <Provider store={configureStore()}>
      <div className="app-container">
        <Game />
      </div>
    </Provider>
  );
};

export default App;
