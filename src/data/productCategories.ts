
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
    icon: "heartbeat",
    color: "bg-red-500"
  },
  {
    id: "Gastro Care",
    name: "Gastro Care",
    description: "Digestive health and Gastro Careintestinal medications",
    icon: "stomach",
    color: "bg-orange-500"
  },
  {
    id: "general-segment",
    name: "General Care",
    description: "General healthcare and wellness products",
    icon: "plus",
    color: "bg-purple-500"
  },
  {
    id: "urology-care",
    name: "Uro Care",
    description: "Urological health and treatment products",
    icon: "droplets",
    color: "bg-indigo-500"
  },
  {
    id: "pain-care",
    name: "Pain Care",
    description: "Pain management and relief medications",
    icon: "bandage",
    color: "bg-red-600"
  },
  {
    id: "gyno-care",
    name: "Gyno Care",
    description: "Gynecological health and women's care products",
    icon: "fetus",
    color: "bg-pink-600"
  },
  {
    id: "ortho-care",
    name: "Ortho Care",
    description: "Orthopedic and bone health products",
    icon: "crossed-bones",
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
    id: "derma-care",
    name: "Derma Care",
    description: "Dermatological and skin care products",
    icon: "sun",
    color: "bg-amber-500"
  },
  {
    id: "cns-care",
    name: "CNS Care",
    description: "Central Nervous System care and neuropsychiatric products",
    icon: "brain",
    color: "bg-teal-600"
  }
];
