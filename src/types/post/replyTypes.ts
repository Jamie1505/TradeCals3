export type HandleReplyParams = {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    replyToQuestionId: string | null;
    replyTextById: { [key: string]: string };
    setReplyTextById: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
    setReplyInputHeightById: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
    setReplyToQuestionId: React.Dispatch<React.SetStateAction<string | null>>;
    WORD_LIMIT_REPLY: number;
    countWords: (text: string) => number;
    containsProhibitedWords: (text: string) => boolean;
  };
  