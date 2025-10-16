import { useEffect, useState } from 'react';
import { useGetUserByQueryQuery } from '@/features/api/vault-api';
import { ApiResponse, AuthRow, UserDTO } from '@vault/core/types';

import './UserLookup.css';

type PropTypes = {
  setUser: (
    user: { user: UserDTO; relatedAuths: AuthRow[] } | undefined
  ) => void;
};

export function UserLookup({ setUser }: PropTypes) {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // actual term to query
  const [hasSearched, setHasSearched] = useState(false); // track if user has submitted

  const isPhone = /^\d{3}-?\d{3}-?\d{4}$/.test(searchTerm);
  const queryParams = isPhone
    ? { phone: searchTerm }
    : { username: searchTerm };

  const [response, setResponse] = useState<any>();

  const { data, isFetching, error } = useGetUserByQueryQuery(queryParams, {
    skip: !hasSearched || searchTerm.trim() === '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setResponse(undefined);
    setUser(undefined);

    // clear previous results and errors before new search
    setHasSearched(false);
    setSearchTerm(input.trim());

    // trigger query after a short async tick
    setTimeout(() => setHasSearched(true), 0);
  };

  useEffect(() => {
    const response = data as ApiResponse<{
      user: UserDTO;
      relatedAuths: AuthRow[];
    }>;

    setResponse(response);
    setUser({
      ...response?.data,
    });
  }, [data]);

  const shouldShowResults =
    !isFetching && hasSearched && response && response.data?.user;

  return (
    <section className='lookup-section'>
      <form onSubmit={handleSubmit} className='lookup-form'>
        <label htmlFor='userLookup' className='lookup-label'>
          User Lookup
        </label>

        <input
          id='userLookup'
          type='text'
          className='lookup-input'
          placeholder='Enter a phone number or username...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className='lookup-button' type='submit' disabled={isFetching}>
          {isFetching ? 'Searching…' : 'Search'}
        </button>
      </form>

      <div className='lookup-result'>
        {error && hasSearched && !isFetching && (
          <p className='error-text'>User not found.</p>
        )}

        {shouldShowResults && (
          <div className='user-card'>
            <h2>{response.data.user.displayName}</h2>
            <p>@{response.data.user.username}</p>
            {response.data.user.isArtist && (
              <span className='badge'>Artist</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
