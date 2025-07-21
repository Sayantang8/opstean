
export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: "antibiotics",
    name: "Antibiotics",
    description: "Prescription antibiotics for bacterial infections",
    icon: "pill",
    color: "bg-blue-500"
  },
  {
    id: "eye-care", 
    name: "Eye Care",
    description: "Eye drops, solutions and vision care products",
    icon: "eye",
    color: "bg-green-500"
  },
  {
    id: "child-care",
    name: "Child Care", 
    description: "Pediatric medicines and child healthcare products",
    icon: "baby",
    color: "bg-pink-500"
  },
  {
    id: "cardio-care",
    name: "Cardio Care",
    description: "Cardiovascular medications and heart health products", 
    icon: "heart",
    color: "bg-red-500"
  },
  {
    id: "gastro",
    name: "Gastro",
    description: "Digestive health and gastrointestinal medications",
    icon: "activity",
    color: "bg-orange-500"
  },
  {
    id: "general-segment",
    name: "General Segment",
    description: "General healthcare and wellness products",
    icon: "plus",
    color: "bg-purple-500"
  },
  {
    id: "urology-care",
    name: "Urology Care",
    description: "Urological health and treatment products",
    icon: "activity",
    color: "bg-indigo-500"
  },
  {
    id: "pain-care",
    name: "Pain Care",
    description: "Pain management and relief medications",
    icon: "zap",
    color: "bg-red-600"
  },
  {
    id: "gyno-care",
    name: "Gyno Care",
    description: "Gynecological health and women's care products",
    icon: "heart",
    color: "bg-pink-600"
  },
  {
    id: "ortho-care",
    name: "Ortho Care",
    description: "Orthopedic and bone health products",
    icon: "shield",
    color: "bg-gray-600"
  },
  {
    id: "cold-care",
    name: "Cold Care",
    description: "Cold, flu and respiratory care products",
    icon: "thermometer",
    color: "bg-cyan-500"
  },
  {
    id: "neuro-care",
    name: "Neuro Care",
    description: "Neurological and brain health products",
    icon: "brain",
    color: "bg-violet-600"
  },
  {
    id: "derma-care",
    name: "Derma Care",
    description: "Dermatological and skin care products",
    icon: "sun",
    color: "bg-amber-500"
  }
];
