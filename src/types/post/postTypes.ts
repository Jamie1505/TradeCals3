import { FieldValue, Timestamp } from "firebase/firestore";

export interface Reply {
    id: string; text: string; createdAt: Timestamp;
  }
  
  export interface Questionbody {
    [x: string]: any; id: string; text: string; category: string; bookmarks: number; isBookmarked: boolean;
  
    lastActionAt: { [username: string]: number };
     userAction: { [username: string]: 'like' | 'dislike' | null };
     profileImageString: string;
    like: number; dislike: number; username: string; createdAt: Timestamp; replies: Reply[];
  }
  
  export type FirestoreUpdate = {
    [key: string]: FieldValue | number | string | null | { [key: string]: number | string | null };
  };