import { Container } from "react-bootstrap";

import NavBar from "./components/NavBar";
import ForecasterHome from "./pages/Forecaster";
import PastForecasts from "./pages/PastForecasts";
import { BrowserRouter, Switch, withRouter, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Container fluid className="App">
        <NavBar />
        <BrowserRouter>
          <Switch>
            <>
              <Route exact path="/" component={withRouter(ForecasterHome)}></Route>
              <Route exact path="/PastForecasts" component={withRouter(PastForecasts)}></Route>
            </>
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
