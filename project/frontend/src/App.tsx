import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import Navbar from "./components/layouts/Navbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>

          {/* Professional Navbar */}
          <Navbar />

          {/* All Pages */}
          <AppRoutes />

        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;