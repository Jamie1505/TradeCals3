import { runTransaction, doc, getDoc } from "firebase/firestore";
import { useCallback, useState, useRef } from "react";
import { auth, db } from "../firebaseConfig";
import { Questionbody } from "../../types/post/postTypes";

interface UseQuestionBookmarkProps {
  questionarray: Questionbody[];
  setQuestionarray: React.Dispatch<React.SetStateAction<Questionbody[]>>;
  setBookmarks: React.Dispatch<React.SetStateAction<string[]>>;
}

export const useQuestionBookmark = ({
  questionarray,
  setQuestionarray,
  setBookmarks,
}: UseQuestionBookmarkProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeoutRef = useRef<number | null>(null);

  const fetchUsername = useCallback(async () => {
    //Retrieves the current user
    //auth.currentUser Gets currently authenticated by user using firebase authentication.
    //if no user is authenticated (auth.currentUser is null) it throws an error to prevent further exection.
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    try {
    //Set up firestore reference
    //doc(db, 'Users', user.uid): constructs a reference to the firestore document in the Users collection
    //for the authenticated user (based on their uid)
      const userDocRef = doc(db, 'Users', user.uid);
    //Fetch the firestore document
    //getdoc(userDocRef): Fetches the documents from firestore
    //if the document doesnt exist (userDoc.exists() is false), it throws an error
          const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) throw new Error("User document does not exist");
    //Extracts the username
    //userDoc.data: Retrieves the document data as a object
    //userData?.username: Accesses the username field, if it exists 
    //?? null: Ensures the function returns null if username is not present in the document
      const userData = userDoc.data();
      return userData?.username ?? null;
    //Error handling 
    } catch (error) {
      console.error("Error fetching username:", error);
      throw new Error("Unable to fetch username");
    }
  }, []);

  const handleBookmark = useCallback(
    (id: string) => {
    //debounce to prevent rapid bookmarking 
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = window.setTimeout(async () => {
        setIsLoading(true);

        try {
          const questionIndex = questionarray.findIndex((q) => q.id === id);
          if (questionIndex === -1) throw new Error("Question not found");

          const currentQuestion = questionarray[questionIndex];
          const isCurrentlyBookmarked = currentQuestion.isBookmarked;

          const username = await fetchUsername();
          if (!username) throw new Error("User is not authenticated. Please log in.");

          const now = Date.now();

          await runTransaction(db, async (transaction) => {
            const questionRef = doc(db, "questions", id);
            const questionDoc = await transaction.get(questionRef);

            if (!questionDoc.exists()) throw new Error("Question does not exist");

            const questionData = questionDoc.data();
            const lastBookmarkAt = questionData?.lastBookmarkAt?.[username];

            if (lastBookmarkAt && now - lastBookmarkAt < 2000) {
              throw new Error("You are bookmarking too quickly. Please wait.");
            }

            const newBookmarkCount = isCurrentlyBookmarked
              ? questionData.bookmarks - 1
              : questionData.bookmarks + 1;
            
            //User bookmarked location
            transaction.update(questionRef, {
              bookmarks: newBookmarkCount,
              [`userAction.${username}.Bookmarked`]: now,
            });
          });

          // Update local state
          setQuestionarray((prevQuestionarray) =>
            prevQuestionarray.map((q) =>
                q.id === id
                    ? {
                          ...q,
                          isBookmarked: !isCurrentlyBookmarked,
                          bookmarks: q.bookmarks + (isCurrentlyBookmarked ? -1 : 1),
                      }
                    : q
            )
        );

          setBookmarks((prev) =>
            isCurrentlyBookmarked
              ? prev.filter((bookmarkId) => bookmarkId !== id)
              : [...prev, id]
          );
        } catch (error) {
          console.error("Error updating bookmarks:", error);
        } finally {
          setIsLoading(false);
        }
      }, 500); // Debounce delay
    },
    [questionarray, setQuestionarray, setBookmarks, fetchUsername]
  );

  return { handleBookmark, isLoading };
};
