import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback,
  Animated, NativeSyntheticEvent, TextInputContentSizeChangeEventData } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import { PROHIBITED_WORDS } from '../../../hooks/prohibitedWords';
import postlayout from '../../../styles/postlayout/PostLayout';
import { KeyboardAvoidingView } from 'react-native';
import 'react-native-get-random-values';
import {  auth, db } from '../../../hooks/firebaseConfig';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuestionSubmission } from '../../../hooks/post/handleSubmit'
import { useHandleReply } from '../../../hooks/post/handleReply';
import { useQuestionInteraction } from '../../../hooks/post/handleLikeDislike'
import { useQuestionBookmark } from '../../../hooks/post/handleBookmark';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { useQuestionListener } from '../../../hooks/post/handleRefresh';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../../types/TradeCalsMainTypes';
import { ProfileMenuStyle } from '../../../styles/menus/ProfileMenu';
import { Image } from 'react-native';

interface ActionButtonProps {
  iconName: keyof typeof Ionicons.glyphMap; // Ensures only valid Ionicons names
  isActive?: boolean;
  onPress: () => void;
}

interface Reply {
  id: string; text: string; createdAt: Timestamp;
}

//the types for the body of the question
interface Questionbody {
  profileImageString: string;
  username: string;
  [x: string]: any; 
  id: string; 
  text: string; 
  category: string; 
  bookmarks: number; 
  isBookmarked: boolean;
  lastActionAt: { [username: string]: number };
  userAction: { [username: string]: 'like' | 'dislike' | null };
  like: number;
  dislike: number; 
  createdAt: Timestamp; 
  replies: Reply[]; 
}

const MAX_QUESTIONS = 10;
const MAX_REPLIES = 100;
const TIME_LIMIT_HOURS = 24;
const WORD_LIMIT = 250;
const WORD_LIMIT_REPLY = 150;
const MAX_INPUT_HEIGHT = 200;

export const PostQuestionScreen = () => {
  console.log('PostQuestionScreen');
  //Hooks & State management - The useState hook creates and manages a piece of state
  const isFocused = useIsFocused(); // Checks if the screen is active or navigated to.
  const [questionbody, setQuestionbody] = useState(''); //Used to submit each question 
  const [questionarray, setQuestionarray] = useState<Questionbody[]>([]); // Initialize the question array to the list
  const [selectedCategory, setSelectedCategory] = useState('Architectural');
  const [replyTextById, setReplyTextById] = useState<{ [key: string]: string }>({});
  const [replyToQuestionId, setReplyToQuestionId] = useState<string | null>(null);
  const [submissionTimes, setSubmissionTimes] = useState<number[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDrawVisible, setIsDrawVisible] = useState(false);
  const slideDrawAnim = useRef(new Animated.Value(250)).current;
  const [questionInputHeight, setQuestionInputHeight] = useState(40);
  const [replyInputHeightById, setReplyInputHeightById] = useState<{ [key: string]: number }>({});
  const slideAnim = useRef(new Animated.Value(-350)).current;
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const pickerRef = useRef<Picker<string> | null>(null); // Ref with correct type for string values
  const [username, setUsername] = useState<string>('');

  const categories: string[] = ['Architectural', 'General Building', 'Electrical', 'Mechanical', 'Structural', 'Ask Anything', 'Bookmarks'];


  //Updates the setSelectedCategory state to reflect the users choice.
  //Hides the left Drawer when the user chooses a category.
  //If the selected category is bookmarks, its directly calls the loadBookmarks function -
  //to perform the necessary operations for that category
  //Declares and asynchronous function named handleCategorySelection that accepts -
  //category of type string and returns Promise<void>  
  const handleCategorySelection = async (category: string): Promise<void> => {
    //try { Opens a try block to handle code that might throw an error. it allows for safe -
    //exections of potentially failing operations. 
    try {
    //Updates the state variable setSelectedCategory(category); to the value of the category parameter.
    setSelectedCategory(category);
    hideLeftdraw();
    //State setting functions like this are commonly used to update ui elements dynamically.
    //const handleToggle = (value: boolean): void => {
    //setToggleState(value);
    //};
    //Checks if the selected category matches the string 'Bookmarks'. if ture, executes the block -
    //inside the codition
    //condition checks like this are crucial for triggering specific actions based on user input or app state
    //if (userRole === 'admin') {
    //showAdminPanel();
    //};
    if (category === 'Bookmarks') {
      await loadBookmarks(); // Directly call loadBookmarks if "Bookmarks" is selected
    } 
  } catch (error) {
    console.error("Failed to load Bookmarks", error);
  }
};

//Defines an async functions wrapped in useCallback. The useCallback hook ecsures that the function is only recreated-
//if the dependencies in the dependency array [] change. since the array is empty, the function-
//in memoized and wont be recreated unless the component unmounts or re-renders
//Use useCallback for expencive functions or functions passed as props to avoid unnecessary re-creation.
const loadBookmarks = useCallback(async () => {
  //you need and async function to use await and try - catch for error handling 
  //Promise<string> Promise<number> Promise<void>
  console.log("Loading bookmarks")
  try {
    //Fetches the value associated with the key 'Bookmarks' from AsyncStorage asynchronously.
    // Use AsyncStorage to persist lightweight data such as user preferences, settings, or session info.
    const savedBookmarks = await AsyncStorage.getItem('Bookmarks');
    //Updates the state boomarks with the parsed JSON value if savedBookmarks found; otherwise, its sets it to an empty array.
    //Parse data fetched from storage or an API before using it to ensure proper structure
    setBookmarks(savedBookmarks ? JSON.parse(savedBookmarks) : []);
    console.log("Loaded bookmarks")
  } catch (error) {
    console.error('Error loading bookmarks from AsyncStorage:', error);
  }
  //empty array
}, []);
  
  //useEffect to react to selectedCategory changes, if needed
  //useEffect hook is used for side effects such as data fetching, subscriptions, or manually updating the DOM.
  //The secound argument [selectedCategory] is the dependency array. The effect will run only when the selectedCategory changes.
  //Use useEffect whenever you need to perform an action (fetch data, update storage, etc) based on a chage in a variable.
  useEffect(() => {
    console.log("useEffect Bookmarks")
    if (selectedCategory === 'Bookmarks') {
      loadBookmarks();
    }
  }, [selectedCategory]);
//Initial State: The user selects a category (e.g., 'Bookmarks').
//Effect Trigger: When the selectedCategory changes, useEffect runs.
//Action: If the category is 'Bookmarks', the loadBookmarks function is called to 
{/*fetch the bookmarks from AsyncStorage and update the UI.*/}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This can submit function, defined using the useCallback hook, determines if a user can submit more questions based on a -
//set time limit and maximum number of allowed submissions
//useCallback - wraps the canSubmit function to memoize it - Ensures the function is not re-created on every render unless
//submissionTimes (dependency) changes 
  const canSubmit = useCallback(() => {
//To calculate the time difference between now and each recorded submission time.
//Use Date.now() whenever you need thr current time in millisecounds for comparisons or calculations.
    const now = Date.now();
//filter submissionTimes to kepp only the timestamps within the valid time range 
//the time range is defined by te TIME_LIMIT_HOURS, which is converted to millisecounds.
    const validSubmissions = submissionTimes.filter(
      (time) => now - time < TIME_LIMIT_HOURS * 60 * 60 * 1000
    );
//Checks if the number of valid submissions is less than the maximum allowed (MAX_QUESTIONS).
//Returns true if the user can submit more questions; otherwise false
    return validSubmissions.length < MAX_QUESTIONS;
  }, [submissionTimes]);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Converts the input to lowercase to make the comparison case-insensitive.
const containsProhibitedWords = useCallback(
  (text: string) => 
    PROHIBITED_WORDS.some((word) => 
      text.toLowerCase().includes(word.toLowerCase())),
  []
);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //This function counts the number of words in a given string and returns the count.
 //It uses useCallback for memoization to optimize performance in react functional comonents.
 //text.trim() Removes leading and trailing whitespace from the input string.
 //Splits the string into an array of substrings, using a regular expression (/\s+/) to match one or more whitespace characters.
 const countWords = useCallback((text: string) => {
    return text.trim().split(/\s+/).length;
  }, []);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//This function tggles the visibility of a form and triggers an animation to slide it in or out -
//using reacts Animated library. The function is memoized with useCallback for performance optimization.
//
const toggleForm = useCallback(() => {
//Updates the state variable isFormVisible by toggling its value true => false or false => true.
//Uses a function update pattern: (prev) => !prev
//prev holds the current state value
    setIsFormVisible((prev) => !prev);
    Animated.timing(slideAnim, {
      toValue: isFormVisible ? -350 : 0,
      duration: 350,
      useNativeDriver: true,
      //.start() starts the animations sequence
    }).start();
  }, [isFormVisible, slideAnim]);
/////////////////////////////////////////////////////////////////////////
const toggleLeftdraw = useCallback(() => {
  setIsDrawVisible((prev) => !prev); // Toggle visibility state
  Animated.timing(slideDrawAnim, {
    toValue: isDrawVisible ? 250 : 0, // Move drawer based on visibility
    duration: 250,
    useNativeDriver: true,
  }).start();
}, [isDrawVisible, slideDrawAnim]);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const hideLeftdraw = useCallback(() => {
  setIsDrawVisible(false); // Hide the drawer
  Animated.timing(slideDrawAnim, {
    toValue: 250, // Move the drawer off-screen
    duration: 250,
    useNativeDriver: true,
  }).start();
}, [slideDrawAnim]);
///////////////////////////////////////////////////////////////////////
//This function dynamically adjusts the height of a TextInput component in a react appliction -
//as the content size changes(e.g., when the user types or deletes text).
//event: NativeSyntheticEvent<TextInputContentSizeChangeEventData> the event object triggered when the content size of the TextInput changes.
//It contains information about the contentSize, which includes the height and width of the input content.

  const handleQuestionInputSizeChange = useCallback((event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    //event.nativeEvent.contentSize Extracts the contentSize property from the nativeEvent
    //contentSize provides the dimensions (width and height) of the text input's current content.
    const { height } = event.nativeEvent.contentSize;
    setQuestionInputHeight(height);
  }, []);
///////////////////////////////////////////////////////////////////////////

{/*When replying to a question this fuction changes the height of the input box */}
  const handleReplyInputSizeChange = useCallback((event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>, questionId: string) => {
    const { height } = event.nativeEvent.contentSize;
    setReplyInputHeightById((prev) => ({
      ...prev,
      [questionId]: height,
    }));
  }, []);
////////////////////////////////////////////////////////////////////////////

{/*Allows dots to be used in emails for firebase*/}

{/*changes icon based on user action*/}
//This defines a functional react component names ActionButton using typescript. it accepts props of type ActionButtonProps.
const ActionButton: React.FC<ActionButtonProps> = ({ iconName, isActive = false, onPress }) => (
  <TouchableOpacity
    style={{
      padding: 10,
      backgroundColor: isActive ? '#0b5394' : 'transparent',
      borderRadius: 50,
    }}
    onPress={onPress}
  >
    <Ionicons name={iconName} size={24} color={isActive ? '#fff' : '#0b5394'} />
  </TouchableOpacity>
);
//can you explain what each line is doing and how it can be used in other functions 
const { refreshQuestions } = useQuestionListener({
  isFocused,
  bookmarks,
  setQuestionarray
});
////////////////////////////////////////////////////////////////////////
const { handleLike } = useQuestionInteraction(setQuestionarray);
const { handleBookmark} = useQuestionBookmark({
  questionarray,
  setQuestionarray,
  setBookmarks,
});
const { handleReply } = useHandleReply({
  replyTextById,             
  replyToQuestionId,         
  currentUser: auth.currentUser,
  countWords,
  containsProhibitedWords,
  setReplyTextById,          
  setReplyInputHeightById,   
  setReplyToQuestionId,     
  setQuestionarray(value) {},    
});
const { handleSubmit } = useQuestionSubmission({
  questionbody,
  selectedCategory,
  setQuestionbody,
  setQuestionInputHeight,
  setSubmissionTimes,
  toggleForm,
  canSubmit,
  containsProhibitedWords,
  countWords
});

//the renderQuestion function displays the users question data
//handle submit adds the question data to the firestore 
const renderQuestion = useCallback(
  ({ item }: { item: Questionbody }) => (
      <View style={postlayout.questionContainer}>

        {/*Displays the users profile data*/}
          <View style={[ProfileMenuStyle.rowContainer, { alignItems: 'center' }]}>
            {/* Profile Image Container */}
            
                <Image source={{ uri: item.profileImage }} style={[ProfileMenuStyle.Profileimage, {marginRight: 10}]} />
                {/*<Text style={postlayout.questionText}>{item.profileImage}</Text>*/}
            <Text style={postlayout.questionText}>{item.username}</Text>
          </View>

        {/*Displays the users question*/}
        <Text style={postlayout.questionText}>{item.text ?? 'No text'}</Text>

        {/*Displays the number of likes and Bookmarks */}
        <View style={postlayout.statsContainer}>
          <Text style={postlayout.statText}>Likes: {item.like ?? 0}</Text>
          <Text style={postlayout.statText}>Bookmarks: {item.bookmarks ?? 0}</Text>
        </View>

        {/*Handling user input ie like and bookmark*/}
        <View style={postlayout.buttonContainer}>


        {/*When the user likes a question i want the like button background to change color*/}
        {/*the users like action is saved to fire base so if a users email matches the email on fire*/}
        <ActionButton
          iconName="thumbs-up"
          isActive={item.userAction?.username === 'like'} // Check using encoded email
          onPress={() => handleLike(item.id)}
        />

        <ActionButton
          iconName="bookmark"
          isActive={item.isBookmarked}
          onPress={() => handleBookmark(item.id)}
        />

        <ActionButton
          iconName="chatbubble-ellipses"
          isActive={item.ReplyInputHeightById}
          onPress={() => setReplyToQuestionId((prevId) => (prevId === item.id ? null : item.id))}
        />

        </View>

        {/*Handling replies*/}
        {replyToQuestionId === item.id && (

         <View>
        <TextInput
          style={[
            postlayout.input,
            { height: Math.min(MAX_INPUT_HEIGHT, Math.max(40, replyInputHeightById[item.id] || 40)) },
          ]}
          placeholder="Type your reply here..."
          value={replyTextById[item.id] || ''}
          multiline
          scrollEnabled={(replyInputHeightById[item.id] || 40) >= MAX_INPUT_HEIGHT}
          onChangeText={(text) => {
            if (countWords(text) <= WORD_LIMIT_REPLY) {
              setReplyTextById((prev) => ({ ...prev, [item.id]: text }));
            }
          }}
          onContentSizeChange={(event) => handleReplyInputSizeChange(event, item.id)}
        />

        <Text>{`${countWords(replyTextById[item.id] || '')}/${WORD_LIMIT_REPLY} words`}</Text>
        <TouchableOpacity
          style={postlayout.submitReplyButton}
          onPress={() => {
            handleReply();
            refreshQuestions();
          }}
        >
          <Text style={postlayout.submitReplyButtonText}>Submit Reply</Text>
        </TouchableOpacity>
      </View>
    )}

{item.replies.length > 0 && (
  <FlatList
    data={[...item.replies].reverse()} // Reversing the array to display the newest replies first
    renderItem={({ item }) => <Text style={postlayout.replyItem}>{item.text}</Text>}
    keyExtractor={(reply) => `${item.id}-${reply.id}`} // Ensure unique key for each reply
    style={postlayout.repliesList}
  />
)}
      </View>
  ),
  [
    handleLike,
    handleBookmark,
    replyToQuestionId,
    replyTextById,
    handleReply,
    countWords,
    handleReplyInputSizeChange,
  ]
);

//This function filters which category is selected
const filteredQuestions = useMemo(
  () =>
    (questionarray ?? []).filter((q) =>
      selectedCategory === 'Bookmarks' ? q.isBookmarked : q.category === selectedCategory
    ),
  [questionarray, selectedCategory]
);

//When theres no question to display, a message is displayed
const renderEmptyList = useCallback(() => (
  {/*<Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>*/}
), []);

return (
    <TouchableWithoutFeedback onPress={() => { hideLeftdraw(); }}>
      <View style={postlayout.container}>

        {/*Header*/}
        <View style={postlayout.headerContainer}>
          <Text style={postlayout.title}>{selectedCategory}</Text>
          <TouchableOpacity onPress={toggleLeftdraw} style={postlayout.LeftDraw}>
          <Feather name="menu" size={28} color="white" />
          </TouchableOpacity>
        </View>



        {/*Render Questions in a list*/}
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={filteredQuestions.slice().reverse()} // Ensure it only contains questions
              renderItem={renderQuestion}
              keyExtractor={(item) => item.id}
              style={postlayout.list}
              contentContainerStyle={{ paddingBottom:10 }}
              initialNumToRender={20} // Number of items to render initially
              maxToRenderPerBatch={30} // Maximum number of items to render per batch
              windowSize={20} // Number of items outside of the viewport to keep rendered
              //ListEmptyComponent={renderEmptyList} // Render when the list is empty
            />
          </View>
        </KeyboardAvoidingView>


        
        {/*Button to toggle the question form*/}
        <TouchableOpacity onPress={toggleForm} style={postlayout.toggleButton}>
        <Ionicons name={isFormVisible ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
        </TouchableOpacity>
        
        {/*Category Menu*/}
        <Animated.View style={[postlayout.DrawContainer, { transform: [{ translateX: slideDrawAnim }] }]}>
        <Text style={postlayout.DrawTitle}>Menu</Text>
        <ScrollView>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={postlayout.DrawButtons}
              onPress={() => handleCategorySelection(category)}
            >
              <Text style={postlayout.DrawButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}/>
        </ScrollView>
      <TouchableOpacity onPress={toggleLeftdraw} style={postlayout.DrawNotch}/>
      </Animated.View>

      {/*Drop down form to ask a question*/}
        <Animated.View style={[postlayout.formContainer, { transform: [{ translateY: slideAnim }] }]} >
          <Text style={postlayout.formTitle}>Post a Question to {selectedCategory}</Text>

          <TextInput
            style={[postlayout.input, { height: Math.min(MAX_INPUT_HEIGHT, Math.max(40, questionInputHeight)) }]}
            placeholder="Type your question here..."
            multiline
            scrollEnabled={questionInputHeight >= MAX_INPUT_HEIGHT}
            value={questionbody}
            onChangeText={(text) => {
              if (countWords(text) <= WORD_LIMIT) {
                setQuestionbody(text);
              }
            }}
            onContentSizeChange={handleQuestionInputSizeChange}
          />
          


          <TouchableOpacity 
            style={postlayout.submitButton} 
            onPress={() => {
              handleSubmit();
              toggleForm();
            }}
          >
          <Text style={postlayout.submitButtonText}>Submit Question</Text>
          </TouchableOpacity>
        </Animated.View>

      </View>
    </TouchableWithoutFeedback>
);
};
export default React.memo(PostQuestionScreen);

