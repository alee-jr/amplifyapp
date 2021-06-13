import React from "react";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import AddItem from "./components/Add";
import ListItems from "./components/List";
import "./App.css";
Amplify.configure(awsExports);

function App() {
  const [authState, setAuthState] = React.useState<any>();
  const [user, setUser] = React.useState<any>();
  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AddItem />
      <ListItems />
    </div>
  ) : (
    <div className="container">
      <div className="signIn">
        <AmplifyAuthenticator />
      </div>
    </div>
  );
}

export default App;
