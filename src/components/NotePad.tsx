import React, { useState, useEffect, useCallback, memo } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, ToastAndroid,
    Keyboard, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../styles/componentlayouts/Notepad";

interface Note {
    id: number;
    title: string;
    content: string;
}

const NoteItem = memo(({ note, onPress }: { note: Note; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={Layout.noteTitle1}>{note.title}, {note.content}</Text>
    </TouchableOpacity>
));

const Notepad = () => {
    console.log('Notepad');
    const [notes, setNotes] = useState<Note[]>([]);
    const [note, setNote] = useState<Note>({ id: Date.now(), title: "", content: "" });
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [history, setHistory] = useState<Note[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem("notes");
            if (storedNotes) {
                setNotes(JSON.parse(storedNotes));
            }
        } catch (error) {
            ToastAndroid.show("Failed to load notes.", ToastAndroid.SHORT);
        }
    };

    const saveNotesToStorage = async (updatedNotes: Note[]) => {
        try {
            await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
        } catch (error) {
            ToastAndroid.show("Failed to save notes.", ToastAndroid.SHORT);
        }
    };

    const handleInputChange = (name: string, value: string) => {
        const updatedNote = { ...note, [name]: value };
        setNote(updatedNote);
        updateHistory(updatedNote);
    };

    const handleSaveNote = useCallback(() => {
        let updatedNotes: Note[];
        if (selectedNote) {
            updatedNotes = notes.map((item) =>
                item.id === selectedNote.id ? { ...item, title: note.title, content: note.content } : item
            );
        } else {
            const newNote: Note = { id: Date.now(), title: note.title, content: note.content };
            updatedNotes = [...notes, newNote];
        }

        setNotes(updatedNotes);
        saveNotesToStorage(updatedNotes);

        setNote({ id: Date.now(), title: "", content: "" });
        setSelectedNote(null);
        setModalVisible(false);
        Keyboard.dismiss();
        ToastAndroid.show("Note saved successfully!", ToastAndroid.SHORT);
    }, [note, selectedNote, notes, saveNotesToStorage]);

    const handleEditNote = useCallback((note: Note) => {
        setSelectedNote(note);
        setNote({ title: note.title, content: note.content, id: note.id });
        setModalVisible(true);
    }, []);

    const handleDeleteNote = useCallback(() => {
        const updatedNotes = notes.filter((item) => item.id !== selectedNote?.id);
        setNotes(updatedNotes);
        saveNotesToStorage(updatedNotes);

        setSelectedNote(null);
        setModalVisible(false);
        ToastAndroid.show("Note deleted successfully!", ToastAndroid.SHORT);
    }, [notes, selectedNote, saveNotesToStorage]);

    const updateHistory = (newNote: Note) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newNote);

        if (newHistory.length > 50) newHistory.shift();

        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
    };

    const handleUndo = () => {
        if (historyIndex > 0) {
            const prevNote = history[historyIndex - 1];
            setNote(prevNote);
            setHistoryIndex(historyIndex - 1);
        }
    };

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            const nextNote = history[historyIndex + 1];
            setNote(nextNote);
            setHistoryIndex(historyIndex + 1);
        }
    };

    const handleClearCache = async () => {
        try {
            await AsyncStorage.removeItem("notes");
            setNotes([]);
            ToastAndroid.show("Note cache cleared!", ToastAndroid.SHORT);
        } catch (error) {
            ToastAndroid.show("Failed to clear cache.", ToastAndroid.SHORT);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={Layout.containernote}>
                <FlatList
                    data={notes}
                    keyExtractor={(note) => note.id.toString()}
                    renderItem={({ item }) => <NoteItem note={item} onPress={() => handleEditNote(item)} />}
                    extraData={notes}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={Layout.addButtonnote}
                    onPress={() => {
                        setSelectedNote(null);
                        setNote({ id: Date.now(), title: "", content: "" });
                        setModalVisible(true);
                    }}
                >
                    <Text style={Layout.addButtonTextnote}>Add Note</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={Layout.clearButtonnote}
                    onPress={handleClearCache}
                >
                    <Text style={Layout.clearButtonTextnote}>Clear Note Cache</Text>
                </TouchableOpacity>

                <Modal visible={modalVisible} animationType="slide" transparent={false}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={Layout.modalContainernote}>
                            <View style={Layout.historyButtonContainernote}>
                                <Button
                                    title="Undo"
                                    onPress={handleUndo}
                                    disabled={historyIndex <= 0}
                                    color={historyIndex <= 0 ? "#ccc" : "#bf0000"}
                                />
                                <Button
                                    title="Redo"
                                    onPress={handleRedo}
                                    disabled={historyIndex >= history.length - 1}
                                    color={historyIndex >= history.length - 1 ? "#ccc" : "#0b5394"}
                                />
                            </View>

                            <TextInput
                                style={Layout.inputnote}
                                placeholder="Enter note title"
                                value={note.title}
                                onChangeText={(text) => handleInputChange("title", text)}
                            />

                            <TextInput
                                style={Layout.contentInputnote}
                                multiline
                                placeholder="Enter note content"
                                value={note.content}
                                onChangeText={(text) => handleInputChange("content", text)}
                            />

                            <View style={Layout.buttonContainernote}>
                                <Button title="Save" onPress={handleSaveNote} color="#0b5394" />
                                <Button title="Cancel" onPress={() => setModalVisible(false)} color="#bf0000" />
                                {selectedNote && (
                                    <Button title="Delete" onPress={handleDeleteNote} color="#FF9500" />
                                )}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Notepad;
