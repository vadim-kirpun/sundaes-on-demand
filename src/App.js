import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import OrderDetailsProvider from './context/OrderDetails';

const pages = {
  inProgress: OrderEntry,
  review: OrderSummary,
  completed: OrderConfirmation,
};

const queryClient = new QueryClient();

const App = () => {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  const Page = pages[orderPhase];

  return (
    <QueryClientProvider client={queryClient}>
      <OrderDetailsProvider>
        <Container>
          <Page setOrderPhase={setOrderPhase} />
        </Container>
      </OrderDetailsProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
