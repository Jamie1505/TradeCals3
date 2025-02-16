import { ArchitectParamList } from "../../types/TradeCalsMainTypes";
import { ArchitectScreen } from "../../app/screens/Indexcenter";

export const handleFavoritePress = (screen: keyof ArchitectParamList) => {
    const isFavorite = favorites.includes(screen);
    
    if (!isFavorite) {
      addFavorite(screen);
    } else {
      removeFavorite(screen);
    }
  };
