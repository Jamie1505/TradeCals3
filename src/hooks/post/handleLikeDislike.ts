import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { doc, getDoc, runTransaction } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Questionbody } from '../../../src/types/post/postTypes';

export const useQuestionInteraction = (setQuestionarray: React.Dispatch<React.SetStateAction<Questionbody[]>>) => {
  const [username, setUsername] = useState<string>('');
  const handleLike = useCallback(

    //This defines an asynchronous function that takes a STRING parameter,id
    //The id is likely the unique identifier for a specific question in firestore database
    async (id: string) => {
      try {
        //Ensures that the id is not null, undefined or empty. if it is, the function throws an error.
        if (!id?.trim()) throw new Error('Invalid question ID');
        //Creates a reference to the firestore document in the question colloection using the provided id.
        //This reference is used for reading or updating the specific question.
        const questionRef = doc(db, 'questions', id);
        //initializes a variable to keep track of wether the current operation is "toggling off" a like action.
        let isTogglingOff = false;
        //Initiates a Firestore transaction. Transactions ensure atomicity, meaning all operations -
        //within the transaction succeed or none do
        await runTransaction(db, async (transaction) => {
        //Reads the question document from firestore within the transaction.
          const questionDoc = await transaction.get(questionRef);
        //ensures the document exists. If it doesnt, the function throws an error
          if (!questionDoc.exists()) throw new Error('Question does not exist');
        //Retrives the data from the firestore document and casts it to the Question type
        //A predefined interface or type in typescript
          const questionData = questionDoc.data() as Questionbody;
        //Checks if the user (username) has already liked the question.
        //If they have, isTogglingoff is set to true, indercating that the current operation will remove the like.
          isTogglingOff = questionData.userAction?.[username] === 'like';
        //Prepares the updates to the document.
        //if toggling off the users action is removed (null) and the like count is decreased.
        //Otherwise, the users action is set to like and the count is increased.
          const updates = {
            [`userAction.${username}`]: 'like',
            like: (questionData.like ?? 0) + (isTogglingOff ? -1 : 1),
          };
        //Updates the document with the prepared changes within the transaction.
          transaction.update(questionRef, updates);
        });

        //Updates the question state by taking the current state (prevQuestion) and returning a new version with the necessary modifications.
        setQuestionarray((prevQuestionarray) =>
        //Loops through each question in the prevQuestion array and determines if it needs updating
          prevQuestionarray.map((questionbody) => {
        //If the current question does not match the id of the likes question, its returned unchanged.
            if (questionbody.id !== id) return questionbody;
        //Ensures that like is treated as a vaild number, defaulting to 0 if its null or undefined.
        //?? is a nullish coalecing operator, ensuring that only null or undefined are replaced, while preserving valid 0 values.
            const updatedLikes = questionbody.like ?? 0;
            return {
        //Creates anew object for the updated question
        //like - Adds or subtracts 1 from the list count, based on wether isTogglingoff is true (removing the like) or false(adding the like).
              ...questionbody,
              like: isTogglingOff ? updatedLikes - 1 : updatedLikes + 1,
              userAction: {
        //userAction - Updates the useraction property
        //if toggling off: Removes the uses like (null)
        //otherwise: Records the users like(like)
        //... Object speading - to ensure all other properties of the question object are preserved, only updating the specific fields.
                ...questionbody.userAction,
                [username]: isTogglingOff ? null : 'like',
              },
            };
          })
        );
      } catch (error) {
        console.error('Error updating like:', error);
        Alert.alert('Error', (error as Error).message || 'Failed to update your like.');
      }
    },
    //This is a dependency for the useCallback hook
    //Ensures that the function(handleLike) is only re-created if setQuestion changes 
    [setQuestionarray]
  );

  return { handleLike };
};

