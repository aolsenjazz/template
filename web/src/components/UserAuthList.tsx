import { AuthRow, UserDTO } from '@vault/core/types';

import './UserAuthList.css';

interface UserAuthListProps {
  user: { user: UserDTO; relatedAuths: AuthRow[] } | undefined;
}

export function UserAuthList({ user }: UserAuthListProps) {
  const auths = user?.relatedAuths ?? [];

  return (
    <>
      {auths.length > 0 && (
        <div className='auth-list'>
          <h3>Auth Records</h3>
          <ul>
            {auths.map((auth) => (
              <li key={auth.id} className='auth-item'>
                <div className='auth-card'>
                  <div className='auth-details'>
                    <p>
                      <strong>ID:</strong> {auth.id}
                    </p>
                    <p>
                      <strong>Phone:</strong> {auth.phone}
                    </p>
                  </div>

                  <div className='auth-meta'>
                    <span className='auth-tag'>
                      Primary User ID: {auth.primaryUser}
                    </span>
                    {auth.lastSelectedUser !== auth.primaryUser && (
                      <span className='auth-tag subtle'>
                        Last Selected User ID: {auth.lastSelectedUser}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
