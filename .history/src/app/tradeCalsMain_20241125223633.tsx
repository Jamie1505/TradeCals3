// React and React Native imports
import React, { useMemo, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import 'react-native-get-random-values';
import Layout  from '../styles/mainlayout';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { ArchitectScreen, BuilderScreen, ElectricalEngineeringScreen,
  MechanicsScreen, StructuralScreen, TechnicalInfoScreen, 
  ArchitectAreaScreen, ArchitectVolumeScreen, ArchitectStructuralLoadScreen, ArchitectEnergyEfficiencyScreen,
  ArchitectStructuralDesignScreen, ArchitectLightingScreen,
  MasonryScreen, CarpentryScreen, ElectricalScreen, PlumbingScreen, RoofingScreen, PandDScreen, FlooringScreen,
  PlasteringScreen, TilingScreen, GroundWorkScreen, LandscapingScreen,
  ElectricalAcCircuitScreen, ElectricalBatteryScreen, ElectricalCircuitAnalysisScreen, ElectricalMotorGeneratorScreen,
  ElectricalOhmsLawScreen, ElectricalPowerScreen, ElectricalTransformerScreen,
  MechanicalBasicCals, MechanicalMOTScreen, MechanicalMyGarageScreen, MechanicalLearnScreen,
  StructuralBeamandColummScreen, StructuralFoundationsScreen, StructuralLoadScreen, StructuralReinforcedConcScreen,
  StructuralSpansScreen, StructuralTrussandFrameScreen, PdfScreen, TablesScreen, SignupProfileScreen
  , SigninScreen, PostQuestionScreen, SettingsScreen, ProfileScreen, 
  HomeScreen} from './screens/Indexcenter';
import { ContractScreen, CostingScreen, InvoiceScreen, LearnScreen, PlannerScreen } from './screens/subScreens/toolIndex'
import { FavoritesProvider } from '../components/FavoritesContext';
import Calculator from '../components/Calculator';
import Notepad from '../components/NotePad';
import { RootStackParamList } from '../types/TradeCalsMainTypes';
import MenuScreen from './menuScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PopupScreen  from './favPopUp';
import { getFocusedRouteNameFromRoute, NavigationProp, useNavigation } from '@react-navigation/native';
import ProfileMenuScreen from './ProfileMenu';
import PremiumScreen from './screens/mainScreens/Premium';
import { closeFavForm } from '../utils/forms/closefavform';
import { closeProfileForm } from '../utils/forms/closeprofileform';
import { openfavForm } from '../utils/forms/openfavForm';
import { OpenProfileForm } from '../utils/forms/openprofileform';
import { ProfileMenuButton } from '../utils/bottomtab/ProfileMenuButton';
import { CentralButton } from '../utils/bottomtab/CentralButton';

export type NavigationProps = StackNavigationProp<RootStackParamList>;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export interface CentralButtonProps {
  onPress: () => void; // Explicitly type the onPress prop
}

export interface ProfileMenuProps {
  onMenuPress: () => void; // Explicitly type the onPress prop
}

const SearchScreen = () => (
  <View style={{flex: 1}}>
    <Text>Search Screen</Text>
  </View>
);

  const TradeCalsMain = () => {
    const [isProfileFormVisible, setIsProfileFormVisible] = useState(false);

    
    const memoizedContent = useMemo(() => {
      return (
        <FavoritesProvider>
        <View style={Layout.flexy}>
        <BottomTab 
                    isProfileFormVisible={setIsProfileFormVisible} 
                />
        </View>
        </FavoritesProvider>
      );
    }, []);
  return memoizedContent;
};

const BottomTab = () => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isfavFormVisible, setIsfavFormVisible] = useState(false);
  const [isProfileFormVisible, setIsProfileFormVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          const isHidden = routeName === 'signin' || routeName === 'Architect';

          return {
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: isHidden
              ? { display: 'none' }
              : {
                  paddingTop: 5,
                  position: 'absolute',
                  backgroundColor: '#191919',
                  height: 50,
                  marginBottom: 10,
                  marginHorizontal: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#191919',
                },
          };
        }}
      >
        <Tab.Screen
          name="MenuStack"
          component={MainStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="menu" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="search" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="favPopup"
          options={{
            tabBarButton: (props) => <CentralButton 
            onPress={() => {
              if (!isfavFormVisible) {
                // Open the favorite form
                openfavForm(isfavFormVisible, setIsfavFormVisible, slideAnim);
                closeProfileForm(slideAnim, setIsProfileFormVisible); // Close profile form
              } else {
                // Close the favorite form
                closeFavForm(slideAnim, setIsfavFormVisible); // Correct the setter here
              }
            }} />,
          }}
        >
          {({ route, navigation }) => <PopupScreen />}
        </Tab.Screen>

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="setting" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarButton: (props) => <ProfileMenuButton 
            onMenuPress={() => {

              if (!isProfileFormVisible) {
                // Open the favorite form
                OpenProfileForm(isProfileFormVisible, setIsProfileFormVisible, slideAnim);
                closeFavForm(slideAnim, setIsfavFormVisible); // Close profile form
              } else {
                // Close the favorite form
                closeProfileForm(slideAnim, setIsProfileFormVisible); // Correct the setter here
              }
          }} />,
          }}
        >
          {({ route, navigation }) => (
            <ProfileMenuScreen />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      {isProfileFormVisible && (
    <ProfileMenuScreen 
        setIsProfileFormVisible={setIsProfileFormVisible} // Pass the setter
        slideAnim={slideAnim} // Pass slideAnim if needed
        navigation={navigation} // Pass the navigation prop if needed
    />
)}
{isfavFormVisible ? (
    <PopupScreen />
) : null}
    </>
  );
};

const MainStack = () => {
  return (
        <Stack.Navigator
          detachInactiveScreens={true}
          screenOptions={{
            headerStyle: {
              backgroundColor: '#323232',
              height: 40,
            }, // Apply custom header background styles
            headerTintColor: 'black', // Apply black color to the back button and icons
            headerTitleStyle: {
              color: 'white', // Set the header title color to black
              fontWeight: 'bold', // Optional: Add bold styling
              fontSize: 18, // Optional: Adjust font size
              paddingLeft: 10
            },
            headerLeft: ({ canGoBack, onPress }) =>
              canGoBack ? (
                <TouchableOpacity
                  onPress={onPress} // Trigger the built-in goBack functionality
                  style={{ paddingLeft: 10 }}
                >
                  <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
              ) : null, // Render nothing if there is no screen to go back to
          }}
        >
        {/*<Stack.Screen name="Tab" component={BottomTab} options={{ headerShown: false }} />*/}
        <Stack.Screen name="MainMenu" component={MenuScreen} options={{ headerShown: false }} />
        <Stack.Screen name="post" component={PostQuestionScreen}/>
        <Stack.Screen name="Architect" component={ArchitectScreen} options={{ title: 'Architect' }} />
        <Stack.Screen name="Builder" component={BuilderScreen} options={{ title: 'General Building' }}/>
        <Stack.Screen name="ElectricalEngineering" component={ElectricalEngineeringScreen} options={{ title: 'Electrical Engineering' }}/>
        <Stack.Screen name="Mechanics" component={MechanicsScreen} options={{ title: 'Mechanics' }}/>
        <Stack.Screen name="Structural" component={StructuralScreen} options={{ title: 'Structural Engineering' }}/>
        <Stack.Screen name="TechnicalInfo" component={TechnicalInfoScreen} options={{ title: 'Technical Information' }}/>
        {/* Tools Screens */}
        <Stack.Screen name="Contract" component={ContractScreen} options={{ title: 'Contract Builder' }}/>
        <Stack.Screen name="Costing" component={CostingScreen} options={{ title: 'Costing Builder' }}/>
        <Stack.Screen name="Invoice" component={InvoiceScreen} options={{ title: 'Invoice Builder' }}/>
        <Stack.Screen name="Learn" component={LearnScreen} options={{ title: 'Learn' }}/>
        <Stack.Screen name="Planner" component={PlannerScreen} options={{ title: 'Planner' }}/>

        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }}/>
        <Stack.Screen name="signin" component={SigninScreen} options={{ title: 'Sign In'}}/>
        <Stack.Screen name="settings" component={SettingsScreen} options={{ title: 'Settings' }}/>
        <Stack.Screen name="Calculator" component={Calculator} options={{ title: 'Calculator' }}/>
        <Stack.Screen name="Notepad" component={Notepad} options={{ title: 'Notepad' }}/>
        <Stack.Screen name="Premium" component={PremiumScreen} options={{ title: 'Premium' }}/>
        {/* Architect Screens */}
        <Stack.Screen name="ArchitectVolume" component={ArchitectVolumeScreen} options={{ title: 'Volume' }}/>
        <Stack.Screen name="ArchitectArea" component={ArchitectAreaScreen} options={{ title: 'Area' }}/>
        <Stack.Screen name="ArchitectStructural" component={ArchitectStructuralLoadScreen} options={{ title: 'Structural Load' }}/>
        <Stack.Screen name="ArchitectEnergyEfficiency" component={ArchitectEnergyEfficiencyScreen} options={{ title: 'Energy Efficiency' }}/>
        <Stack.Screen name="ArchitectStructuralDesign" component={ArchitectStructuralDesignScreen} options={{ title: 'Structural Design' }}/>
        <Stack.Screen name="ArchitectLighting" component={ArchitectLightingScreen} options={{ title: 'Lighting' }}/>
        {/* Builder Screens */}
        <Stack.Screen name="BuilderMasonry" component={MasonryScreen} options={{ title: 'Masonry' }}/>
        <Stack.Screen name="BuilderCarpentry" component={CarpentryScreen} options={{ title: 'Carpentry' }}/>
        <Stack.Screen name="BuilderElectrical" component={ElectricalScreen} options={{ title: 'Electrical' }}/>
        <Stack.Screen name="BuilderPlumbing" component={PlumbingScreen} options={{ title: 'Plumbing' }}/>
        <Stack.Screen name="BuilderRoofing" component={RoofingScreen} options={{ title: 'Roofing' }}/>
        <Stack.Screen name="BuilderPandD" component={PandDScreen} options={{ title: 'Painting and Decorating' }}/>
        <Stack.Screen name="BuilderFlooring" component={FlooringScreen} options={{ title: 'Flooring' }}/>
        <Stack.Screen name="BuilderPlastering" component={PlasteringScreen} options={{ title: 'Plastering' }}/>
        <Stack.Screen name="BuilderTiling" component={TilingScreen} options={{ title: 'Tiling' }}/>
        <Stack.Screen name="BuilderGroundsWork" component={GroundWorkScreen} options={{ title: 'Grounds Work' }}/>
        <Stack.Screen name="BuilderLandscaping" component={LandscapingScreen} options={{ title: 'Landscaping' }}/>
        {/* Electrical Screens */}
        <Stack.Screen name="ElectricalOhmsLaw" component={ElectricalOhmsLawScreen} options={{ title: 'Ohms Law' }}/>
        <Stack.Screen name="ElectricalBattery" component={ElectricalBatteryScreen} options={{ title: 'Battery' }}/>
        <Stack.Screen name="ElectricalMotorGenerator" component={ElectricalMotorGeneratorScreen} options={{ title: 'Motor and Generator' }}/>
        <Stack.Screen name="ElectricalPower" component={ElectricalPowerScreen} options={{ title: 'Power' }}/>
        <Stack.Screen name="ElectricalTransformer" component={ElectricalTransformerScreen} options={{ title: 'Transformer' }}/>
        <Stack.Screen name="ElectricalCircuitAnalysis" component={ElectricalCircuitAnalysisScreen} options={{ title: 'Circuit Analysis' }}/>
        <Stack.Screen name="ElectricalAcCircuit" component={ElectricalAcCircuitScreen} options={{ title: 'AC/DC Circuit' }}/>
        {/* Mechanic Screens */}
        <Stack.Screen name="MechanicalBasicCals" component={MechanicalBasicCals} options={{ title: 'Basic Calculations' }}/>
        <Stack.Screen name="MechanicalMOT" component={MechanicalMOTScreen} options={{ title: 'MOT Checker' }}/>
        <Stack.Screen name="MechanicalMyGarage" component={MechanicalMyGarageScreen} options={{ title: 'My Garage' }}/>
        <Stack.Screen name="MechanicalLearn" component={MechanicalLearnScreen} options={{ title: 'Learn' }}/>
        {/* Structural Screens */}
        <Stack.Screen name="StructuralBeamandColumm" component={StructuralBeamandColummScreen} options={{ title: 'Beam and Columm' }}/>
        <Stack.Screen name="StructuralFoundations" component={StructuralFoundationsScreen} options={{ title: 'Foundations' }}/>
        <Stack.Screen name="StructuralLoad" component={StructuralLoadScreen} options={{ title: 'Structural Load' }}/>
        <Stack.Screen name="StructuralReinforcedConc" component={StructuralReinforcedConcScreen} options={{ title: 'Reinforced Concrete' }}/>
        <Stack.Screen name="StructuralSpans" component={StructuralSpansScreen} options={{ title: 'Span' }}/>
        <Stack.Screen name="StructuralTrussandFrame" component={StructuralTrussandFrameScreen} options={{ title: 'Truss and Frame' }}/>
        {/* Miscellaneous Screens */}
        <Stack.Screen name="Tables" component={TablesScreen} options={{ title: 'Tables' }}/>
        <Stack.Screen name="Pdf" component={PdfScreen} options={{ title: 'Pdfs' }}/>
      </Stack.Navigator>
  );
};

export default TradeCalsMain;