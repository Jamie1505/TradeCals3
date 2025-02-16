import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet,
ScrollView, Switch, Alert, } from 'react-native';
import Svg, { Rect, Circle, Polygon, Line, Text as SvgText } from 'react-native-svg';
import AreaLayout from '../../../../styles/architectlayout/Area'
import { useFavorites } from '../../../../hooks/FavoritesContext';
import { Fontisto } from '@expo/vector-icons';
import { MainScreenBackground } from '../../../../styles/customstyles/CustomStyles';

// Define the types for shapes
type ShapeType = 'Square' | 'Rectangle' | 'Circle' | 'Triangle';

// Define the interface for dimensions
interface Dimensions {
  length: number;
  width: number;
  radius: number;
}

// Reusable DimensionInput component
interface DimensionInputProps {
  label: string;
  value: number;
  onChange: (value: string) => void;
}

const DimensionInput: React.FC<DimensionInputProps> = ({ label, value, onChange }) => (
  <View style={AreaLayout.inputContainer}>
    <Text style={AreaLayout.inputLabel}>{label}:</Text>
    <TextInput
      style={AreaLayout.input}
      keyboardType="numeric"
      value={value === 0 ? '' : value.toString()}
      onChangeText={onChange}
      placeholder={`Enter ${label.toLowerCase()}`}
    />
  </View>
);

// Main ArchitectAreaScreen component
const ArchitectAreaScreen: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>('Square');
  const [dimensions, setDimensions] = useState<Dimensions>({ length: 0, width: 0, radius: 0 });
  const [area, setArea] = useState<number>(0);
  const [gridSize, setGridSize] = useState<number>(10); // Default grid size (10 meters)
  const [showMeasurements, setShowMeasurements] = useState<boolean>(true);
  const [showDiagonal, setShowDiagonal] = useState<boolean>(false);

  const maxGridSize = 100; // Maximum grid size of 10 meters

  const { addFavorite, favorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(favorites.includes('ArchitectArea'));

  // Function to add this screen to favorites
  const addToFavorites = () => {
    if (!isFavorite) {
      addFavorite('ArchitectArea');
      setIsFavorite(true);
      Alert.alert('Added to Favorites', 'This screen has been added to your favorites.');
    } else {
      Alert.alert('Already in Favorites', 'This screen is already in your favorites.');
    }
  };

  // Styles for SVG elements
  const svgStyles = {
    gridLine: {
      stroke: '#e0e0e0',
      strokeWidth: '0.1',
    },
    shape: {
      strokeWidth: '0.2',
    },
    shapeColors: {
      Square: {
        fill: 'rgba(173, 216, 230, 0.5)', // lightblue
        stroke: 'blue',
      },
      Rectangle: {
        fill: 'rgba(173, 216, 230, 0.5)', // lightblue
        stroke: 'blue',
      },
      Circle: {
        fill: 'rgba(144, 238, 144, 0.5)', // lightgreen
        stroke: 'green',
      },
      Triangle: {
        fill: 'rgba(240, 128, 128, 0.5)', // lightcoral
        stroke: 'red',
      },
    },
    diagonalLine: {
      stroke: '#ff6b6b', // light red
      strokeWidth: '0.2',
      strokeDasharray: '0.5, 0.5',
    },
  };

  // Function to calculate the area based on the selected shape
  const calculateArea = useCallback(() => {
    let calculatedArea = 0;
    switch (shape) {
      case 'Square':
        calculatedArea = dimensions.length ** 2;
        break;
      case 'Rectangle':
        calculatedArea = dimensions.length * dimensions.width;
        break;
      case 'Circle':
        calculatedArea = Math.PI * dimensions.radius ** 2;
        break;
      case 'Triangle':
        calculatedArea = (dimensions.length * dimensions.width) / 2;
        break;
      default:
        break;
    }
    setArea(Number(calculatedArea.toFixed(2)));
  }, [shape, dimensions]);

  // Function to calculate the diagonal based on the selected shape
  const calculateDiagonal = useCallback(() => {
    switch (shape) {
      case 'Square':
        
      case 'Rectangle':
        return Math.sqrt(dimensions.length ** 2 + dimensions.width ** 2).toFixed(2);
      case 'Circle':
        return (dimensions.radius * 2).toFixed(2);
      case 'Triangle':
        const a = dimensions.length;
        const b = dimensions.width;
        const c = Math.sqrt(a ** 2 + b ** 2);
        return c.toFixed(2);
      default:
        return '0';
    }
  }, [shape, dimensions]);

  // Function to handle dimension changes with validation
  const handleDimensionChange = (key: keyof Dimensions, value: string) => {
    const numValue = parseFloat(value) || 0;
    if (numValue > maxGridSize) {
      Alert.alert('Invalid Input', `Maximum ${key} is ${maxGridSize} meters.`);
      return;
    }
    setDimensions((prev) => ({ ...prev, [key]: numValue }));
  };

  // Render the selected shape with grid lines and optional measurements/diagonal
  const renderShape = useMemo(() => {
    const gridLines = [];
    for (let i = 1; i <= gridSize; i++) {
      gridLines.push(
        <Line
          key={`v-${i}`}
          x1={i}
          y1="0"
          x2={i}
          y2={gridSize}
          stroke={svgStyles.gridLine.stroke}
          strokeWidth={svgStyles.gridLine.strokeWidth}
        />
      );
      gridLines.push(
        <Line
          key={`h-${i}`}
          x1="0"
          y1={i}
          x2={gridSize}
          y2={i}
          stroke={svgStyles.gridLine.stroke}
          strokeWidth={svgStyles.gridLine.strokeWidth}
        />
      );
    }

    let shapeElement = null;
    let measurementElements = null;
    let diagonalElement = null;

    // Adjust dimensions to fit within grid size
    let adjustedLength = Math.min(dimensions.length, gridSize);
    let adjustedWidth = Math.min(dimensions.width, gridSize);
    let adjustedRadius = Math.min(dimensions.radius, gridSize / 2);

    switch (shape) {
        case 'Square':
          shapeElement = (
            <Rect
              x="0"
              y="0"
              width={adjustedLength}
              height={adjustedLength}
              fill={svgStyles.shapeColors[shape].fill}
              stroke={svgStyles.shapeColors[shape].stroke}
              strokeWidth={svgStyles.shape.strokeWidth}
            />
          );
          if (showMeasurements) {
            measurementElements = (
              <>
                {/* Horizontal Measurement */}
                <SvgText
                  x={adjustedLength / 2}
                  y="-0.5"
                  fontSize="0.5"
                  fill="#000"
                  textAnchor="middle"
                >
                  {adjustedLength}m
                </SvgText>
                {/* Vertical Measurement */}
                <SvgText
                  x="-0.5"
                  y={adjustedLength / 2}
                  fontSize="0.5"
                  fill="#000"
                  textAnchor="middle"
                  transform={`rotate(-90, -0.5, ${adjustedLength / 2})`}
                >
                  {adjustedLength}m
                </SvgText>
              </>
            );
          }
          if (showDiagonal) {
            diagonalElement = (
              <Line
                x1="0"
                y1="0"
                x2={adjustedLength}
                y2={adjustedLength}
                stroke={svgStyles.diagonalLine.stroke}
                strokeWidth={svgStyles.diagonalLine.strokeWidth}
                strokeDasharray={svgStyles.diagonalLine.strokeDasharray}
              />
            );
          }
          break;
        case 'Rectangle':
      case 'Rectangle':
        shapeElement = (
          <Rect
            x="0"
            y="0"
            width={adjustedWidth}
            height={adjustedLength}
            fill={svgStyles.shapeColors[shape].fill}
            stroke={svgStyles.shapeColors[shape].stroke}
            strokeWidth={svgStyles.shape.strokeWidth}
          />
        );
        if (showMeasurements) {
          measurementElements = (
            <>
              {/* Horizontal Measurement */}
              <SvgText
                x={adjustedWidth / 2}
                y="-0.5"
                fontSize="0.5"
                fill="#000"
                textAnchor="middle"
              >
                {adjustedWidth}m
              </SvgText>
              {/* Vertical Measurement */}
              <SvgText
                x="-0.5"
                y={adjustedLength / 2}
                fontSize="0.5"
                fill="#000"
                textAnchor="middle"
                transform={`rotate(-90, -0.5, ${adjustedLength / 2})`}
              >
                {adjustedLength}m
              </SvgText>
            </>
          );
        }
        if (showDiagonal) {
          diagonalElement = (
            <Line
              x1="0"
              y1="0"
              x2={adjustedWidth}
              y2={adjustedLength}
              stroke={svgStyles.diagonalLine.stroke}
              strokeWidth={svgStyles.diagonalLine.strokeWidth}
              strokeDasharray={svgStyles.diagonalLine.strokeDasharray}
            />
          );
        }
        break;

      case 'Circle':
        shapeElement = (
          <Circle
            cx={gridSize / 2}
            cy={gridSize / 2}
            r={adjustedRadius}
            fill={svgStyles.shapeColors.Circle.fill}
            stroke={svgStyles.shapeColors.Circle.stroke}
            strokeWidth={svgStyles.shape.strokeWidth}
          />
        );
        if (showMeasurements) {
          measurementElements = (
            <SvgText
              x={gridSize / 2}
              y={gridSize / 2 - adjustedRadius - 0.5}
              fontSize="0.5"
              fill="#000"
              textAnchor="middle"
            >
              {adjustedRadius}m
            </SvgText>
          );
        }
        if (showDiagonal) {
          diagonalElement = (
            <Line
              x1={gridSize / 2 - adjustedRadius}
              y1={gridSize / 2}
              x2={gridSize / 2 + adjustedRadius}
              y2={gridSize / 2}
              stroke={svgStyles.diagonalLine.stroke}
              strokeWidth={svgStyles.diagonalLine.strokeWidth}
              strokeDasharray={svgStyles.diagonalLine.strokeDasharray}
            />
          );
        }
        break;

      case 'Triangle':
        shapeElement = (
          <Polygon
            points={`0,${adjustedLength} ${adjustedWidth / 2},0 ${adjustedWidth},${adjustedLength}`}
            fill={svgStyles.shapeColors.Triangle.fill}
            stroke={svgStyles.shapeColors.Triangle.stroke}
            strokeWidth={svgStyles.shape.strokeWidth}
          />
        );
        if (showMeasurements) {
          measurementElements = (
            <>
              {/* Base Measurement */}
              <SvgText
                x={adjustedWidth / 2}
                y={adjustedLength + 0.5}
                fontSize="0.5"
                fill="#000"
                textAnchor="middle"
              >
                {adjustedWidth}m
              </SvgText>
              {/* Height Measurement */}
              <SvgText
                x="-0.5"
                y={adjustedLength / 2}
                fontSize="0.5"
                fill="#000"
                textAnchor="middle"
                transform={`rotate(-90, -0.5, ${adjustedLength / 2})`}
              >
                {adjustedLength}m
              </SvgText>
            </>
          );
        }
        if (showDiagonal) {
          diagonalElement = (
            <Line
              x1="0"
              y1={adjustedLength}
              x2={adjustedWidth / 2}
              y2="0"
              stroke={svgStyles.diagonalLine.stroke}
              strokeWidth={svgStyles.diagonalLine.strokeWidth}
              strokeDasharray={svgStyles.diagonalLine.strokeDasharray}
            />
          );
        }
        break;

      default:
        break;
    }

    return (
      <Svg height={250} width={250} viewBox={`-2 -2 ${gridSize + 4} ${gridSize + 4}`}>
        {/* Draw Grid Lines */}
        {gridLines}

        {/* Draw Shape */}
        {shapeElement}

        {/* Draw Measurements */}
        {measurementElements}

        {/* Draw Diagonal Line */}
        {diagonalElement}
      </Svg>
    );
  }, [
    shape,
    dimensions,
    gridSize,
    showMeasurements,
    showDiagonal,
    svgStyles.gridLine.stroke,
    svgStyles.gridLine.strokeWidth,
    svgStyles.shape.strokeWidth,
    svgStyles.shapeColors,
    svgStyles.diagonalLine.stroke,
    svgStyles.diagonalLine.strokeWidth,
    svgStyles.diagonalLine.strokeDasharray,
  ]);

  // Render dimension input fields based on the selected shape
  const renderDimensionInputs = () => {
    switch (shape) {
      case 'Circle':
        return (
          <DimensionInput
            label="Radius (m)"
            value={dimensions.radius}
            onChange={(value) => handleDimensionChange('radius', value)}
          />
        );
      case 'Square':
        return (
          <DimensionInput
            label="Side Length (m)"
            value={dimensions.length}
            onChange={(value) => handleDimensionChange('length', value)}
          />
        );
      default:
        return (
          <>
            <DimensionInput
              label="Length (m)"
              value={dimensions.length}
              onChange={(value) => handleDimensionChange('length', value)}
            />
            <DimensionInput
              label="Width (m)"
              value={dimensions.width}
              onChange={(value) => handleDimensionChange('width', value)}
            />
          </>
        );
    }
  };

  return (
    
    <SafeAreaView style={AreaLayout.container}>
      

      <TouchableOpacity
        style={styles.addButton}
        onPress={addToFavorites}
      >
        <Fontisto 
              name={isFavorite ? "favorite" : "favorite"} 
              size={28} 
              color={isFavorite ? "#FF3B30" : "#323232"} 
            />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={AreaLayout.scrollContent}>
        <View style={AreaLayout.shapeSelector}>

          {(['Square', 'Rectangle', 'Circle', 'Triangle'] as ShapeType[]).map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => setShape(item)}
              style={[
                AreaLayout.shapeButton,
                shape === item && AreaLayout.selectedShapeButton,
              ]}
            >
              <Text
                style={[
                    AreaLayout.shapeButtonText,
                  shape === item && AreaLayout.selectedShapeButtonText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Display Selected Shape */}
        <Text style={AreaLayout.label}>Selected Shape: {shape}</Text>

        {/* Dimension Inputs */}
        {renderDimensionInputs()}

        {/* Options */}
        <View style={AreaLayout.optionsContainer}>
          <View style={AreaLayout.optionItem}>
            <Text style={AreaLayout.optionLabel}>Grid Size:</Text>
            <TextInput
              style={AreaLayout.gridSizeInput}
              keyboardType="numeric"
              value={gridSize.toString()}
              onChangeText={(value) => {
                const num = parseInt(value);
                if (!isNaN(num) && num > 0 && num <= maxGridSize) {
                  setGridSize(num);
                } else {
                  Alert.alert(
                    'Invalid Input',
                    `Grid size must be between 1 and ${maxGridSize} meters.`
                  );
                }
              }}
              placeholder="10"
            />
          </View>
          <View style={AreaLayout.optionItem}>
            <Text style={AreaLayout.optionLabel}>Show Measurements:</Text>
            <Switch
              value={showMeasurements}
              onValueChange={setShowMeasurements}
            />
          </View>
          <View style={AreaLayout.optionItem}>
            <Text style={AreaLayout.optionLabel}>Show Diagonal:</Text>
            <Switch
              value={showDiagonal}
              onValueChange={setShowDiagonal}
            />
          </View>
        </View>

        {/* Render Shape */}
        {renderShape}

        {/* Calculate Area Button */}
        <TouchableOpacity style={AreaLayout.calculateButton} onPress={calculateArea}>
          <Text style={AreaLayout.calculateButtonText}>Calculate Area</Text>
        </TouchableOpacity>

        {/* Display Area */}
        <Text style={AreaLayout.areaText}>Area: {area} m²</Text>

        {/* Display Diagonal if enabled */}
        {showDiagonal && (
          <Text style={AreaLayout.diagonalText}>Diagonal: {calculateDiagonal()} m</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MainScreenBackground,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#a52a2a',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#a52a2a', // Active state background color
  },
});


export default ArchitectAreaScreen;
