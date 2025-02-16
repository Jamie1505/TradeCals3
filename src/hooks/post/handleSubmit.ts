import { serverTimestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { auth, db } from "../firebaseConfig";
import { Questionbody } from "../../types/post/postTypes";

// this file adds data to firebase when the user submits a question
const WORD_LIMIT = 500;
const MAX_QUESTIONS = 10;

interface QuestionSubmissionHookProps {
  questionbody: string;
  selectedCategory: string;
  setQuestionbody: (value: string) => void;
  setQuestionInputHeight: (height: number) => void;
  setSubmissionTimes: (callback: (prev: number[]) => number[]) => void;
  toggleForm: () => void;
  canSubmit: () => boolean;
  containsProhibitedWords: (text: string) => boolean;
  countWords: (text: string) => number;
  
}

export const useQuestionSubmission = ({
  questionbody,
  selectedCategory,
  setQuestionbody,
  setQuestionInputHeight,
  setSubmissionTimes,
  toggleForm,
  canSubmit,
  containsProhibitedWords,
  countWords,
}: QuestionSubmissionHookProps) => {

  const [username, setUsername] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'Users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUsername(userData.username || '');
        setProfileImage(userData.profileImage || null);
      }
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleSubmit = useCallback(async () => {
    try {
      if (!canSubmit()) {
        Alert.alert("Limit Reached", "You can only submit 10 questions every 24 hours.");
        return;
      }

      if (!questionbody.trim()) {
        Alert.alert("Empty Question", "Please enter a question.");
        return;
      }

      if (containsProhibitedWords(questionbody)) {
        Alert.alert("Inappropriate Content", "Your question contains inappropriate language.");
        return;
      }

      if (countWords(questionbody) > WORD_LIMIT) {
        Alert.alert("Word Limit Exceeded", `Your question exceeds the ${WORD_LIMIT} word limit.`);
        return;
      }

      if (selectedCategory === "Bookmarks") {
        Alert.alert("Invalid Category", 'You cannot submit questions to the "Bookmarks" category.');
        return;
      }

      const newQuestion: Omit<Questionbody, "id"> = {
        text: questionbody,
        category: selectedCategory,
        like: 0,
        bookmarks: 0,
        replies: [],
        username: username,  // Associate the question ID with the user's email for identification
        profileImage,
        createdAt: serverTimestamp(),
        userAction: []
      };

      await addDoc(collection(db, "questions"), newQuestion);

      setSubmissionTimes((prevTimes) => [...prevTimes, Date.now()].slice(-MAX_QUESTIONS));
      setQuestionbody("");
      setQuestionInputHeight(40);
      toggleForm();
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error adding question:", error);
      Alert.alert("Error", "Failed to submit question. Please try again.");
    }
  }, [
    questionbody,
    selectedCategory,
    canSubmit,
    containsProhibitedWords,
    countWords,
    username,
    profileImage,
    setQuestionbody,
    setQuestionInputHeight,
    setSubmissionTimes,
    toggleForm,
  ]);

  return { handleSubmit };
};
