import { StyleSheet } from 'react-native';

const AreaLayout = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323232',
        zIndex:0
      },
      scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
      
      shapeSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
      },
      shapeButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        margin: 5,
        borderRadius: 5,
        minWidth: 100,
        alignItems: 'center',
      },
      selectedShapeButton: {
        backgroundColor: '#007BFF',
      },
      shapeButtonText: {
        color: '#333',
      },
      selectedShapeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      inputLabel: {
        fontSize: 16,
        color: '#555',
      },
      input: {
        width: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        textAlign: 'center',
        marginLeft: 10,
        backgroundColor: '#fff',
      },
      optionsContainer: {
        width: '100%',
        marginTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      optionLabel: {
        fontSize: 14,
        color: '#555',
      },
      gridSizeInput: {
        width: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        textAlign: 'center',
        backgroundColor: '#fff',
      },
      calculateButton: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        width: '60%',
        alignItems: 'center',
      },
      calculateButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      areaText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#333',
      },
      diagonalText: {
        fontSize: 16,
        marginTop: 10,
        color: '#555',
      },
});

export default AreaLayout;