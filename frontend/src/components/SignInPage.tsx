import React, { useState } from 'react';
import { CornerDownRight, X } from 'lucide-react';
import axios from 'axios';

interface SignInPageProps {
  onAuthenticate: (password: string) => Promise<boolean>;
}

const SignInPage: React.FC<SignInPageProps> = ({ onAuthenticate }) => {
  const [password, setPassword] = useState('');
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === '') {
      setInvalidPassword(true);
    } else {
      setInvalidPassword(false);
      try {
        const authenticateResponse = onAuthenticate(password);
        if (!authenticateResponse) {
          setInvalidPassword(true);
        }
      } catch (error) {
        console.error('Error making POST request:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-2xl w-full mx-auto p-4 space-y-8">
        <h2 className="text-xl font-bold">Sign in</h2>
        <p className="text-gray-500">To use this app you will need to sign in. This is because LLMs aren't free and I'm not made of money :'(</p>
        <div className="pv-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter the password"
            className="w-full p-2 pr-10 border rounded-md"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handlePassword(e);
              }
            }}
          />
            <div className="flex items-center mt-2">
            {invalidPassword ? (
              <>
              <X size={20} className="text-red-500 mr-2" /> 
              <p className="text-sm text-gray-500">Invalid password</p>
              </>
            ) : (
              <>
              <CornerDownRight size={20} className="pr-2" />
              <p className="text-sm text-gray-500">Press Enter to sign in</p>
              </>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;