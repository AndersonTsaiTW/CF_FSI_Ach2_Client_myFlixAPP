import { createRoot } from 'react-dom/client';
import Container from 'react-bootstrap/Container';

import { MainView } from "./components/main-view/main-view";

import { Provider } from "react-redux";

import { store } from "./redux/store";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    // Wrap the app in the Redux Provider to make the Redux store available to all child components
    <Provider store={store}>
      <Container className="my-flix">
        <MainView />
      </Container>
    </Provider>

  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);