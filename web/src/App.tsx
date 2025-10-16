import { useState } from 'react';
import { AuthRow, UserDTO } from '@vault/core/types';

import { AddAuthForm } from './components/AddAuthForm';
import { UserAuthList } from './components/UserAuthList';
import { UserLookup } from './components/UserLookup';

import './App.css';

function App() {
  const [user, setUser] = useState<
    | {
        user: UserDTO;
        relatedAuths: AuthRow[];
      }
    | undefined
  >();

  return (
    <main className='app'>
      <header className='app-header'>
        <h1>Vault CMS</h1>
      </header>

      <UserLookup setUser={setUser} />
      <UserAuthList user={user} />
      <AddAuthForm userId={user?.user?.id} />
    </main>
  );
}

export default App;
