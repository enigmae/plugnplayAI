import { Flow } from "./components";
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <div style={{ height: '100vh', width: '100hw' }}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Flow />
      </MantineProvider>
    </div>
  );
}

export default App;
