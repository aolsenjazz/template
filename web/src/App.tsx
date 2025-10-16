import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { increaseBy, increment } from '@/features/counter/counter-slice';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <main className='app'>
      <h1>Vault.fm Boilerplate</h1>
      <p>React + TypeScript + Vite + Redux Toolkit</p>

      <div className='button-group'>
        <button className='btn' onClick={() => dispatch(increment())}>
          +1
        </button>

        <button className='btn' onClick={() => dispatch(increaseBy(5))}>
          +5
        </button>
      </div>

      <p className='count'>
        Count: <strong>{count}</strong>
      </p>
    </main>
  );
}

export default App;
