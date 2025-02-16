//Functions 
{/*
    handleCategorySelection function
    const handleCategorySelection = async (category: string): Promise<void> => {
    try {
    setSelectedCategory(category);
    hideLeftdraw();
    if (category === 'Bookmarks') {
      await loadBookmarks(); // Directly call loadBookmarks if "Bookmarks" is selected
    } 
  } catch (error) {
    console.error("Failed to load Bookmarks", error);
  }
};
State Updates:
    const toggleTheme = (theme: string): void => {
  setAppTheme(theme);
};
Drawer or UI Control:
const handleCloseDrawer = (): void => {
  setDrawerOpen(false);
};
Asynchronous API Calls:
const fetchPosts = async (): Promise<void> => {
  try {
    const posts = await fetchPostsFromAPI();
    setPosts(posts);
  } catch (error) {
    console.error('Failed to fetch posts', error);
  }
};
Conditional Execution:
const handleButtonClick = (action: string): void => {
  if (action === 'like') {
    incrementLike();
  } else if (action === 'dislike') {
    incrementDislike();
  }
};
    */}
{/* 
    const loadBookmarks = useCallback(async () => {
  console.log("Loading bookmarks")
  try {
    const savedBookmarks = await AsyncStorage.getItem('bookmarks');
    setBookmarks(savedBookmarks ? JSON.parse(savedBookmarks) : []);
    console.log("Loaded bookmarks")
  } catch (error) {
    console.error('Error loading bookmarks from AsyncStorage:', error);
  }
}, []);
Fetching Data From an API:
const fetchPosts = useCallback(async () => {
  console.log("Fetching posts...");
  try {
    const response = await fetch('https://api.example.com/posts');
    const posts = await response.json();
    setPosts(posts || []);
    console.log("Posts fetched successfully");
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}, []);
Saving Data to AsyncStorage:
const saveBookmarks = useCallback(async (bookmarks) => {
  try {
    await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    console.log("Bookmarks saved successfully");
  } catch (error) {
    console.error("Error saving bookmarks to AsyncStorage:", error);
  }
}, []);
Loading User Preferences:
const loadPreferences = useCallback(async () => {
  try {
    const preferences = await AsyncStorage.getItem('preferences');
    setPreferences(preferences ? JSON.parse(preferences) : { theme: 'light' });
    console.log("Preferences loaded");
  } catch (error) {
    console.error("Error loading preferences:", error);
  }
}, []);
*/}
{/*
      useEffect(() => {
    console.log("useEffect bookmarks")
    if (selectedCategory === 'Bookmarks') {
      loadBookmarks();
    }
  }, [selectedCategory]);
  Fetching Data Based on User Input
  useEffect(() => {
  if (searchQuery) {
    fetchSearchResults(searchQuery);
  }
}, [searchQuery]);
Updating Local State When Props Change
useEffect(() => {
  if (userPreferences) {
    applyPreferences(userPreferences);
  }
}, [userPreferences]);
Triggering Animations on State Change
useEffect(() => {
  if (isModalVisible) {
    startAnimation();
  }
}, [isModalVisible]);
*/}
{/*
      const canSubmit = useCallback(() => {
    const now = Date.now();
    const validSubmissions = submissionTimes.filter(
      (time) => now - time < TIME_LIMIT_HOURS * 60 * 60 * 1000
    );
    return validSubmissions.length < MAX_QUESTIONS;
  }, [submissionTimes]);
  Rate-Limiting User Actions:
  const canSendMessage = useCallback(() => {
  const now = Date.now();
  const recentMessages = messageTimestamps.filter(
    (time) => now - time < 60 * 1000 // 1 minute
  );
  return recentMessages.length < MAX_MESSAGES_PER_MINUTE;
}, [messageTimestamps]);
Managing API Requests:
const canMakeRequest = useCallback(() => {
  const now = Date.now();
  const recentRequests = requestTimes.filter(
    (time) => now - time < 5 * 60 * 1000 // 5 minutes
  );
  return recentRequests.length < MAX_API_CALLS;
}, [requestTimes]);
Limiting Form Submissions:
const canSubmitForm = useCallback(() => {
  const now = Date.now();
  const recentSubmissions = formSubmissionTimes.filter(
    (time) => now - time < 24 * 60 * 60 * 1000 // 24 hours
  );
  return recentSubmissions.length < 3; // Max 3 submissions per day
}, [formSubmissionTimes]);
    */}
{/*
    const containsProhibitedWords = useCallback(
  (text: string) => PROHIBITED_WORDS.some((word) => text.toLowerCase().includes(word.toLowerCase())),
  []
);
Content Moderation
const containsOffensiveWords = useCallback(
  (comment: string) => OFFENSIVE_WORDS.some((word) => comment.toLowerCase().includes(word.toLowerCase())),
  []
);
Search Functionality
const matchesKeywords = useCallback(
  (query: string) => KEYWORDS.some((keyword) => query.toLowerCase().includes(keyword.toLowerCase())),
  []
);
Feature Flag Validation
const hasRestrictedFeatures = useCallback(
  (feature: string) => RESTRICTED_FEATURES.some((flag) => feature.toLowerCase().includes(flag.toLowerCase())),
  []
);
Spam Detection
const isSpam = useCallback(
  (message: string) => SPAM_TRIGGER_WORDS.some((word) => message.toLowerCase().includes(word.toLowerCase())),
  []
);
    */}
{/*
     const countWords = useCallback((text: string) => {
    return text.trim().split(/\s+/).length;
  }, []);
  Validating Minimum/Maximum Word Count
  const isWordCountValid = useCallback(
  (text: string) => {
    const wordCount = text.trim().split(/\s+/).length;
    return wordCount >= MIN_WORDS && wordCount <= MAX_WORDS;
  },
  []
);
Counting Sentences
const countSentences = useCallback((text: string) => {
  return text.split(/[.!?]+/).filter(Boolean).length; // Split by punctuation and remove empty entries
}, []);
Limiting Input
const isWithinWordLimit = useCallback(
  (text: string) => {
    const wordCount = text.trim().split(/\s+/).length;
    return wordCount <= MAX_ALLOWED_WORDS;
  },
  []
);
    */}
{/*
    const toggleForm = useCallback(() => {
    setIsFormVisible((prev) => !prev);
    Animated.timing(slideAnim, {
      toValue: isFormVisible ? -350 : 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [isFormVisible, slideAnim]);
  Sliding Menus
  Animated.timing(slideAnim, {
  toValue: isMenuVisible ? -250 : 0, // Adjust for menu size
  duration: 300,
  useNativeDriver: true,
    }).start();
    Notification Banners
    Animated.timing(bannerAnim, {
    toValue: isBannerVisible ? 0 : -100, // Slide down/up
    duration: 200,
    useNativeDriver: true,
    }).start();
    Modals
    Animated.timing(modalAnim, {
    toValue: isModalVisible ? 0 : 500, // Slide up/down
    duration: 400,
    useNativeDriver: true,
    }).start();
    */}
{/*
    const handleQuestionInputSizeChange = useCallback((event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    const { height } = event.nativeEvent.contentSize;
    setQuestionInputHeight(height);
  }, []);
  Dynamic Comment Boxes
  const handleCommentSizeChange = useCallback((event) => {
  const { height } = event.nativeEvent.contentSize;
  setCommentBoxHeight(height);
}, []);
Chat Message Inputs
Expand the height of a message input box as the user types more lines.
<TextInput
  multiline
  style={{ height: messageInputHeight }}
  onContentSizeChange={(e) =>
    setMessageInputHeight(e.nativeEvent.contentSize.height)
  }
/>
Feedback Forms
Adjust input box sizes based on the content length in real-time.
const handleFeedbackInputChange = useCallback((event) => {
  const { height } = event.nativeEvent.contentSize;
  setFeedbackInputHeight(height);
}, []);

    */}