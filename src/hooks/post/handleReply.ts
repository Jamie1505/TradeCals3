import { doc, collection, serverTimestamp, setDoc, query, orderBy, getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";
import { Alert, Keyboard } from "react-native";
import { db } from "../firebaseConfig";
import { User } from "firebase/auth";

// Types
interface Reply {
  id: string;
  text: string;
  username: string | null;
  createdAt: any;
}

interface Questionbody {
  id: string;
  replies?: Reply[];
}

interface ReplyTextById {
  [key: string]: string;
}

interface ReplyInputHeightById {
  [key: string]: number;
}

interface UseHandleReplyHookProps {
  replyTextById: ReplyTextById;
  replyToQuestionId: string | null;
  currentUser: User | null;
  countWords: (text: string) => number;
  containsProhibitedWords: (text: string) => boolean;
  setReplyTextById: React.Dispatch<React.SetStateAction<ReplyTextById>>;
  setReplyInputHeightById: React.Dispatch<React.SetStateAction<ReplyInputHeightById>>;
  setReplyToQuestionId: React.Dispatch<React.SetStateAction<string | null>>;
  setQuestionarray: React.Dispatch<React.SetStateAction<Questionbody[]>>;
}

const WORD_LIMIT_REPLY = 150;

export const useHandleReply = ({
  replyTextById,
  replyToQuestionId,
  currentUser,
  countWords,
  containsProhibitedWords,
  setReplyTextById,
  setReplyInputHeightById,
  setReplyToQuestionId,
  setQuestionarray,
}: UseHandleReplyHookProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReply = useCallback(async () => {
    if (!replyToQuestionId) {
      Alert.alert("Error", "No question selected for reply.");
      return;
    }

    const replyText = replyTextById[replyToQuestionId]?.trim();
    if (!replyText) {
      Alert.alert("Empty Reply", "Please enter a reply.");
      return;
    }

    if (countWords(replyText) > WORD_LIMIT_REPLY) {
      Alert.alert(
        "Word Limit Exceeded",
        `Your reply exceeds the ${WORD_LIMIT_REPLY}-word limit.`
      );
      return;
    }

    if (containsProhibitedWords(replyText)) {
      Alert.alert(
        "Inappropriate Content",
        "Your reply contains inappropriate language."
      );
      return;
    }

    const username = currentUser?.displayName || null;

    try {
      setIsLoading(true);

      // Reference to the new reply document
      const replyRef = doc(
        collection(db, "replies", replyToQuestionId, "questionReplies")
      );

      const newReply: Reply = {
        id: replyRef.id,
        text: replyText,
        username,
        createdAt: serverTimestamp(),
      };

      // Save the new reply
      await setDoc(replyRef, newReply);

      // Fetch updated replies
      const repliesRef = collection(
        db,
        "replies",
        replyToQuestionId,
      );
      const repliesQuery = query(repliesRef, orderBy("createdAt", "desc"));
      const repliesSnapshot = await getDocs(repliesQuery);

      const updatedReplies = repliesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Reply[];

      // Update the questions state
      setQuestionarray((prevQuestionarray) =>
        prevQuestionarray.map((q) =>
          q.id === replyToQuestionId
            ? { ...q, replies: updatedReplies }
            : q
        )
      );

      // Reset reply input
      setReplyTextById((prev) => ({
        ...prev,
        [replyToQuestionId]: "",
      }));
      setReplyInputHeightById((prev) => ({
        ...prev,
        [replyToQuestionId]: 40,
      }));
      setReplyToQuestionId(null);
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error adding reply:", error);
      Alert.alert("Error", "Failed to submit reply. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [
    replyTextById,
    replyToQuestionId,
    currentUser,
    countWords,
    containsProhibitedWords,
    setReplyTextById,
    setReplyInputHeightById,
    setReplyToQuestionId,
    setQuestionarray,
  ]);

  return { handleReply, isLoading };
};
