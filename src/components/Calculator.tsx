import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import * as Clipboard from 'expo-clipboard'; // Clipboard import
import { evaluate } from 'mathjs'; // Math.js import for evaluation
import Layout from '../styles/componentlayouts/Calculator';
import * as Haptics from 'expo-haptics'; // Haptic feedback
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for saving history

const Calculator: React.FC = React.memo(() => {
  console.log('Calculator');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]); // History state
  const [memory, setMemory] = useState<number>(0); // Memory state for M+, MR, MC functions
  const [historyVisible, setHistoryVisible] = useState<boolean>(false); // Collapsible history toggle

  // Load input and history from AsyncStorage on component mount
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const savedInput = await AsyncStorage.getItem('calculatorInput');
        const savedHistory = await AsyncStorage.getItem('calculatorHistory');
        if (savedInput) {
          setInput(savedInput);
        }
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.log('Failed to load data from storage', error);
      }
    };

    loadStoredData();
  }, []);

  // Save history and input to AsyncStorage whenever they change
  useEffect(() => {
    const saveStoredData = async () => {
      try {
        if (input) await AsyncStorage.setItem('calculatorInput', input);
        if (history.length > 0) {
          await AsyncStorage.setItem('calculatorHistory', JSON.stringify(history));
        }
      } catch (error) {
        console.log('Failed to save data', error);
      }
    };
    saveStoredData();
  }, [input, history]);

  // Handle button press with haptic feedback
  const handleButtonPress = useCallback(
    (value: string) => {
      Haptics.selectionAsync(); // Haptic feedback on button press
      setInput(prevInput => prevInput + value);
    },
    []
  );

  // Handle clearing input and result
  const handleClear = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // Haptic feedback on clear
    setInput('');
    setResult('');
  }, []);

  // Handle deleting last character or clearing input with long press
  const handleDelete = useCallback(() => {
    if (input.length > 1) {
      setInput(prevInput => prevInput.slice(0, -1));
    } else {
      handleClear();
    }
  }, [input, handleClear]);

  // Handle calculation and add to history
  const handleCalculate = useCallback(() => {
    try {
      const evalResult = evaluate(input.replace('√', 'sqrt'));
      setResult(evalResult.toString());
      setHistory(prevHistory => [...prevHistory, `${input} = ${evalResult}`]); // Save in history
    } catch (error) {
      setResult('Invalid Expression');
      ToastAndroid.show('Error: Invalid Expression', ToastAndroid.SHORT); // Toast on error
    }
  }, [input]);

  // Handle copying input and result to clipboard
  const handleCopy = useCallback(() => {
    const textToCopy = `Input: ${input}\nResult: ${result}`;
    Clipboard.setStringAsync(textToCopy);
    ToastAndroid.show('Copied to clipboard!', ToastAndroid.SHORT); // Show toast after copying
  }, [input, result]);

  // Memory functions (M+, MR, MC)
  const handleMemoryAdd = useCallback(() => {
    const currentResult = parseFloat(result);
    if (!isNaN(currentResult)) {
      setMemory(prevMemory => prevMemory + currentResult);
      ToastAndroid.show('Added to memory', ToastAndroid.SHORT);
    }
  }, [result]);

  const handleMemoryRecall = useCallback(() => {
    setInput(memory.toString());
    ToastAndroid.show('Memory recalled', ToastAndroid.SHORT);
  }, [memory]);

  const handleMemoryClear = useCallback(() => {
    setMemory(0);
    ToastAndroid.show('Memory cleared', ToastAndroid.SHORT);
  }, []);

  // Handle clearing history
  const handleClearHistory = useCallback(async () => {
    setHistory([]);
    await AsyncStorage.removeItem('calculatorHistory');
    ToastAndroid.show('History cleared', ToastAndroid.SHORT);
  }, []);

  const buttonLayout = useMemo(
    () => [
      'M+', 'MR', 'MC', '/',
      '7', '8', '9', '*',
      '4', '5', '6', '-',
      '1', '2', '3', '+',
      '√', '0', 'C', '='
    ],
    []
  );

  return (
    <SafeAreaView style={Layout.containerCal}>
      <ScrollView contentContainerStyle={Layout.scrollViewContainerCal}>
        <View style={Layout.resultContainerCal}>
          <Text style={Layout.resultCal}>{result || input || '0'}</Text>
        </View>

        <TouchableOpacity onPress={() => setHistoryVisible(!historyVisible)}>
          <Text style={Layout.historyTitleCal}>
            {historyVisible ? 'Hide History' : 'Show History'}
          </Text>
        </TouchableOpacity>

        {historyVisible && (
          <View style={Layout.historyContainerCal}>
            {history.length > 0 ? (
              <>
                {history.map((item, index) => (
                  <Text key={index} style={Layout.historyItemCal}>{item}</Text>
                ))}
                <TouchableOpacity onPress={handleClearHistory} style={Layout.clearHistoryButtonCal}>
                  <Text style={Layout.clearHistoryButtonTextCal}>Clear History</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={Layout.noHistoryCal}>No history yet</Text>
            )}
          </View>
        )}

        <View style={Layout.buttonContainerCal}>
          {buttonLayout.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={Layout.buttonCal}
              onPress={() => {
                if (btn === '=') {
                  handleCalculate();
                } else if (btn === 'C') {
                  handleDelete();
                } else if (btn === 'Copy') {
                  handleCopy();
                } else if (btn === 'M+') {
                  handleMemoryAdd();
                } else if (btn === 'MR') {
                  handleMemoryRecall();
                } else if (btn === 'MC') {
                  handleMemoryClear();
                } else {
                  handleButtonPress(btn);
                }
              }}
              onLongPress={btn === 'C' ? handleClear : undefined} // Long press to clear all
            >
              <Text style={Layout.buttonTextCal}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default Calculator;
