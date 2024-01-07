import { Layout } from "./components/layout";
import { Providers } from "./components/layout/providers";

export function App() {
  return (
    <Providers>
      <Layout />
    </Providers>
  );
}
