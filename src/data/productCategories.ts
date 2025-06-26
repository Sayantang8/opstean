
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
    id: "women-care",
    name: "Women Care",
    description: "Women's health and wellness products",
    icon: "user",
    color: "bg-teal-500"
  }
];
