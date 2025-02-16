import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons/build/Icons';

export const loadResourcesAndDataAsync = async () => {
  try {
    // Load icon fonts
    const iconFonts = {
      ...FontAwesome5.font,
      ...MaterialIcons.font,
      ...Entypo.font,
      ...AntDesign.font,
      ...MaterialCommunityIcons.font,
    };

    // Load custom fonts if needed
    const customFonts = {
      //require('../assets/fonts/SpaceMono-Regular.ttf'),
      // Uncomment and adjust the path above if you have custom fonts
    };

    // Combine all fonts
    const fontPromise = Font.loadAsync({
      ...iconFonts,
      ...customFonts,
    });

    // Preload assets (like images)
    const assetPromise = Asset.loadAsync([
     require('../../assets/images/Splash.png'),

     require('../assets/architecticons/area.png'),
     require('../assets/architecticons/volume.png'),
     require('../assets/architecticons/weight.png'),
     require('../assets/architecticons/efficiency.png'),
     require('../assets/architecticons/design.png'),
     require('../assets/architecticons/lighting.png'),

     require('../assets/buildericons/brick.png'),
     require('../assets/buildericons/carpentry.png'),
     require('../assets/buildericons/electical.png'),
     require('../assets/buildericons/plumbing.png'),
     require('../assets/buildericons/roofing.png'),
     require('../assets/buildericons/PandD.png'),
     require('../assets/buildericons/flooring.png'),
     require('../assets/buildericons/plastering.png'),
     require('../assets/buildericons/tiling.png'),
     require('../assets/buildericons/groundswork.png'),
     require('../assets/buildericons/landscaping.png'),

     require('../assets/electricalicons/ac.png'),
     require('../assets/electricalicons/battery.png'),
     require('../assets/electricalicons/circuit.png'),
     require('../assets/electricalicons/motor.png'),
     require('../assets/electricalicons/ohm.png'),
     require('../assets/electricalicons/power.png'),
     require('../assets/electricalicons/transformer.png'),

     require('../assets/structuralicons/column.png'),
     require('../assets/structuralicons/concrete.png'),
     require('../assets/structuralicons/foundation.png'),
     require('../assets/structuralicons/span.png'),
     require('../assets/structuralicons/truss.png'),

     require('../assets/tools/accounting.png'),
     require('../assets/tools/contract.png'),
     require('../assets/tools/invoicing.png'),
     require('../assets/tools/learn.png'),
     require('../assets/tools/topic.png'),

     require('../assets/menu/architect.png'),
     require('../assets/menu/builder.png'),
     require('../assets/menu/electric.png'),
     require('../assets/menu/information.png'),
     require('../assets/menu/mechanics.png'),
     require('../assets/menu/question.png'),
   
      // Uncomment and adjust the path above if you have this image
    ]);

    // Wait for all resources to load
    await Promise.all([fontPromise, assetPromise]);

  } catch (error) {
    console.warn('Error loading resources:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
};
