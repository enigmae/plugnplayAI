import { Flow } from "./components";
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <div style={{ height: '100vh', width: '100hw' }}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100hw' }}>
          <div style={{ display: 'flex', height: '100%', width: '15%', border: '1px solid black' }}>
            heloss
          </div>
          <div style={{ height: '100%', width: '85%', border: '1px solid red' }}>
            <Flow />
          </div>
        </div>
      </MantineProvider>
    </div>
  );
}

export default App;
