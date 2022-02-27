import { Container } from 'react-bootstrap';

import OrderDetailsProvider from './context/OrderDetails';
import OrderEntry from './pages/entry/OrderEntry';

const App = () => (
  <Container>
    <OrderDetailsProvider>
      <OrderEntry />
    </OrderDetailsProvider>
  </Container>
);

export default App;
