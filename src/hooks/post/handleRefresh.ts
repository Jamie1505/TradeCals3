import { useEffect, useCallback, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, getDocs, Unsubscribe } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Questionbody, Reply } from '../../types/post/postTypes';

interface UseQuestionListenerProps {
  isFocused: boolean;
  bookmarks: string[];
  setQuestionarray: React.Dispatch<React.SetStateAction<Questionbody[]>>;
}

export const useQuestionListener = ({ isFocused, bookmarks, setQuestionarray }: UseQuestionListenerProps) => {
  console.log('useQuestionListener')
  
  // Keep track of the current unsubscribe function
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  // Function to fetch replies for a single question
  const fetchRepliesForQuestion = async (questionId: string): Promise<Reply[]> => {
    const repliesQuery = query(
      collection(db, 'replies', questionId, 'questionReplies'),
      orderBy('createdAt', 'asc')
    );

    const repliesSnapshot = await getDocs(repliesQuery);
   
    return repliesSnapshot.docs.map((replyDoc) => ({
      id: replyDoc.id,
      ...replyDoc.data() as Omit<Reply, 'id'>,
    }));
  };

  // Main function to start listening to questions
  const startListening = useCallback(() => {
    // Clean up any existing listener
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }

    const q = query(collection(db, 'questions'), orderBy('createdAt', 'asc'));
    
    // Create new listener
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const fetchedQuestions: Questionbody[] = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const questionData = doc.data() as Omit<Questionbody, 'id'>;
          const id = doc.id;
          const replies = await fetchRepliesForQuestion(id);
          
          return {
            id,
            ...questionData,
            replies,
            isBookmarked: bookmarks.includes(id),
            bookmarks: questionData.bookmarks || 0,
          } as Questionbody;
        })
      );

      setQuestionarray((prevQuestionarray) => {
        const isSame = JSON.stringify(fetchedQuestions) === JSON.stringify(prevQuestionarray);
        return isSame ? prevQuestionarray : fetchedQuestions;
      });
    });

    // Store the unsubscribe function
    unsubscribeRef.current = unsubscribe;
    
    // Return the unsubscribe function for manual cleanup
    return unsubscribe;
  }, [bookmarks, setQuestionarray]);

  // Function to stop listening
  const stopListening = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
  }, []);

  // Set up the listener when the component mounts or dependencies change
  useEffect(() => {
    if (!isFocused) {
      stopListening();
      return;
    }

    const unsubscribe = startListening();
    return () => unsubscribe();
  }, [isFocused, startListening, stopListening]);

  // Return functions to manually control the listener
  return {
    startListening,
    stopListening,
    refreshQuestions: startListening
  };
};