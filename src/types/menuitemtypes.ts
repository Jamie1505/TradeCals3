import { ImageSourcePropType } from "react-native";
import { ArchitectParamList, BuilderParamList, ElectricalParamList, MainMenuParamList, MechanicParamList, OtherScreensParamList, RootStackParamList, StructuralParamList } from "./TradeCalsMainTypes";

  export type StructuralItemTypes = {
    id: string;
    title: string;
    screen: keyof StructuralParamList;
    icon: ImageSourcePropType;
  };
  export type ArchitectItemTypes = {
    id: string;
    title: string;
    screen: keyof ArchitectParamList;
    icon: ImageSourcePropType;
  };
  export type BuilderItemTypes = {
    id: string;
    title: string;
    screen: keyof BuilderParamList;
    icon: ImageSourcePropType;
  };
  export type ElectricalItemTypes = {
    id: string;
    title: string;
    screen: keyof ElectricalParamList;
    icon: ImageSourcePropType;
  };
  export type MechanicalItemTypes = {
    id: string;
    title: string;
    screen: keyof MechanicParamList;
    icon: ImageSourcePropType;
  };
  export type TechnicalinfoItemTypes = {
    id: string;
    title: string;
    screen: keyof OtherScreensParamList;
    icon: ImageSourcePropType;
  };
  export type MenuItemType = {
    id: string;
    title: string;
    screen: keyof MainMenuParamList; // Ensures `screen` is a valid route
    icon: ImageSourcePropType;
    backgroundColor: string
};
