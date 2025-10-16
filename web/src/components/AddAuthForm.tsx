import { useEffect, useState } from 'react';
import { useCreateAuthForUserMutation } from '@/features/api/vault-api';
import { ApiResponse, AuthRow } from '@vault/core/types';

import './AddAuthForm.css';

type AddAuthFormProps = {
  userId?: number;
  onAuthAdded?: (newAuth: AuthRow) => void;
};

export function AddAuthForm({ userId, onAuthAdded }: AddAuthFormProps) {
  const [phone, setPhone] = useState('');
  const [localError, setLocalError] = useState('');

  const [createAuth, { data, error, isLoading, isSuccess, reset }] =
    useCreateAuthForUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    if (!userId) return;

    e.preventDefault();
    setLocalError('');
    reset(); // clear previous mutation state

    const cleanPhone = phone.trim();
    if (cleanPhone === '') {
      setLocalError('Please enter a valid phone number.');
      return;
    }

    await createAuth({ userId, phone: cleanPhone });
  };

  // Handle mutation success
  useEffect(() => {
    if (isSuccess && data) {
      const response = data as ApiResponse<AuthRow>;
      setPhone('');
      onAuthAdded?.(response.data);
    }
  }, [isSuccess, data, onAuthAdded]);

  // Handle mutation error
  useEffect(() => {
    if (error) {
      console.error('Auth creation failed:', error);
      setLocalError('Failed to create auth. Please try again.');
    }
  }, [error]);

  return (
    <>
      {userId && (
        <form className='add-auth-form' onSubmit={handleSubmit}>
          <label htmlFor='newPhone'>Add New Auth</label>

          <div className='add-auth-row'>
            <input
              id='newPhone'
              type='text'
              placeholder='Enter phone number...'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='add-auth-input'
              disabled={isLoading}
            />
            <button
              type='submit'
              className='add-auth-button'
              disabled={isLoading || phone.trim() === ''}
            >
              {isLoading ? 'Adding…' : 'Add'}
            </button>
          </div>

          {/* Inline feedback */}
          {localError && <p className='error-text'>{localError}</p>}

          {isSuccess && data && (
            <p className='success-text'>✅ Auth created successfully!</p>
          )}
        </form>
      )}
    </>
  );
}
