import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import Header from "./components/Header";
import BlogList from "./pages/BlogList";
const engine = new Styletron();

const App: React.FC = () => {
  return (
    <div
      style={{
        padding: "0px 1.0875rem 1.45rem",
        paddingTop: 0
      }}
    >
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <Route path="/" component={Header} />
            <Switch>
              <Route path="/" exact component={BlogList} />
            </Switch>
          </BaseProvider>
        </StyletronProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
