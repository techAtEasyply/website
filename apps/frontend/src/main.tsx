import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { ChakraProvider } from "@chakra-ui/react";

const clerkPubKey = "pk_test_ZGVjZW50LXBpZ2xldC03Ni5jbGVyay5hY2NvdW50cy5kZXYk";

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={clerkPubKey}
    frontendApi="pk_test_ZGVjZW50LXBpZ2xldC03Ni5jbGVyay5hY2NvdW50cy5kZXYk"
    navigate={(to) => window.history.pushState(null, "", to)}
  >
    <App />
  </ClerkProvider>
);
