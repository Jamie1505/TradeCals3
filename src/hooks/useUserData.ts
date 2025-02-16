import { useEffect, useState, useMemo } from 'react';
import { auth } from './firebaseConfig'; // Adjust the path accordingly

const useUserData = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.email) {
          setEmail(user.email); // Set the email if it's available
          setError(null); // Clear any errors
        } else {
          setError('No email associated with this account');
        }
      } else {
        setEmail(null); // No user is logged in
        setError('User not logged in');
      }
      setLoading(false); // Set loading to false after the check
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Memoize the return value to prevent unnecessary re-renders
  const userData = useMemo(() => ({ email, loading, error }), [email, loading, error]);

  return userData;
};

export default useUserData;
