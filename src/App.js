import { useState } from 'react';
import { Container } from 'react-bootstrap';

import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderDetailsProvider from './context/OrderDetails';

const pages = {
  inProgress: OrderEntry,
  review: OrderSummary,
  completed: OrderConfirmation,
};

const App = () => {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  const Page = pages[orderPhase];

  return (
    <OrderDetailsProvider>
      <Container>
        <Page setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
};

export default App;
