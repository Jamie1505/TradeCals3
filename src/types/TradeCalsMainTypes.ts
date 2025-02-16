   export type ArchitectParamList = {
    ArchitectArea: undefined;
    ArchitectVolume: undefined;
    ArchitectStructural: undefined;
    ArchitectEnergyEfficiency: undefined;
    ArchitectStructuralDesign: undefined;
    ArchitectLighting: undefined;
  };
  
  export type BuilderParamList = {
    BuilderMasonry: undefined;
    BuilderCarpentry: undefined;
    BuilderElectrical: undefined;
    BuilderPlumbing: undefined;
    BuilderRoofing: undefined;
    BuilderPandD: undefined;  // Painting and Decorating?
    BuilderFlooring: undefined;
    BuilderPlastering: undefined;
    BuilderTiling: undefined;
    BuilderGroundsWork: undefined;
    BuilderLandscaping: undefined;
  };
  
  export type ElectricalParamList = {
    ElectricalOhmsLaw: undefined;
    ElectricalBattery: undefined;
    ElectricalMotorGenerator: undefined;
    ElectricalPower: undefined;
    ElectricalTransformer: undefined;
    ElectricalCircuitAnalysis: undefined;
    ElectricalAcCircuit: undefined;
  };
  
  export type MechanicParamList = {
    MechanicalBasicCals: undefined;
    MechanicalMOT: undefined;
    MechanicalMyGarage: undefined;
    MechanicalLearn: undefined;
  };
  
  export type StructuralParamList = {
    StructuralBeamandColumm: undefined;
    StructuralFoundations: undefined;
    StructuralLoad: undefined;
    StructuralReinforcedConc: undefined;
    StructuralSpans: undefined;
    StructuralTrussandFrame: undefined;
  };
  
  export type OtherScreensParamList = {
    Tables: undefined;
    Pdf: undefined;
    SignupProfile: undefined;
    premium: undefined;
    Notepad: undefined;
    Calculator: undefined;
  };
  
  export type RootStackParamList = {
    MainMenu: undefined;
    home: undefined;
    profile: undefined;
    signin: undefined;
    post: undefined;
    TechnicalInfo: undefined;
    HelpandFeedback: undefined;
    settings: undefined;
    Architect: undefined;
    Builder: undefined;
    ElectricalEngineering: undefined;
    Mechanics: undefined;
    Structural: undefined;
    Notepad: undefined;
    Calculator: undefined; 
    Premium: undefined; 
    Planner: undefined;
    Profile: undefined; 
    SignupProfile: undefined;
    ProfileMenu: undefined;
  } & ArchitectParamList & BuilderParamList & ElectricalParamList & MechanicParamList & StructuralParamList & OtherScreensParamList;

  export type MainMenuParamList = {
    SignupProfile: undefined;
    post: undefined;
    Architect: undefined;
    Builder: undefined;
    ElectricalEngineering: undefined;
    Mechanics: undefined;
    Structural: undefined;
    TechnicalInfo: undefined;
    Contract: undefined;
    Costing: undefined;
    Invoice: undefined;
    Learn: undefined;
    Planner: undefined;
  };