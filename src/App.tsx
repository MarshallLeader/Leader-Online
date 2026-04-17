/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 

  ShoppingCart,
  Monitor, 
  Laptop, 
  Server, 
  Cpu, 
  MapPin, 
  ShieldCheck, 
  Wrench, 
  ChevronRight, 
  ChevronDown,
  Menu, 
  X,
  ArrowRight,
  ArrowLeftRight,
  ExternalLink,
  Globe,
  Users,
  Zap,
  Battery,
  Sparkles,
  Shield,
  Rocket,
  Phone,
  Clock,
  Navigation,
  Wind,
  ChevronLeft,
  Search,
  Eye,
  Trash2,
  Plus,
  Minus,
  Ticket,
  Download,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from "lucide-react";
import logo from './assets/LeaderComputersLogo.png';
import { HashRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = (import.meta as any).env.VITE_GOOGLE_MAPS_API_KEY || '';

const deg2rad = (deg: number) => deg * (Math.PI / 180);
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const MapCircle = ({ center, radius }: { center: { lat: number, lng: number }, radius: number }) => {
  const map = useMap();
  useEffect(() => {
    if (!map || !(window as any).google?.maps) return;
    const circle = new (window as any).google.maps.Circle({
      strokeColor: "#FF6B00",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF6B00",
      fillOpacity: 0.1,
      map,
      center,
      radius: radius * 1000,
    });
    return () => circle.setMap(null);
  }, [map, center, radius]);
  return null;
};

const GoogleMapComponent = ({ resellers, className, selectedReseller, onSelectReseller, searchCenter, searchRadius }: { 
  resellers: typeof RESELLERS, 
  className?: string,
  selectedReseller: typeof RESELLERS[0] | null,
  onSelectReseller: (reseller: typeof RESELLERS[0] | null) => void,
  searchCenter?: { lat: number, lng: number },
  searchRadius?: number
}) => {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className={`bg-surface flex flex-col items-center justify-center text-center p-8 ${className}`}>
        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-4">
          <MapPin className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-primary mb-2 uppercase tracking-tight">Map Configuration Required</h3>
        <p className="text-muted text-sm max-w-xs mx-auto">Please provide a valid Google Maps API Key in the environment variables to enable the interactive map.</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full min-h-[400px] ${className}`}>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultCenter={{ lat: -25.2744, lng: 133.7751 }} // Center of Australia
          defaultZoom={4}
          mapId="da37f54822295a35" // Optional: Replace with your Map ID if you have one
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          {searchCenter && searchRadius && (
            <MapCircle center={searchCenter} radius={searchRadius} />
          )}

          {resellers.map((reseller) => (
            <AdvancedMarker
              key={reseller.id}
              position={reseller.coordinates}
              onClick={() => onSelectReseller(reseller)}
            >
              <Pin 
                background={reseller.stock === 'Out of Stock' ? '#94a3b8' : '#FF6B00'} 
                borderColor={'#ffffff'} 
                glyphColor={'#ffffff'}
              />
            </AdvancedMarker>
          ))}

          {selectedReseller && (
            <InfoWindow
              position={selectedReseller.coordinates}
              onCloseClick={() => onSelectReseller(null)}
            >
              <div className="p-2 min-w-[200px]">
                <h4 className="font-black text-primary text-sm mb-1 uppercase tracking-tight">{selectedReseller.name}</h4>
                <p className="text-[10px] text-muted mb-2">{selectedReseller.address}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                    selectedReseller.stock === 'In Stock' ? 'bg-green-100 text-green-600' : 
                    selectedReseller.stock === 'Limited Stock' ? 'bg-orange-100 text-orange-600' : 
                    'bg-red-100 text-red-600'
                  }`}>
                    {selectedReseller.stock}
                  </span>
                  <p className="text-[10px] font-bold text-primary">{selectedReseller.phone}</p>
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

const RESELLERS = [
  {
    id: 1,
    name: "Leader Computers Adelaide",
    address: "165-167 Richmond Rd, Richmond SA 5033",
    phone: "(08) 8112 6000",
    hours: "Mon-Fri: 9am-5:30pm",
    coordinates: { lat: -34.9337, lng: 138.5677 },
    stock: "In Stock"
  },
  {
    id: 2,
    name: "Leader Computers Sydney",
    address: "Unit 1, 1-3 Rodborough Rd, Frenchs Forest NSW 2086",
    phone: "(02) 9451 1714",
    hours: "Mon-Fri: 9am-5:30pm",
    coordinates: { lat: -33.7538, lng: 151.2345 },
    stock: "Limited Stock"
  },
  {
    id: 3,
    name: "Leader Computers Melbourne",
    address: "Unit 1, 10-12 Moreland Rd, East Brunswick VIC 3057",
    phone: "(03) 9380 6000",
    hours: "Mon-Fri: 9am-5:30pm",
    coordinates: { lat: -37.7645, lng: 144.9732 },
    stock: "In Stock"
  },
  {
    id: 4,
    name: "Leader Computers Brisbane",
    address: "Unit 1, 15-17 South Pine Rd, Brendale QLD 4500",
    phone: "(07) 3881 1288",
    hours: "Mon-Fri: 9am-5:30pm",
    coordinates: { lat: -27.3245, lng: 152.9876 },
    stock: "Out of Stock"
  },
  {
    id: 5,
    name: "Leader Computers Perth",
    address: "Unit 1, 19-21 Belmont Ave, Belmont WA 6104",
    phone: "(08) 9479 4000",
    hours: "Mon-Fri: 9am-5:30pm",
    coordinates: { lat: -31.9456, lng: 115.9234 },
    stock: "In Stock"
  }
];

const CATEGORIES = [
  { id: 'notebooks', name: 'Notebooks', icon: Laptop },
  { id: '2-in-1', name: '2-in-1 / Tablets', icon: Laptop },
  { id: 'mini-pc', name: 'Mini PCs', icon: Server },
  { id: 'corporate', name: 'Corporate', icon: ShieldCheck },
  { id: 'pc-stick', name: 'PC Stick', icon: Cpu },
  { id: 'aio', name: 'All-in-Ones', icon: Monitor },
];

const COPILOT_PRODUCTS = [
  { 
    id: 1, 
    name: "AI Companion Copilot+ PC SCU4-C1", 
    sku: "SCU4-C1-U516P", 
    category: "Copilot+ PCs", 
    price: 2599, 
    ram: "16GB", 
    cpu: "Intel® Core™ Ultra 5 226V", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SCU4-C1_-C-cover-4-r2moqcywn24k6n5iq930c7w9qwmzp3qou2o3xwlu68.png",
    highlights: [
      "14\" FHD+ 16:10 WVA Display",
      "Intel® Core™ Ultra 5 Processor",
      "Up to 22 Hours Battery Life",
      "Ultra-Lightweight 1.15kg",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ Ultra 5 Processor 226V, 8M Cache, up to 4.50 GHz",
      ai: "40 TOPS",
      memory: "16GB DDR5 LPDDR5X 8533MHz",
      storage: "1TB M.2 NVMe Gen4 SSD",
      graphics: "Intel® Arc™ Graphics 130V",
      display: "14\" FHD+ (1920×1200) 16:10 WVA N7, 60Hz",
      ports: "1× Thunderbolt 4 combo, 1× USB-C 3.2 Gen 2, 1× USB-A 3.2 Gen 2, 1× USB-A 3.2 Gen 1, 1× HDMI, 1× Audio jack",
      networking: "Intel Dual Band Wireless Wi-Fi 6E AX211",
      weight: "1.15 kg",
      battery: "Up to 22 hours (73Wh Polymer Li-Ion)",
      dimensions: "312.5(W) × 223(D) × 16.9–18.3(H) mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 2, 
    name: "AI Companion Copilot+ PC SCU4-C1", 
    sku: "SCU4-C1-U732P", 
    category: "Copilot+ PCs", 
    price: 2999, 
    ram: "32GB", 
    cpu: "Intel® Core™ Ultra 7 258V", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SCU4-C1_-C-cover-4-r2moqcywn24k6n5iq930c7w9qwmzp3qou2o3xwlu68.png",
    highlights: [
      "14\" FHD+ 16:10 WVA Display",
      "Intel® Core™ Ultra 7 Processor",
      "Up to 22 Hours Battery Life",
      "Ultra-Lightweight 1.15kg",
      "Windows 11 Professional"
    ],
    specs: {
      ai: "47 TOPS",
      memory: "32GB DDR5 LPDDR5X 8533MHz",
      storage: "1TB M.2 NVMe Gen4 SSD",
      graphics: "Intel® Arc™ Graphics 140V",
      display: "14\" FHD+ (1920×1200) 16:10 WVA N7, 60Hz",
      ports: "1× Thunderbolt 4 combo, 1× USB-C 3.2 Gen 2, 1× USB-A 3.2 Gen 2, 1× USB-A 3.2 Gen 1, 1× HDMI, 1× Audio jack",
      networking: "Intel Dual Band Wireless Wi-Fi 6E AX211",
      weight: "1.15 kg",
      battery: "Up to 22 hours (73Wh Polymer Li-Ion)",
      dimensions: "312.5(W) × 223(D) × 16.9–18.3(H) mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 3, 
    name: "16\" AI Companion Copilot+ PC SCU6-C2", 
    sku: "SCU6-C2-U516H", 
    category: "Copilot+ PCs", 
    price: 2649, 
    ram: "16GB", 
    cpu: "Intel® Core™ Ultra 5 226V", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/L260TU_front-qyc3z6cotnu6sjdi4zury3g4q3jlr0tt6rwp89ne2o.png",
    highlights: [
      "16\" QHD+ 144Hz Display",
      "Magnesium Alloy Chassis",
      "Up to 18 Hours Battery Life",
      "Lightweight 1.42kg",
      "Windows 11 Home"
    ],
    specs: {
      processor: "Intel® Core™ Ultra 5 Processor 226V, 8M Cache, up to 4.50 GHz",
      memory: "16GB DDR5 LPDDR5X 8533MHz (onboard)",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® Arc™ Graphics 130V",
      display: "16\" QHD+ (2560×1600) 144Hz",
      ports: "1× USB 3.2 Gen 1, 1× USB 3.2 Gen 2, 1× USB-C 3.2 Gen 2, 1× Thunderbolt 4, 1× HDMI, 1× Audio jack",
      networking: "Intel Dual Band Wireless Wi-Fi 6E AX211 + Bluetooth",
      chassis: "Magnesium Alloy",
      battery: "Up to 18 hours",
      weight: "1.42 kg",
      dimensions: "358(W) × 253(D) × 18.5–19.6(H) mm",
      os: "Windows 11 Home",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 4, 
    name: "16\" AI Companion Copilot+ PC SCU6-C2", 
    sku: "SCU6-C2-U516P", 
    category: "Copilot+ PCs", 
    price: 2749, 
    ram: "16GB", 
    cpu: "Intel® Core™ Ultra 7 256V", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SCU6-C2-PRO_front-1024x1024-2-qycj4yd33kyu1klo6etd7vc9vbh246j1w4j7r6f37k.png",
    highlights: [
      "16\" QHD+ 144Hz Display",
      "Magnesium Alloy Chassis",
      "Up to 18 Hours Battery Life",
      "Lightweight 1.42kg",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ Ultra 7 Processor 256V, 12M Cache, up to 4.80 GHz",
      memory: "16GB DDR5 LPDDR5X 8533MHz (onboard)",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® Arc™ Graphics 140V",
      display: "16\" QHD+ (2560×1600) 144Hz",
      ports: "1× USB 3.2 Gen 1, 1× USB 3.2 Gen 2, 1× USB-C 3.2 Gen 2, 1× Thunderbolt 4, 1× HDMI, 1× Audio jack",
      networking: "Intel Dual Band Wireless Wi-Fi 6E AX211 + Bluetooth",
      chassis: "Magnesium Alloy",
      battery: "Up to 18 hours",
      weight: "1.42 kg",
      dimensions: "358(W) × 253(D) × 18.5–19.6(H) mm",
      os: "Windows 11 Home",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 5, 
    name: "16\" AI Companion Copilot+ PC SCU6-C2", 
    sku: "SCU6-C2-U732P", 
    category: "Copilot+ PCs", 
    price: 3199, 
    ram: "16GB", 
    cpu: "Intel® Core™ Ultra 7 256V", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SCU6-C2-PRO_front-1024x1024-5-qycj9kqip9al4jw06wqbz7cv0ip0ylvjj005p5kem8.png",
    highlights: [
      "16\" QHD+ 144Hz Display",
      "Magnesium Alloy Chassis",
      "Up to 18 Hours Battery Life",
      "32GB LPDDR5X Memory",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ Ultra 7 Processor 256V, 12M Cache, up to 4.80 GHz",
      memory: "16GB DDR5 LPDDR5X 8533MHz (onboard)",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® Arc™ Graphics 140V",
      display: "16\" QHD+ (2560×1600) 144Hz",
      ports: "1× USB 3.2 Gen 1, 1× USB 3.2 Gen 2, 1× USB-C 3.2 Gen 2, 1× Thunderbolt 4, 1× HDMI, 1× Audio jack",
      networking: "Intel Dual Band Wireless Wi-Fi 6E AX211 + Bluetooth",
      chassis: "Magnesium Alloy",
      battery: "Up to 18 hours",
      weight: "1.42 kg",
      dimensions: "358(W) × 253(D) × 18.5–19.6(H) mm",
      os: "Windows 11 Home",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  }
];

const UPGRADE_OPTIONS = {
  ram: [
    { id: '16gb', label: "16GB DDR5", price: 0 },
    { id: '32gb', label: "32GB DDR5", price: 200 },
    { id: '64gb', label: "64GB DDR5", price: 500 },
  ],
  storage: [
    { id: '512gb', label: "512GB NVMe SSD", price: 0 },
    { id: '1tb', label: "1TB NVMe SSD", price: 150 },
    { id: '2tb', label: "2TB NVMe SSD", price: 350 },
  ],
  os: [
    { id: 'win11h', label: "Windows 11 Home", price: 0 },
    { id: 'win11p', label: "Windows 11 Professional", price: 0 },
  ]
};

const ALL_PRODUCTS = [
  { 
    id: 6, 
    name: "Breeze SCE4-B1 Pro Notebook", 
    sku: "SCE4-B1-C4P", 
    category: "notebooks", 
    price: 449, 
    ram: "4GB", 
    cpu: "Intel® Celeron® N4020C", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SCE4-B1_05-3-qzk2pbz4yyn03rf9q488fuu26tgqp85pmgq0p3ki68.png",
    highlights: [
      "14\" TN HD 1366x768 Display",
      "Lightweight and Portable",
      "Up to 8 Hour Battery Life",
      "Dual Band Wi-Fi AC",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Celeron® N4020C",
      memory: "4GB DDR4",
      storage: "128GB eMMC",
      graphics: "Intel® UHD Graphics 600",
      display: "14\" TN HD 1366×768",
      ports: "2× USB 3.0, 1× DC, 1× 3.5mm headphone jack, 1× 3.5mm microphone jack, 1× Standard HDMI Type-A, 1× Kensington lock",
      card_reader: "TF Card Reader",
      connectivity: "Dual Band Wi-Fi AC + Bluetooth 5.0",
      battery: "Up to 8 hours (7.4V, 5000mAh)",
      weight: "1.4 kg",
      dimensions: "329.1 × 216.7 × 18.7 mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Onsite"
    }
  },
  { 
    id: 7, 
    name: "15.6\" Companion SCE5-H1 Notebook", 
    sku: "SCE5-H1-C4P", 
    category: "notebooks", 
    price: 499, 
    ram: "4GB", 
    cpu: "Intel® Celeron® N4020", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/6_PRO-qzk38mlv9j1wflea1yhj4hjp6kczpjrclytuckykg0.png",
    highlights: [
      "15.6\" IPS Full HD Display",
      "180° Flat-Fold Hinge",
      "Up to 8 Hour Battery Life",
      "Intel® Celeron® Processor",
      "Windows 11 Professional"
    ],
    specs: {
      storage: "128GB M.2 NVMe SSD",
      gpu: "Intel® UHD Graphics 600",
      display: "15.6\" IPS Full HD 1920×1080",
      ports: "2× USB 3.0, 1× USB 2.0, 1× 3.5mm headphone jack, 1× DC in, 1× HDMI 1.4, 1× USB Type-C (full function)",
      networking: "Intel Wi-Fi AC",
      hinge: "180° flat-fold",
      battery: "Up to 8 hours",
      weight: "1.7 kg",
      dimensions: "358.25 × 241.89 × 19.8 mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Australia Wide Onsite"
    }
  },
  { 
    id: 8, 
    name: "15.6\" Companion SCE5-H1 Notebook", 
    sku: "SCE5-H1-C8P", 
    category: "notebooks", 
    price: 599, 
    ram: "8GB", 
    cpu: "Intel® Celeron® N4020", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/6_PRO-qzk38mlv9j1wflea1yhj4hjp6kczpjrclytuckykg0.png",
    highlights: [
      "15.6\" IPS Full HD Display",
      "180° Flat-Fold Hinge",
      "500GB M.2 NVMe SSD",
      "Intel® Celeron® Processor",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Celeron® N4020",
      ram: "8GB DDR4 (single slot, 8GB max)",
      storage: "500GB M.2 NVMe SSD",
      gpu: "Intel® UHD Graphics 600",
      display: "15.6\" IPS Full HD 1920×1080",
      ports: "2× USB 3.0, 1× USB 2.0, 1× 3.5mm headphone jack, 1× DC in, 1× HDMI 1.4, 1× USB Type-C (full function)",
      networking: "Intel Wi-Fi AC",
      hinge: "180° flat-fold",
      battery: "Up to 8 hours",
      weight: "1.7 kg",
      dimensions: "358.25 × 241.89 × 19.8 mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Australia Wide Onsite"
    }
  },
  { 
    id: 9, 
    name: "16\" AI Companion SCU6-C1", 
    sku: "SCU6-C1-U5H", 
    category: "notebooks", 
    price: 2199, 
    ram: "16GB", 
    cpu: "Intel® Core™ Ultra 5 125U", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/L260TU_front_White-qkb90cak6025a6xss83dpmlipp7x1et2g7yeuz1yio.png",
    highlights: [
      "16\" FHD+ 165Hz Display",
      "Intel® Core™ Ultra 5 Processor",
      "Up to 18 Hours Battery Life",
      "Lightweight 1.42kg",
      "Windows 11 Home"
    ],
    specs: {
      processor: "Intel® Core™ Ultra 5 Processor 125U, 12M Cache, up to 4.30 GHz",
      memory: "16GB DDR5 (1× 8GB onboard + 1× 8GB SODIMM), 5600MHz, expandable to 40GB",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® Graphics",
      display: "16\" FHD+ (1920×1200) 16:10 N7, 165Hz",
      ports: "1× USB 3.2 Gen 1, 1× USB 3.2 Gen 2, 1× USB Type-C 3.2 Gen 2, 1× Thunderbolt 4, 1× HDMI, 1× 2-in-1 Audio jack",
      card_reader: "MicroSD",
      networking: "Intel Dual Band Wireless Wi-Fi 6E AX211 + Bluetooth",
      battery: "Up to 18 hours (73Wh Polymer Li-Ion)",
      weight: "1.42 kg",
      dimensions: "358(W) × 253(D) × 18.5–19.6(H) mm",
      os: "Windows 11 Home",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 10, 
    name: "16\" AI Companion SCU6-C1", 
    sku: "SCU6-C1-U5P", 
    category: "notebooks", 
    price: 2299, 
    ram: "16GB", 
    cpu: "Intel® Core™ Ultra 5 125U", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/L260TU_front_White-qkb90cak6025a6xss83dpmlipp7x1et2g7yeuz1yio.png",
    highlights: [
      "16\" FHD+ 165Hz Display",
      "Intel® Core™ Ultra 5 Processor",
      "Up to 18 Hours Battery Life",
      "Lightweight 1.42kg",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ Ultra 5 Processor 125U, 12M Cache, up to 4.30 GHz",
      memory: "16GB DDR5 (1× 8GB onboard + 1× 8GB SODIMM), 5600MHz, expandable to 40GB",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® Graphics",
      display: "16\" FHD+ (1920×1200) 16:10 N7, 165Hz",
      ports: "1× USB 3.2 Gen 1, 1× USB 3.2 Gen 2, 1× USB Type-C 3.2 Gen 2, 1× Thunderbolt 4, 1× HDMI, 1× 2-in-1 Audio jack",
      card_reader: "MicroSD",
      networking: "Intel Dual Band Wireless Wi-Fi 6E AX211 + Bluetooth",
      battery: "Up to 18 hours (73Wh Polymer Li-Ion)",
      weight: "1.42 kg",
      dimensions: "358(W) × 253(D) × 18.5–19.6(H) mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 11, 
    name: "16\" AI Companion SCU6-C1", 
    sku: "SCU6-C1-U7H", 
    category: "notebooks", 
    price: 2599, 
    ram: "16GB", 
    cpu: "Intel® Core™ Ultra 7 155U", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/L260TU_front_White-qkb90cak6025a6xss83dpmlipp7x1et2g7yeuz1yio.png",
    highlights: [
      "16\" QHD+ 144Hz Display",
      "Intel® Core™ Ultra 7 Processor",
      "Up to 18 Hours Battery Life",
      "Lightweight 1.42kg",
      "Windows 11 Home"
    ],
    specs: {
      processor: "Intel® Core™ Ultra 7 Processor 155U, 12M Cache, up to 4.80 GHz",
      memory: "16GB DDR5 (1× 8GB onboard + 1× 8GB SODIMM), 5600MHz, expandable to 40GB",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® Graphics",
      display: "16\" QHD+ (2560×1600) 16:10 N7, 144Hz",
      ports: "1× USB 3.2 Gen 1, 1× USB 3.2 Gen 2, 1× USB Type-C 3.2 Gen 2, 1× Thunderbolt 4, 1× HDMI, 1× 2-in-1 Audio jack",
      card_reader: "MicroSD",
      networking: "Intel Dual Band Wireless Wi-Fi 6E AX211 + Bluetooth",
      battery: "Up to 18 hours (73Wh Polymer Li-Ion)",
      weight: "1.42 kg",
      dimensions: "358(W) × 253(D) × 18.5–19.6(H) mm",
      os: "Windows 11 Home",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 12, 
    name: "16\" AI Companion SCU6-C1", 
    sku: "SCU6-C1-U7P", 
    category: "notebooks", 
    price: 2699, 
    ram: "16GB", 
    cpu: "Intel® Core™ Ultra 7 155U", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/L260TU_front_White-qkb90cak6025a6xss83dpmlipp7x1et2g7yeuz1yio.png",
    highlights: [
      "16\" QHD+ 144Hz Display",
      "Intel® Core™ Ultra 7 Processor",
      "Up to 18 Hours Battery Life",
      "Lightweight 1.42kg",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ Ultra 7 Processor 155U, 12M Cache, up to 4.80 GHz",
      memory: "16GB DDR5 (1× 8GB onboard + 1× 8GB SODIMM), 5600MHz, expandable to 40GB",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® Graphics",
      display: "16\" QHD+ (2560×1600) 16:10 N7, 144Hz",
      ports: "1× USB 3.2 Gen 1, 1× USB 3.2 Gen 2, 1× USB Type-C 3.2 Gen 2, 1× Thunderbolt 4, 1× HDMI, 1× 2-in-1 Audio jack",
      card_reader: "MicroSD",
      networking: "Intel Dual Band Wireless Wi-Fi 6E AX211 + Bluetooth",
      battery: "Up to 18 hours (73Wh Polymer Li-Ion)",
      weight: "1.42 kg",
      dimensions: "358(W) × 253(D) × 18.5–19.6(H) mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 13, 
    name: "Resistance VR Striker R45 V1", 
    sku: "SRS-R45-15V1", 
    category: "notebooks", 
    price: 2599, 
    ram: "16GB", 
    cpu: "Intel® Core™ i7", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SRS-G35-15V7-puw8gzn7vk090dt6hzuv13rbf70r6ndsldwabsj9q8.jpg",
    highlights: [
      "15.6\" FHD 144Hz Gaming Display",
      "NVIDIA® GeForce RTX™ Graphics",
      "Intel® Core™ i7 High Performance",
      "16GB DDR4 Gaming Memory",
      "Windows 11 Home"
    ],
    specs: {
      processor: "Intel® Core™ i7 High Performance",
      graphics: "NVIDIA® GeForce RTX™ Graphics",
      memory: "16GB DDR4 Gaming Memory",
      storage: "1TB NVMe SSD",
      display: "15.6\" FHD 144Hz Gaming Display",
      os: "Windows 11 Home",
      category: "Resistance Gaming"
    }
  },
  { 
    id: 14, 
    name: "10.5\" Tablet 10W5PRO", 
    sku: "TBL-10W5PRO", 
    category: "2-in-1", 
    price: 499, 
    ram: "4GB", 
    cpu: "Intel® Celeron® N4020", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/TBL-10W5PRO_1-plj9vvo3md3wvmje9jdv73wm6f7irm8ufkm4m5mhog.jpg",
    highlights: [
      "10.5\" FHD IPS Multi-Touch",
      "Detachable Keyboard Included",
      "Windows Inking Stylus Included",
      "Ultra-Portable 600g Tablet",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Celeron® N4020 Dual Core",
      memory: "4GB LPDDR4 (soldered)",
      storage: "128GB eMMC (expandable via MicroSD)",
      graphics: "Intel® HD Graphics",
      display: "10.5\" FHD IPS 1920×1080, 10-point multi-touch",
      ports: "1× USB-C (PD+DP), 1× USB-C (data), 1× Earphone, 1× MicroHDMI",
      networking: "Intel AC Wi-Fi + Bluetooth 4.2",
      pen: "Windows Inking stylus included",
      keyboard: "2-in-1 detachable keyboard included",
      battery: "Up to 8 hours (7.6V, 3500mAh)",
      weight: "600g (tablet only); 1.1kg (with keyboard)",
      os: "Windows 11 Professional",
      warranty: "1 Year Australia Wide Onsite"
    }
  },
  { 
    id: 15, 
    name: "SN15 i5 Corporate mini-PC", 
    sku: "SN15-i5", 
    category: "mini-pc", 
    price: 1499, 
    ram: "8GB", 
    cpu: "Intel® Core™ i5-13500H", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/LEADER-PN64-Hero1-q9thfwtoqvvtrjmzzntenjwyr0k27gk3ia27pqrny8.png",
    highlights: [
      "Intel® Core™ i5-13500H",
      "Supports 4x 4K Displays",
      "Intel® Wi-Fi 6E + 2.5G LAN",
      "Compact 120x130x58mm",
      "Windows 11 Professional"
    ],
    specs: {
      memory: "8GB DDR5 SODIMM (2 slots, 32GB max)",
      storage: "500 GB NVMe PCIe SSD (supports additional 2.5\" SATA drive)",
      graphics: "Intel® Iris® Xe Graphics",
      display_support: "Up to 4× 4K displays",
      ports: "Front: 1× USB-C, 2× USB-A; Rear: 1× USB-A, 1× USB-C (DP+PD), 2× HDMI, 1× DP, 1× 2.5G LAN",
      connectivity: "Intel® Wi-Fi 6E AX211 + Bluetooth 5.2, 2.5G LAN",
      weight: "900 g",
      dimensions: "120 × 130 × 58 mm",
      os: "Windows 11 Professional",
      warranty: "3 Years 4-Hour Onsite"
    }
  },
  { 
    id: 16, 
    name: "SN15 i7 Corporate mini-PC", 
    sku: "SN15-i7", 
    category: "mini-pc", 
    price: 1699, 
    ram: "16GB", 
    cpu: "Intel® Core™ i7-13700H", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/LEADER-PN64-Hero1-q9thfwtoqvvtrjmzzntenjwyr0k27gk3ia27pqrny8.png",
    highlights: [
      "Intel® Core™ i7-13700H",
      "Supports 4x 4K Displays",
      "Intel® Wi-Fi 6E + 2.5G LAN",
      "Compact 120x130x58mm",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ i7-13700H, 24M Cache, P-core up to 5.00 GHz / E-core up to 3.70 GHz",
      memory: "16GB DDR5 SODIMM (2 slots, 32GB max)",
      storage: "500 GB NVMe PCIe SSD (supports additional 2.5\" SATA drive)",
      graphics: "Intel® Iris® Xe Graphics",
      display_support: "Up to 4× 4K displays",
      ports: "Front: 1× USB-C, 2× USB-A; Rear: 1× USB-A, 1× USB-C (DP+PD), 2× HDMI, 1× DP, 1× 2.5G LAN",
      connectivity: "Intel® Wi-Fi 6E AX211 + Bluetooth 5.2, 2.5G LAN",
      weight: "900 g",
      dimensions: "120 × 130 × 58 mm",
      os: "Windows 11 Professional",
      warranty: "3 Years 4-Hour Onsite"
    }
  },
  { 
    id: 17, 
    name: "Corporate S45 i5 Slim Desktop", 
    sku: "SS45-I5", 
    category: "corporate", 
    price: 2099, 
    ram: "16GB", 
    cpu: "Intel® Core™ i5-14400", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SS45_2-1-qzjzu0jrrj7dyrhy0yhhvff3l4pbmwzuf39op6rc3k.png",
    highlights: [
      "Intel® Core™ i5-14400",
      "Slim Desktop Form Factor",
      "16GB DDR4 UDIMM",
      "500GB M.2 NVMe SSD",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ i5-14400, 20M Cache, up to 4.70 GHz, 10 Cores / 16 Threads",
      ram: "16GB DDR4 UDIMM",
      storage: "500 GB M.2 NVMe SSD",
      graphics: "Intel® UHD Graphics 730",
      ports: "Front: 2× USB 3.2, 2× USB-C; Rear: 2× USB 3.2, 2× USB 2.0, 2× DP, 1× HDMI, 1× VGA, 1× LAN",
      networking: "Intel® 1Gb Ethernet",
      weight: "6 kg",
      dimensions: "356 × 102 × 338 mm",
      os: "Windows 11 Professional",
      warranty: "3-year 4-Hour Onsite"
    }
  },
  { 
    id: 18, 
    name: "Corporate S45 i7 Slim Desktop", 
    sku: "SS45-I7", 
    category: "corporate", 
    price: 2399, 
    ram: "16GB", 
    cpu: "Intel® Core™ i7-14700", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SS45_2-1-qzjzu0jrrj7dyrhy0yhhvff3l4pbmwzuf39op6rc3k.png",
    highlights: [
      "Intel® Core™ i7-14700",
      "Slim Desktop Form Factor",
      "16GB DDR4 UDIMM",
      "500GB M.2 NVMe SSD",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ i7-14700, 33M Cache, up to 5.40 GHz, 20 Cores / 28 Threads",
      ram: "16GB DDR4 UDIMM",
      storage: "500 GB M.2 NVMe SSD",
      graphics: "Intel® UHD Graphics 730",
      ports: "Front: 2× USB 3.2, 2× USB-C; Rear: 2× USB 3.2, 2× USB 2.0, 2× DP, 1× HDMI, 1× VGA, 1× LAN",
      networking: "Intel® 1Gb Ethernet",
      weight: "6 kg",
      dimensions: "356 × 102 × 338 mm",
      os: "Windows 11 Professional",
      warranty: "3-year 4-Hour Onsite"
    }
  },
  { 
    id: 19, 
    name: "PC Stick SC8-PRO", 
    sku: "SC8-PRO", 
    category: "pc-stick", 
    price: 399, 
    ram: "4GB", 
    cpu: "Intel® Celeron® N4020", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SC8-PRO-pk8k6uoqc908adrbccgvkfbwva85jekatb46rmeqkg.jpg",
    highlights: [
      "Intel® Celeron® N4020",
      "Ultra-Compact PC Stick",
      "128GB Onboard Storage",
      "Wireless AC + Bluetooth 5.1",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Celeron® N4020",
      memory: "4GB LPDDR4",
      storage: "128 GB onboard",
      ports: "1× DC-in 5V/3A, 1× USB 3.0, 1× USB 3.0 Type-C",
      card_reader: "MicroSD",
      connectivity: "Wireless AC 802.11 a/b/g/n/ac + Bluetooth 5.1",
      weight: "86 g",
      dimensions: "134 × 45 × 15 mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Leader Care"
    }
  },
  { 
    id: 20, 
    name: "23.8\" Visionary 244 i5 All-In-One", 
    sku: "SV244-I5H", 
    category: "aio", 
    price: 1349, 
    ram: "16GB", 
    cpu: "Intel® Core™ i5-12450H", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/7-full-size-win11-home-qzk06f13xu6l5jheltha9sr1r5ko758cgh5bnmdc00.png",
    highlights: [
      "23.8\" FHD Slim Bezel Display",
      "Intel® Core™ i5-12450H",
      "1TB M.2 NVMe SSD",
      "Fully Adjustable Stand",
      "Windows 11 Home"
    ],
    specs: {
      processor: "Intel® Core™ i5-12450H",
      memory: "16GB DDR4",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® UHD Graphics",
      display: "23.8\" FHD (1920×1080) 16:9 slim bezel, 220 nits",
      ports: "4× USB 2.0, 2× USB 3.2 Gen1, 1× USB-C, 1× Audio combo, 1× HDMI, 1× DP, 1× RJ45",
      networking: "Intel Dual Band Wi-Fi 6 AX201 + Bluetooth 5.0 + 1Gb LAN",
      stand: "Fully adjustable",
      weight: "3.1 kg",
      dimensions: "540(L) × 322(W) × 55(D), height 415–545 mm",
      os: "Windows 11 Home",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 21, 
    name: "23.8\" Visionary 244 i5 Pro All-In-One", 
    sku: "SV244-I5P", 
    category: "aio", 
    price: 1449, 
    ram: "16GB", 
    cpu: "Intel® Core™ i5-12450H", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/7-full-size-win11-pro-qzk11tsybj6j4fuw6w9h3dekdor8f0xfrxyfzhsq2o.png",
    highlights: [
      "23.8\" FHD Slim Bezel Display",
      "Intel® Core™ i5-12450H",
      "1TB M.2 NVMe SSD",
      "Fully Adjustable Stand",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ i5-12450H",
      memory: "16GB DDR4",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® UHD Graphics",
      display: "23.8\" FHD (1920×1080) 16:9 slim bezel, 220 nits",
      ports: "4× USB 2.0, 2× USB 3.2 Gen1, 1× USB-C, 1× Audio combo, 1× HDMI, 1× DP, 1× RJ45",
      networking: "Intel Dual Band Wi-Fi 6 AX201 + Bluetooth 5.0 + 1Gb LAN",
      stand: "Fully adjustable",
      weight: "3.1 kg",
      dimensions: "540(L) × 322(W) × 55(D), height 415–545 mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 22, 
    name: "27\" Visionary 274 i5 All-In-One", 
    sku: "SV274-I5H", 
    category: "aio", 
    price: 1449, 
    ram: "16GB", 
    cpu: "Intel® Core™ i5-12450H", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/7-full-size-win11-home-qzk06f13xu6l5jheltha9sr1r5ko758cgh5bnmdc00.png",
    highlights: [
      "27\" FHD Slim Bezel Display",
      "Intel® Core™ i5-12450H",
      "1TB M.2 NVMe SSD",
      "Fully Adjustable Stand",
      "Windows 11 Home"
    ],
    specs: {
      processor: "Intel® Core™ i5-12450H",
      memory: "16GB DDR4",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® UHD Graphics",
      display: "27\" FHD (1920×1080) 16:9 slim bezel, 220 nits",
      ports: "4× USB 2.0, 2× USB 3.2 Gen1, 1× USB-C, 1× Audio combo, 1× HDMI, 1× DP, 1× RJ45",
      networking: "Intel Dual Band Wi-Fi 6 AX201 + Bluetooth 5.0 + 1Gb LAN",
      stand: "Fully adjustable",
      weight: "3.1 kg",
      dimensions: "540(L) × 322(W) × 55(D), height 415–545 mm",
      os: "Windows 11 Home",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 23, 
    name: "27\" Visionary 274 i5 Pro All-In-One", 
    sku: "SV274-I5P", 
    category: "aio", 
    price: 1549, 
    ram: "16GB", 
    cpu: "Intel® Core™ i5-12450H", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/7-full-size-win11-pro-qzk11tsybj6j4fuw6w9h3dekdor8f0xfrxyfzhsq2o.png",
    highlights: [
      "27\" FHD Slim Bezel Display",
      "Intel® Core™ i5-12450H",
      "1TB M.2 NVMe SSD",
      "Fully Adjustable Stand",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ i5-12450H",
      memory: "16GB DDR4",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® UHD Graphics",
      display: "27\" FHD (1920×1080) 16:9 slim bezel, 220 nits",
      ports: "4× USB 2.0, 2× USB 3.2 Gen1, 1× USB-C, 1× Audio combo, 1× HDMI, 1× DP, 1× RJ45",
      networking: "Intel Dual Band Wi-Fi 6 AX201 + Bluetooth 5.0 + 1Gb LAN",
      stand: "Fully adjustable",
      weight: "3.1 kg",
      dimensions: "540(L) × 322(W) × 55(D), height 415–545 mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 24, 
    name: "27\" Visionary 274 i7 All-In-One", 
    sku: "SV274-I7H", 
    category: "aio", 
    price: 1649, 
    ram: "16GB", 
    cpu: "Intel® Core™ i7-12650H", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/7-full-size-win11-home-qzk06f13xu6l5jheltha9sr1r5ko758cgh5bnmdc00.png",
    highlights: [
      "27\" FHD Slim Bezel Display",
      "Intel® Core™ i7-12650H",
      "1TB M.2 NVMe SSD",
      "Fully Adjustable Stand",
      "Windows 11 Home"
    ],
    specs: {
      processor: "Intel® Core™ i7-12650H",
      memory: "16GB DDR4",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® UHD Graphics",
      display: "27\" FHD (1920×1080) 16:9 slim bezel, 220 nits",
      ports: "4× USB 2.0, 2× USB 3.2 Gen1, 1× USB-C, 1× Audio combo, 1× HDMI, 1× DP, 1× RJ45",
      networking: "Intel Dual Band Wi-Fi 6 AX201 + Bluetooth 5.0 + 1Gb LAN",
      stand: "Fully adjustable",
      weight: "3.1 kg",
      dimensions: "540(L) × 322(W) × 55(D), height 415–545 mm",
      os: "Windows 11 Home",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 25, 
    name: "27\" Visionary 274 i7 Pro All-In-One", 
    sku: "SV274-I7P", 
    category: "aio", 
    price: 1749, 
    ram: "16GB", 
    cpu: "Intel® Core™ i7-12650H", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/7-full-size-win11-pro-qzk11tsybj6j4fuw6w9h3dekdor8f0xfrxyfzhsq2o.png",
    highlights: [
      "27\" FHD Slim Bezel Display",
      "Intel® Core™ i7-12650H",
      "1TB M.2 NVMe SSD",
      "Fully Adjustable Stand",
      "Windows 11 Professional"
    ],
    specs: {
      processor: "Intel® Core™ i7-12650H",
      memory: "16GB DDR4",
      storage: "1TB M.2 NVMe SSD",
      graphics: "Intel® UHD Graphics",
      display: "27\" FHD (1920×1080) 16:9 slim bezel, 220 nits",
      ports: "4× USB 2.0, 2× USB 3.2 Gen1, 1× USB-C, 1× Audio combo, 1× HDMI, 1× DP, 1× RJ45",
      networking: "Intel Dual Band Wi-Fi 6 AX201 + Bluetooth 5.0 + 1Gb LAN",
      stand: "Fully adjustable",
      weight: "3.1 kg",
      dimensions: "540(L) × 322(W) × 55(D), height 415–545 mm",
      os: "Windows 11 Professional",
      warranty: "1 Year Leader Care Australia Wide Onsite"
    }
  },
  { 
    id: 26, 
    name: "Visionary 6050 Desktop", 
    sku: "V6050", 
    category: "desktops", 
    price: 999, 
    ram: "8GB", 
    cpu: "AMD Ryzen™ 5 3600", 
    image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/LEADER-Visionary-6050-q9thp754z382p30m4619x8p8y9676v24c297775f0g.png",
    highlights: [
      "AMD Ryzen™ 5 3600",
      "NVIDIA® GeForce® GT 1030",
      "8GB DDR4 2666MHz Memory",
      "500GB High Speed SSD",
      "Windows 11 Home"
    ],
    specs: {
      processor: "AMD Ryzen™ 5 3600",
      memory: "8GB DDR4 2666MHz",
      storage: "500GB SSD",
      graphics: "NVIDIA® GeForce® GT 1030 2GB",
      ports: "2× USB 3.0, 2× USB 2.0, HD Audio (line-in/line-out/mic-in), 1× HDMI out, 1× DVI",
      optical: "24× DVD±R/RW burner",
      networking: "Integrated 10/100/1000 LAN",
      os: "Windows 11 Home",
      warranty: "1 Year Australia Wide Onsite Parts & Labour"
    }
  }
];

const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Energize Your Business Anywhere.",
    subtitle: "Precision-Engineered for Business, Designed with Elegance and Simplicity.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=80",
    tag: "LATEST RELEASE"
  },
  {
    id: 2,
    title: "Elite Performance for Gaming.",
    subtitle: "Experience the power of Resistance Gaming laptops with RTX 40 Series graphics.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=80",
    tag: "GAMING"
  },
  {
    id: 3,
    title: "Australian Made, National Support.",
    subtitle: "Custom built in Australia with up to 5 years onsite warranty for total peace of mind.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    tag: "PROUDLY AUSTRALIAN"
  },
  {
    id: 4,
    title: "Leader Expo 2026.",
    subtitle: "Join us for Australia's premier IT channel event. Discover the latest innovations and network with industry leaders.",
    image: "https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?auto=format&fit=crop&w=1920&q=80",
    tag: "EVENTS",
    buttonText: "Register Now",
    buttonLink: "https://leaderexpo.com.au/#register"
  },
  {
    id: 5,
    title: "Become a Reseller.",
    subtitle: "Like our products and want to join our network to sell them yourself?",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80",
    tag: "PARTNERSHIP",
    buttonText: "Reseller Portal",
    buttonLink: "https://web.leadersystems.com.au/become-a-reseller/"
  }
];

const SUB_NAV = [
  { name: "Notebooks", icon: Laptop, id: 'notebooks' },
  { name: "2-in-1", icon: Laptop, id: '2-in-1' },
  { name: "Mini PC", icon: Server, id: 'mini-pc' },
  { name: "Corporate", icon: ShieldCheck, id: 'corporate' },
  { name: "PC Stick", icon: Cpu, id: 'pc-stick' },
  { name: "All-in-Ones", icon: Monitor, id: 'aio' },
];

const TRUST_ITEMS = [
  { title: "100% Australian Owned Manufacturer", icon: Globe },
  { title: "1,000+ Available From Authorised Resellers", icon: Users },
  { title: "Peace Of Mind With Australia Wide Onsite Warranty", icon: ShieldCheck },
  { title: "Customise & Configure To Suit Your Needs", icon: Wrench },
];

const getProductFeatures = (product: any) => {
  const features = [];
  const s = product.specs || {};
  const name = product.name.toLowerCase();

  // Feature 1: Primary Performance / Core Identity
  if (product.category === "Copilot+ PCs") {
    features.push({
      title: "Revolutionary AI Intelligence",
      description: `Powered by the ${product.cpu}, this Copilot+ PC delivers a massive ${s.ai || '40+'} TOPS of AI performance. Experience the future of computing with local AI acceleration for smarter, faster workflows.`,
      bgText: "AI",
      visual: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      accent: "text-[#D4AF37]"
    });
  } else if (name.includes("gaming")) {
    features.push({
      title: "Apex Gaming Performance",
      description: `Unleash the power of the ${product.cpu} paired with ${s.graphics || 'high-end graphics'}. Engineered for high-frame-rate gaming and uncompromising performance in the most demanding titles.`,
      bgText: "FPS",
      visual: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      accent: "text-red-500"
    });
  } else if (product.category === "aio") {
    features.push({
      title: "Elegant All-In-One Design",
      description: `The ${product.name} integrates a powerful ${product.cpu} directly into a stunning ${s.display || 'FHD'} display. Reclaim your desk space without sacrificing professional performance.`,
      bgText: "AIO",
      visual: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
      accent: "text-blue-400"
    });
  } else if (product.category === "pc-stick") {
    features.push({
      title: "Ultra-Portable Computing",
      description: `Transform any HDMI display into a full ${s.os} PC. The ${product.name} packs a ${product.cpu} into a pocket-sized form factor, perfect for digital signage and mobile professionals.`,
      bgText: "MINI",
      visual: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
      accent: "text-accent"
    });
  } else {
    features.push({
      title: "Professional Grade Power",
      description: `Equipped with the ${product.cpu} and ${product.ram} of high-speed memory, the ${product.sku} is built to handle complex professional workloads with ease and reliability.`,
      bgText: "PRO",
      visual: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      accent: "text-primary-light"
    });
  }

  // Feature 2: Display / Visuals / Mobility
  if (s.display) {
    features.push({
      title: "Pro-Grade Visual Experience",
      description: `The ${s.display} panel offers exceptional clarity and color accuracy. Whether you're editing 4K video or managing complex data, every detail is rendered with precision.`,
      bgText: "VIS",
      visual: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
      accent: "text-purple-400"
    });
  } else if (s.battery) {
    features.push({
      title: "Extreme Battery Endurance",
      description: `Go further with up to ${s.battery} of battery life. Designed for the modern mobile professional, this system ensures you stay productive from the first meeting to the flight home.`,
      bgText: "PWR",
      visual: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
      accent: "text-green-400"
    });
  } else {
    features.push({
      title: "High-Speed Storage & I/O",
      description: `Featuring a ${s.storage} and a comprehensive array of ports including ${s.ports ? s.ports.split(',')[0] : 'USB 3.2'}, ensuring lightning-fast data transfers and seamless connectivity.`,
      bgText: "DATA",
      visual: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      accent: "text-blue-500"
    });
  }

  // Feature 3: Reliability / Warranty / Build
  features.push({
    title: "Australian Built & Supported",
    description: `Your ${product.name} is backed by a ${s.warranty || 'comprehensive warranty'}. Proudly assembled in Australia with nationwide onsite support for ultimate peace of mind.`,
    bgText: "AUS",
    visual: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    accent: "text-accent"
  });

  return features;
};

const ProductJourney = ({ product }: { product: any }) => {
  const features = getProductFeatures(product);
  
  return (
    <div className="mt-24 space-y-32 mb-32">
      {/* Section 1: The Vision */}
      <section className="relative overflow-hidden py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl lg:text-8xl font-black text-primary tracking-tighter mb-8 uppercase leading-none">
              The Future of <br />
              <span className="text-accent">Australian Computing.</span>
            </h2>
            <p className="text-muted text-xl lg:text-2xl font-bold max-w-3xl mx-auto leading-relaxed">
              The {product.name} isn't just a tool. It's a statement of performance, 
              reliability, and local engineering excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Performance (Feature 0) */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className={`inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.2em] mb-8 ${features[0].accent}`}>
                Performance First
              </div>
              <h3 className="text-4xl lg:text-6xl font-black text-primary uppercase tracking-tight mb-8 leading-none">
                {features[0].title}
              </h3>
              <p className="text-muted text-lg lg:text-xl font-bold leading-relaxed mb-10">
                {features[0].description}
              </p>
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-black text-primary tracking-tighter">100%</div>
                  <div className="text-[10px] font-black text-muted uppercase tracking-widest">Optimised</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-primary tracking-tighter">Pro</div>
                  <div className="text-[10px] font-black text-muted uppercase tracking-widest">Grade</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="order-1 lg:order-2 relative"
            >
              <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full" />
              <img 
                src={features[0].visual} 
                alt={features[0].title}
                className="relative z-10 w-full h-auto rounded-[3rem] shadow-premium"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Visuals/Mobility (Feature 1) */}
      <section className="bg-[#050B18] py-32 rounded-[4rem] mx-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,#1e3a8a_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,#1e40af_0%,transparent_50%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <img 
                src={features[1].visual} 
                alt={features[1].title}
                className="w-full h-auto rounded-[3rem] shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] mb-8 ${features[1].accent}`}>
                {features[1].bgText} Experience
              </div>
              <h3 className="text-4xl lg:text-6xl font-black text-white uppercase tracking-tight mb-8 leading-none">
                {features[1].title}
              </h3>
              <p className="text-white/60 text-lg lg:text-xl font-medium leading-relaxed mb-10">
                {features[1].description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Reliability (Feature 2) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-surface/30 rounded-[4rem] p-12 lg:p-24 border border-surface relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl lg:text-6xl font-black text-primary uppercase tracking-tight mb-8 leading-none">
                  Built to <br /><span className="text-accent">Endure.</span>
                </h3>
                <p className="text-muted text-lg lg:text-xl font-bold leading-relaxed mb-10">
                  {features[2].description}
                </p>
                <div className="space-y-6">
                  {[
                    "Nationwide Onsite Warranty",
                    "Local Australian Production",
                    "Rigorous Burn-in Testing"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <span className="font-black text-primary uppercase tracking-widest text-xs">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src={features[2].visual} 
                  alt={features[2].title}
                  className="w-full h-auto rounded-[3rem] shadow-premium"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: The Leader Advantage */}
      <section className="py-24 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold text-primary mb-4"
            >
              The Leader Advantage
            </motion.h3>
            <p className="text-muted font-semibold">Why professionals choose Australia's largest PC manufacturer.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: ShieldCheck,
                title: "Nationwide Support",
                desc: "Our onsite service network spans the entire country, ensuring professional assistance is always within reach."
              },
              {
                icon: Users,
                title: "Local Expertise",
                desc: "Based in Australia, our support and production teams understand the unique needs of local businesses."
              },
              {
                icon: Zap,
                title: "Rapid Deployment",
                desc: "With local manufacturing, we offer industry-leading lead times for both standard and custom configurations."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white rounded-[2rem] shadow-premium flex items-center justify-center mx-auto mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <item.icon className="w-10 h-10 text-accent" />
                </div>
                <h4 className="text-xl font-black text-primary mb-4 uppercase tracking-tight">{item.title}</h4>
                <p className="text-muted text-sm leading-relaxed font-bold px-4">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <MainApp />
    </HashRouter>
  );
}

const DRIVERS_DATA: Record<string, { name: string, version: string, size: string }[]> = {
  "All In One": [
    { name: "AIO 24\" Series Driver Pack", version: "v2.1.0", size: "450MB" },
    { name: "AIO 27\" Series Driver Pack", version: "v2.1.0", size: "480MB" },
    { name: "Integrated Webcam Driver", version: "v1.0.5", size: "12MB" }
  ],
  "Corporate PC / NUC": [
    { name: "NUC 11 Pro Drivers", version: "v3.4.2", size: "320MB" },
    { name: "NUC 12 Extreme Drivers", version: "v1.2.0", size: "510MB" },
    { name: "Intel Chipset Utility", version: "v10.1.18", size: "5MB" }
  ],
  "Desktops": [
    { name: "Motherboard Driver Suite", version: "v5.0.1", size: "890MB" },
    { name: "High Definition Audio Driver", version: "v6.0.9", size: "150MB" },
    { name: "Realtek LAN Driver", version: "v10.0.50", size: "10MB" }
  ],
  "Notebooks": [
    { name: "Precision Touchpad Driver", version: "v19.5.3", size: "25MB" },
    { name: "Wi-Fi & Bluetooth Driver", version: "v22.150.0", size: "45MB" },
    { name: "Leader Hotkey Utility", version: "v3.0.12", size: "18MB" }
  ],
  "Tablets": [
    { name: "Multi-Touch Panel Driver", version: "v4.2.1", size: "8MB" },
    { name: "G-Sensor Calibration Tool", version: "v1.0.2", size: "3MB" },
    { name: "Battery Management Software", version: "v2.1.5", size: "12MB" }
  ],
  "PC on Stick": [
    { name: "Stick PC V2 Drivers", version: "v1.1.0", size: "210MB" },
    { name: "Intel HD Graphics Driver", version: "v31.0.101", size: "350MB" }
  ],
  "Small Form Factor": [
    { name: "SFF Series Drivers", version: "v2.5.0", size: "420MB" },
    { name: "Power Management Utility", version: "v1.4.2", size: "7MB" }
  ],
  "Resistance Gaming": [
    { name: "Resistance RGB Controller", version: "v1.8.5", size: "65MB" },
    { name: "Macro Key Utility", version: "v2.0.1", size: "32MB" },
    { name: "High-Performance Power Plan", version: "v1.0.0", size: "1MB" }
  ]
};

const SupportView = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<{ name: string, version: string, size: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const driverCategories = [
    { name: "All In One", id: "All In One", image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/7-full-size-win11-home-qzk06f13xu6l5jheltha9sr1r5ko758cgh5bnmdc00.png" },
    { name: "Corporate PC / NUC", id: "Corporate PC / NUC", image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/LEADER-PN64-Hero1-q9thfwtoqvvtrjmzzntenjwyr0k27gk3ia27pqrny8.png" },
    { name: "Desktops", id: "Desktops", image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/LEADER-Visionary-6050-q9thp754z382p30m4619x8p8y9676v24c297775f0g.png" },
    { name: "Notebooks", id: "Notebooks", image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SCE4-B1_05-3-qzk2pbz4yyn03rf9q488fuu26tgqp85pmgq0p3ki68.png" },
    { name: "Tablets", id: "Tablets", image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/TBL-10W5PRO_1-plj9vvo3md3wvmje9jdv73wm6f7irm8ufkm4m5mhog.jpg" },
    { name: "PC on Stick", id: "PC on Stick", image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SC8-PRO-pk8k6uoqc908adrbccgvkfbwva85jekatb46rmeqkg.jpg" },
    { name: "Small Form Factor", id: "Small Form Factor", image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SS45_2-1-qzjzu0jrrj7dyrhy0yhhvff3l4pbmwzuf39op6rc3k.png" },
    { name: "Resistance Gaming", id: "Resistance Gaming", image: "https://leader-online.com.au/wp-content/uploads/elementor/thumbs/SRS-G35-15V7-puw8gzn7vk090dt6hzuv13rbf70r6ndsldwabsj9q8.jpg" }
  ];

  // Simulate database fetch
  useEffect(() => {
    if (selectedCategory) {
      setIsLoading(true);
      setTimeout(() => {
        setDrivers(DRIVERS_DATA[selectedCategory] || []);
        setIsLoading(false);
      }, 600);
    }
  }, [selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black text-primary uppercase tracking-tight mb-6">Support</h1>
          <p className="text-xl text-muted max-w-3xl mx-auto font-medium leading-relaxed">
            "Leader is dedicated to providing you with the highest quality of customer care and after sale service."
          </p>
      </div>

        {/* Contact Form Section - LARGER */}
        <div className="mb-32">
          <div className="bg-surface/30 p-10 md:p-16 rounded-[4rem] border border-surface shadow-premium max-w-5xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-16 h-16 bg-accent rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-accent/20">
                <Users className="w-8 h-8" />
                </div>
                <div>
                <h3 className="text-4xl font-black text-primary uppercase tracking-tight">Contact Support</h3>
                <p className="text-muted text-sm font-bold uppercase tracking-widest mt-1">Direct assistance from our experts</p>
                </div>
              </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-100 p-16 rounded-[3rem] text-center"
              >
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-12 h-12" />
                    </div>
                <h4 className="text-3xl font-black text-green-800 uppercase mb-4">Message Sent!</h4>
                <p className="text-green-700 text-lg font-medium">Thank you for contacting us. Our team will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-muted uppercase tracking-widest ml-1">Department</label>
                    <select required className="w-full bg-white border-2 border-surface focus:border-accent rounded-2xl px-6 py-5 text-sm font-bold text-primary outline-none transition-all appearance-none cursor-pointer shadow-sm">
                      <option value="" disabled selected>Select Department</option>
                      <option value="sales">Sales</option>
                      <option value="service">Service Support</option>
                    </select>
                        </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-muted uppercase tracking-widest ml-1">Full Name</label>
                    <input required type="text" placeholder="e.g. John Doe" className="w-full bg-white border-2 border-surface focus:border-accent rounded-2xl px-6 py-5 text-sm font-bold text-primary outline-none transition-all shadow-sm" />
                      </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-muted uppercase tracking-widest ml-1">Email Address</label>
                    <input required type="email" placeholder="e.g. john@company.com.au" className="w-full bg-white border-2 border-surface focus:border-accent rounded-2xl px-6 py-5 text-sm font-bold text-primary outline-none transition-all shadow-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-muted uppercase tracking-widest ml-1">Device Model</label>
                      <input type="text" placeholder="e.g. AIO-24" className="w-full bg-white border-2 border-surface focus:border-accent rounded-2xl px-6 py-5 text-sm font-bold text-primary outline-none transition-all shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-muted uppercase tracking-widest ml-1">Serial Number</label>
                      <input type="text" placeholder="e.g. LDR-12345" className="w-full bg-white border-2 border-surface focus:border-accent rounded-2xl px-6 py-5 text-sm font-bold text-primary outline-none transition-all shadow-sm" />
                    </div>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-muted uppercase tracking-widest ml-1">Post Code</label>
                    <input required type="text" placeholder="e.g. 5000" className="w-full bg-white border-2 border-surface focus:border-accent rounded-2xl px-6 py-5 text-sm font-bold text-primary outline-none transition-all shadow-sm" />
              </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-muted uppercase tracking-widest ml-1">Your Message</label>
                    <textarea required rows={6} placeholder="How can we assist you today?" className="w-full bg-white border-2 border-surface focus:border-accent rounded-2xl px-6 py-5 text-sm font-bold text-primary outline-none transition-all resize-none h-[184px] shadow-sm"></textarea>
          </div>
                  <button type="submit" className="w-full bg-accent text-white py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-accent/90 transition-all active:scale-[0.98] shadow-xl shadow-accent/20">
                    Send Inquiry
                  </button>
        </div>
              </form>
            )}
          </div>                  
        </div>

        {/* Device Drivers Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-primary uppercase tracking-tight">Device Drivers</h2>
            <div className="w-24 h-1.5 bg-accent mx-auto mt-4 rounded-full" />
              </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Category Thumbnails - Vertical Line */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-surface/30 p-8 rounded-[3rem] border border-surface">
                <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-6 text-center">Product Categories</h3>
                <div className="space-y-3">
                  {driverCategories.map(cat => (
                <button 
                      key={cat.id} 
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center gap-4 p-3 rounded-2xl font-bold text-sm transition-all border-2 group ${
                        selectedCategory === cat.id 
                          ? 'bg-accent border-accent text-white shadow-lg shadow-accent/30 scale-[1.02]' 
                          : 'bg-white border-surface text-primary hover:border-accent/30'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white rounded-xl p-1 flex-shrink-0 border border-surface group-hover:border-accent/20 transition-colors overflow-hidden">
                        <img src={cat.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                      <span className="flex-grow text-left">{cat.name}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${selectedCategory === cat.id ? 'rotate-90' : ''}`} />
                </button>
                  ))}
              </div>
            </div>
          </div>

            {/* Drivers List */}
            <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] border border-surface shadow-premium min-h-[500px] flex flex-col">
              {selectedCategory ? (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{selectedCategory} Drivers</h3>
                    <span className="text-[10px] font-black text-accent bg-accent/10 px-3 py-1 rounded-full uppercase tracking-widest">
                      {drivers.length} Files
                    </span>
        </div>
                  
                  {isLoading ? (
                    <div className="flex-grow flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="space-y-4 flex-grow">
                      {drivers.length > 0 ? (
                        drivers.map((driver, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 bg-surface/30 rounded-2xl border border-surface flex items-center justify-between group hover:border-accent/30 transition-all"
                          >
                            <div>
                              <p className="text-sm font-black text-primary uppercase mb-1">{driver.name}</p>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Version: {driver.version}</span>
                                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">• {driver.size}</span>
                              </div>
                            </div>
                            <button className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center border border-surface hover:bg-accent hover:text-white hover:border-accent transition-all shadow-sm">
                              <Download className="w-5 h-5" />
                            </button>
                          </motion.div>
                        ))
                      ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                          <p className="text-muted font-bold">No drivers found for this category.</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-surface rounded-[2rem] flex items-center justify-center mb-6 text-muted/20">
                    <Download className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-black text-primary uppercase mb-3">Select a Category</h3>
                  <p className="text-sm text-muted max-w-xs">
                    Please select a product category from the left to view available drivers and software downloads.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResellerOrderView = ({ items, totalPrice, onUpdateQuantity, onRemoveItem }: { items: any[], totalPrice: number, onUpdateQuantity: (id: string, delta: number) => void, onRemoveItem: (id: string) => void }) => {
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    postcode: '',
    company: ''
  });

  const getUpgradeLabel = (category: string, id: string) => {
    return (UPGRADE_OPTIONS as any)[category]?.find((o: any) => o.id === id)?.label || id;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    // In a real app, this would send data to a server
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <ShieldCheck className="w-12 h-12" />
          </motion.div>
          <h1 className="text-4xl font-black text-primary uppercase tracking-tight mb-4">Order Request Sent!</h1>
          <p className="text-muted text-lg mb-10">
            Your order details have been sent to your nearest authorised Leader reseller. 
            They will contact you shortly to confirm pricing, availability, and delivery.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-white px-10 py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all active:scale-95"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted hover:text-accent font-bold text-sm mb-8 group"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Selection
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Order Details */}
          <div className="space-y-8">
            <div className="bg-surface/30 p-8 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-black text-primary uppercase tracking-tight mb-8">Your Selection</h2>
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 items-start">
                    <div className="w-20 h-20 bg-white rounded-xl p-3 shadow-sm flex items-center justify-center flex-shrink-0">
                      <img src={item.product.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <h4 className="font-black text-primary uppercase text-sm">{item.product.name}</h4>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-white rounded-lg border border-surface overflow-hidden">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1.5 hover:bg-surface text-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-[10px] font-mono font-bold text-primary">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1.5 hover:bg-surface text-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="p-2 text-muted hover:text-red-500 hover:bg-red-50 transition-all rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(item.upgrades).map(([cat, id]) => (
                          <span key={cat} className="text-[8px] font-black bg-white px-2 py-0.5 rounded-full border border-surface uppercase tracking-widest text-muted">
                            {getUpgradeLabel(cat, id as string)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-surface flex justify-between items-baseline">
                <span className="text-sm font-bold text-muted uppercase tracking-widest">Total Estimated</span>
                <span className="text-3xl font-black text-accent">RRP ${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-accent/5 p-8 rounded-[2.5rem] border border-accent/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-primary uppercase tracking-tight">Local Service</h3>
              </div>
              <p className="text-sm text-muted font-medium leading-relaxed">
                Leader is Australia's largest locally owned PC manufacturer. By ordering via a reseller, 
                you get local support, expert advice, and professional setup from a business in your community.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-10 lg:p-16 rounded-xl border border-gray-200 shadow-premium">
            <h2 className="text-3xl font-black text-primary uppercase tracking-tight mb-2">Order Details</h2>
            <p className="text-muted text-sm font-bold mb-10 uppercase tracking-widest">Fill in your information</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">First Name</label>
                  <input 
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-surface border-2 border-surface focus:border-accent rounded-xl px-6 py-4 font-bold text-primary outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Last Name</label>
                  <input 
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-surface border-2 border-surface focus:border-accent rounded-xl px-6 py-4 font-bold text-primary outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-surface border-2 border-surface focus:border-accent rounded-xl px-6 py-4 font-bold text-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Phone Number</label>
                  <input 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-surface border-2 border-surface focus:border-accent rounded-xl px-6 py-4 font-bold text-primary outline-none transition-all"
                    placeholder="0400 000 000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Postcode</label>
                  <input 
                    required
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="w-full bg-surface border-2 border-surface focus:border-accent rounded-xl px-6 py-4 font-bold text-primary outline-none transition-all"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest ml-1">Delivery Address</label>
                <input 
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full bg-surface border-2 border-surface focus:border-accent rounded-xl px-6 py-4 font-bold text-primary outline-none transition-all"
                  placeholder="123 Leader St, Adelaide SA"
                />
              </div>

              <div className="pt-6">
                <div className="bg-surface p-4 rounded-xl flex items-start gap-3 mb-6">
                  <ShieldCheck className="w-5 h-5 text-accent mt-0.5" />
                  <p className="text-[11px] text-muted font-bold leading-relaxed">
                    Your order will be sent to your nearest local Leader reseller. They will contact you to finalize the purchase.
                  </p>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-accent text-white py-5 rounded-2xl font-black text-sm hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 active:scale-95 flex items-center justify-center gap-3"
                >
                  <Rocket className="w-6 h-6" /> Place Order via Reseller
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


const CompareProductDropdown = ({ 
  currentProduct, 
  onSelect, 
  category 
}: { 
  currentProduct: any, 
  onSelect: (p: any) => void,
  category: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const availableProducts = [...ALL_PRODUCTS, ...COPILOT_PRODUCTS].filter(p => p.category === category);

  return (
    <div className="relative w-full max-w-[240px] mb-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-surface border-2 border-surface focus:border-accent rounded-xl px-4 py-3 text-sm font-bold text-primary flex items-center justify-between hover:bg-surface/80 transition-all"
      >
        <span className="truncate">{currentProduct?.name || "Select a product..."}</span>
        <ChevronDown className={`w-4 h-4 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 bottom-full left-0 w-full mb-2 bg-white border border-surface rounded-2xl shadow-2xl max-h-[300px] overflow-y-auto"
          >
            {availableProducts.map(p => (
              <button
                key={p.sku}
                onClick={() => {
                  onSelect(p);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-surface transition-colors border-b border-surface last:border-0"
              >
                <img src={p.image} alt="" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                <div className="text-left">
                  <p className="text-xs font-black text-primary truncate">{p.name}</p>
                  <p className="text-[10px] font-mono font-bold text-accent">${p.price}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function MainApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [selectedCategory, setSelectedCategory] = useState('notebooks');
  const [priceFilter, setPriceFilter] = useState(5000);
  const [ramFilter, setRamFilter] = useState('All');
  const [cpuFilter, setCpuFilter] = useState('All');
  const [gpuFilter, setGpuFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showCopilotOverlay, setShowCopilotOverlay] = useState(false);
  const [showLearnMoreOverlay, setShowLearnMoreOverlay] = useState(false);
  const [selectedReseller, setSelectedReseller] = useState<any>(null);
  const [searchCenter, setSearchCenter] = useState({ lat: -34.9337, lng: 138.5677 });
  const [searchRadius, setSearchRadius] = useState(50);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [compareProduct1, setCompareProduct1] = useState<any>(null);
  const [compareProduct2, setCompareProduct2] = useState<any>(null);
  const [compareProduct3, setCompareProduct3] = useState<any>(null);
  
  const handleAddToCompare = (product: any) => {
    setIsComparing(true);
    if (compareProduct1?.id === product.id || compareProduct2?.id === product.id || compareProduct3?.id === product.id) {
      return;
    }
    if (!compareProduct1) setCompareProduct1(product);
    else if (!compareProduct2) setCompareProduct2(product);
    else if (!compareProduct3) setCompareProduct3(product);
    else setCompareProduct3(product);
  };
  const [isComparisonExpanded, setIsComparisonExpanded] = useState(false);
  const [compareScrollTop, setCompareScrollTop] = useState(0);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [selectedUpgrades, setSelectedUpgrades] = useState<Record<string, string>>({
    ram: '16gb',
    storage: '512gb',
    os: 'win11p'
  });

  const calculateTotalPrice = () => {
    if (!selectedProduct) return 0;
    let total = selectedProduct.price;
    Object.entries(selectedUpgrades).forEach(([category, optionId]) => {
      const option = (UPGRADE_OPTIONS as any)[category]?.find((o: any) => o.id === optionId);
      if (option) total += option.price;
    });
    return total;
  };

const displayProduct = React.useMemo(() => {
    if (!selectedProduct) return null;
    
    const updatedSpecs = { ...selectedProduct.specs };
    const updatedHighlights = [...(selectedProduct.highlights || [])];
    
    // Update RAM/Memory
    const ramOption = UPGRADE_OPTIONS.ram.find(o => o.id === selectedUpgrades.ram);
    if (ramOption) {
      const memoryKey = Object.keys(updatedSpecs).find(k => k.toLowerCase() === 'memory' || k.toLowerCase() === 'ram');
      if (memoryKey) {
        updatedSpecs[memoryKey] = ramOption.label;
      }
      
      const ramIndex = updatedHighlights.findIndex(h => 
        /(\d+GB)/i.test(h) && (h.toLowerCase().includes('ram') || h.toLowerCase().includes('ddr') || !h.toLowerCase().includes('ssd'))
      );
      if (ramIndex !== -1) {
        updatedHighlights[ramIndex] = ramOption.label;
      }
    }
    
    // Update Storage
    const storageOption = UPGRADE_OPTIONS.storage.find(o => o.id === selectedUpgrades.storage);
    if (storageOption) {
      const storageKey = Object.keys(updatedSpecs).find(k => k.toLowerCase() === 'storage');
      if (storageKey) {
        updatedSpecs[storageKey] = storageOption.label;
      }
      
      const storageIndex = updatedHighlights.findIndex(h => 
        h.toLowerCase().includes('ssd') || h.toLowerCase().includes('storage') || /(\d+TB)/i.test(h)
      );
      if (storageIndex !== -1) {
        updatedHighlights[storageIndex] = storageOption.label;
      }
    }
    
    // Update OS
    const osOption = UPGRADE_OPTIONS.os.find(o => o.id === selectedUpgrades.os);
    if (osOption) {
      const osKey = Object.keys(updatedSpecs).find(k => k.toLowerCase() === 'os' || k.toLowerCase() === 'operating_system');
      if (osKey) {
        updatedSpecs[osKey] = osOption.label;
      }
      
      const osIndex = updatedHighlights.findIndex(h => h.toLowerCase().includes('windows'));
      if (osIndex !== -1) {
        updatedHighlights[osIndex] = osOption.label;
      }
    }
    
    return {
      ...selectedProduct,
      ram: ramOption ? ramOption.label : selectedProduct.ram,
      storage: storageOption ? storageOption.label : selectedProduct.storage,
      specs: updatedSpecs,
      highlights: updatedHighlights
    };
  }, [selectedProduct, selectedUpgrades]);

  const calculateCartTotal = () => {
    return cartItems.reduce((acc, item) => {
      let itemPrice = item.product.price;
      Object.entries(item.upgrades).forEach(([category, optionId]) => {
      const option = (UPGRADE_OPTIONS as any)[category]?.find((o: any) => o.id === optionId);
       if (option) itemPrice += option.price;
      });
      return acc + (itemPrice * item.quantity);
    }, 0);
  };

  const addToCart = (product: any, upgrades: Record<string, string>) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => 
        item.product.id === product.id && 
        JSON.stringify(item.upgrades) === JSON.stringify(upgrades)
      );

      if (existingItemIndex !== -1) {
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      }

      return [...prev, { 
        id: Math.random().toString(36).substr(2, 9),
        product, 
        upgrades, 
        quantity: 1 
      }];
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  useEffect(() => {
    if (isAutoPlaying) return;
    const resumeTimer = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000); // Resume after 10 seconds
    return () => clearTimeout(resumeTimer);
  }, [isAutoPlaying, lastInteraction]);

  useEffect(() => {
      if (isComparisonExpanded) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isComparisonExpanded]);

  const handleManualSlide = (direction: 'next' | 'prev') => {
    setIsAutoPlaying(false);
    setLastInteraction(Date.now());
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
    }
  };

  const filteredProducts = (globalSearchQuery 
    ? [...ALL_PRODUCTS, ...COPILOT_PRODUCTS] 
    : ALL_PRODUCTS
  ).filter(p => {
    if (globalSearchQuery) {
      return p.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
             p.sku.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
             p.category.toLowerCase().includes(globalSearchQuery.toLowerCase());
    }

    const matchesCategory = p.category === selectedCategory;
    const matchesPrice = p.price <= priceFilter;
    const matchesRam = ramFilter === 'All' || p.ram === ramFilter;
    const matchesCpu = cpuFilter === 'All' || (p.cpu && p.cpu.includes(cpuFilter));
    const matchesGpu = gpuFilter === 'All' || 
      (p.specs && (p.specs as any).gpu && (p.specs as any).gpu.includes(gpuFilter)) ||
      (gpuFilter === 'Integrated' && (!p.specs || !(p.specs as any).gpu));
    
    return matchesCategory && matchesPrice && matchesRam && matchesCpu && matchesGpu;
  });

  // Sync URL with selectedProduct
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/product/')) {
      const sku = path.split('/product/')[1];
      const product = ALL_PRODUCTS.find(p => p.sku === sku) || COPILOT_PRODUCTS.find(p => p.sku === sku);
      if (product) {
        setSelectedProduct(product);
        setIsCustomizing((location.state as any)?.customizing || false);
        if (isComparing) {
          setCompareProduct1(product);
        }
        setActiveImageIndex(0);
        setSelectedUpgrades({
          ram: '16gb',
          storage: '512gb',
          os: 'win11p'
        });
      } else {
        setSelectedProduct(null);
        setIsCustomizing(false);
      }
    } else if (path === '/cart' || path === '/resellers') {
      // Persist selection for cart/reseller views
    } else {
      setSelectedProduct(null);
      setIsCustomizing(false);
    }
  }, [location.pathname, location.state]);

  const handleProductClick = (product: any, customizing = false) => {
    navigate(`/product/${product.sku}`, { state: { customizing } });
  };

  const closeProductDetail = () => {
    navigate('/', { state: { scrollTo: 'products' } });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isProductPage = location.pathname.startsWith('/product/');
  const isResellerPage = location.pathname === '/resellers';
  const isSupportPage = location.pathname === '/support';
  const isSpecialPage = isProductPage || isResellerPage || isSupportPage;

  const uniqueRams = ['All', ...new Set(ALL_PRODUCTS.filter(p => p.category === selectedCategory).map(p => p.ram))].filter(Boolean);
  const uniqueCpus = ['All', 'Core i3', 'Core i5', 'Core i7', 'Core Ultra', 'Celeron'];
  const uniqueGpus = ['All', 'RTX 4050', 'RTX 4060', 'RTX 4070', 'Integrated'];

  const handleSubNavClick = (catId: string) => {
    setSelectedCategory(catId);
    if (isSpecialPage) {
      navigate('/', { state: { scrollTo: 'products' } });
    } else {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (id: string) => {
    if (isSpecialPage) {
      navigate('/', { state: { scrollTo: id } });
    } else {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isSpecialPage && location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        if (id === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        // Clear the state
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [isProductPage, location.state]);

  return (
    <div className="min-h-screen bg-white selection:bg-accent/30">
      {/* Top Header */}
      <header className={`sticky top-0 z-[60] transition-all duration-300 ${scrolled ? 'shadow-premium' : ''}`}>
        <div className={`bg-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('top')}>
                  <img 
                    src={logo}
                    alt="Leader Computers"
                    className="h-8 w-auto py-1"
                    referrerPolicy="no-referrer"
                  />
                </div>
              <nav className="hidden lg:flex items-center gap-2">
                {[                  
                  { name: 'Featured', id: 'featured' },
                  { name: 'Products', id: 'products' },
                  { name: 'Become a reseller', id: 'become-a-reseller' },
                  { name: 'Support', id: 'support' }
                ].map((item) => (
                  <button 
                    key={item.name} 
                    onClick={() => {
                      if (item.id === 'support') {
                        navigate('/support');
                      } else if (item.id === 'become-a-reseller') {
                        window.open('https://web.leadersystems.com.au/become-a-reseller/', '_blank');
                      } else {
                        handleNavClick(item.id);
                      }
                    }}
                    className="text-[14px] font-display font-bold text-primary/70 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-all active:scale-95"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={navSearchQuery}
                  onChange={(e) => {
                    setNavSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  onFocus={() => setShowSearchSuggestions(true)}
                  className="bg-surface border-none focus:ring-2 focus:ring-accent/20 px-4 py-2 pl-10 rounded-full text-xs font-bold w-48 transition-all focus:w-64 text-primary placeholder:text-muted"
                />
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />

              {/* Search Suggestions Dropdown */}
              <AnimatePresence>
                {showSearchSuggestions && navSearchQuery.length > 1 && (
                  <>
                    <div 
                      className="fixed inset-0 z-[65]" 
                      onClick={() => setShowSearchSuggestions(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-surface overflow-hidden z-[70] min-w-[300px]"
                    >
                      <div className="p-4 border-b border-surface bg-surface/30">
                        <p className="text-[10px] font-black text-muted uppercase tracking-widest">Product Suggestions</p>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {[...ALL_PRODUCTS, ...COPILOT_PRODUCTS]
                          .filter(p => 
                            p.name.toLowerCase().includes(navSearchQuery.toLowerCase()) || 
                            p.sku.toLowerCase().includes(navSearchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(navSearchQuery.toLowerCase())
                          )
                          .slice(0, 6)
                          .map((product) => (
                            <button
                              key={product.sku}
                              onClick={() => {
                                handleProductClick(product);
                                setNavSearchQuery('');
                                setShowSearchSuggestions(false);
                              }}
                              className="w-full flex items-center gap-4 p-4 hover:bg-surface transition-colors text-left group"
                            >
                              <div className="w-12 h-12 bg-white rounded-lg p-1 flex-shrink-0 border border-surface group-hover:border-accent/30 transition-colors">
                                <img src={product.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                              </div>
                              <div className="flex-grow min-w-0">
                                <h4 className="text-xs font-bold text-primary truncate group-hover:text-accent transition-colors">{product.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[9px] font-mono font-black text-accent uppercase tracking-tighter">{product.sku}</span>
                                  <span className="text-[9px] font-bold text-muted uppercase tracking-widest">• {product.category}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <p className="text-xs font-display font-black text-primary">${product.price}</p>
                                <p className="text-[8px] font-bold text-muted uppercase tracking-widest leading-none">RRP INC GST</p>
                              </div>
                            </button>
                          ))}
                        
                        {[...ALL_PRODUCTS, ...COPILOT_PRODUCTS]
                          .filter(p => 
                            p.name.toLowerCase().includes(navSearchQuery.toLowerCase()) || 
                            p.sku.toLowerCase().includes(navSearchQuery.toLowerCase())
                          ).length === 0 && (
                          <div className="p-8 text-center">
                            <p className="text-xs text-muted font-bold">No products found for "{navSearchQuery}"</p>
                          </div>
                        )}
                      </div>
                      {navSearchQuery.length > 0 && (
                        <div className="p-3 bg-surface/50 border-t border-surface text-center">
                          <button 
                            onClick={() => {
                              setGlobalSearchQuery(navSearchQuery);
                              setShowSearchSuggestions(false);
                              handleNavClick('products');
                            }}
                            className="text-[10px] font-black text-accent uppercase tracking-widest hover:underline"
                          >
                            View All Results
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2 text-xs font-bold text-primary/80 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" /> Contact Us
            </button>
            
            <div className="relative group">
              <div 
                className="flex items-center gap-2 text-xs font-bold text-primary/80 hover:text-primary transition-colors cursor-pointer relative py-2"
                onClick={() => navigate('/resellers')}
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-accent rounded-full border-2 border-white shadow-sm" />
                  )}
                </div>
                Cart
                          </div>

              {/* Cart Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[70]">
                <div className="bg-white rounded-2xl shadow-2xl border border-surface w-80 overflow-hidden">
                  <div className="p-4 border-b border-surface bg-surface/30">
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest">Your Cart ({cartItems.length})</p>
                  </div>
                  
                  <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
                    {cartItems.length > 0 ? (
                      <div className="divide-y divide-surface">
                        {cartItems.map((item) => (
                          <div key={item.id} className="p-4 flex gap-4 hover:bg-surface/50 transition-colors">
                            <div className="w-12 h-12 bg-white rounded-lg p-1 border border-surface flex-shrink-0">
                              <img src={item.product.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-grow min-w-0">
                              <div className="flex justify-between items-start gap-2">
                                <p className="text-[11px] font-black text-primary truncate uppercase">{item.product.name}</p>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromCart(item.id);
                                  }}
                                  className="text-muted hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-[10px] font-bold text-muted">
                                  RRP ${(item.product.price + Object.entries(item.upgrades).reduce((acc, [cat, id]) => {
                                    const opt = (UPGRADE_OPTIONS as any)[cat]?.find((o: any) => o.id === id);
                                    return acc + (opt?.price || 0);
                                  }, 0)).toLocaleString()}
                                </p>
                                <div className="flex items-center bg-surface rounded-md overflow-hidden border border-surface">
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateCartQuantity(item.id, -1);
                                    }}
                                    className="p-1 hover:bg-white text-muted transition-colors"
                                  >
                                    <Minus className="w-2.5 h-2.5" />
                                  </button>
                                  <span className="w-6 text-center text-[9px] font-mono font-black text-primary">{item.quantity}</span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      updateCartQuantity(item.id, 1);
                                    }}
                                    className="p-1 hover:bg-white text-muted transition-colors"
                                  >
                                    <Plus className="w-2.5 h-2.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <ShoppingCart className="w-8 h-8 text-muted/20 mx-auto mb-3" />
                        <p className="text-xs font-bold text-muted">Your cart is empty</p>
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="p-4 bg-surface/30 border-t border-surface">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest">Total Estimated</span>
                        <span className="text-sm font-black text-primary">RRP ${calculateCartTotal().toLocaleString()}</span>
                      </div>
                      <button 
                        onClick={() => navigate('/resellers')}
                        className="w-full bg-accent text-white py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 active:scale-95"
                      >
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Navigation */}
        <div className="bg-primary text-white hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-12 py-3">
            {SUB_NAV.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleSubNavClick(item.id)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {isSupportPage ? (
          <SupportView />
        ) : isResellerPage ? (
          <ResellerOrderView 
            items={cartItems}
            totalPrice={calculateCartTotal()} 
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
          />
        ) : !isProductPage ? (
          <>
            {/* Hero Section with Background Carousel */}
            <section className="relative h-[480px] md:h-[650px] lg:h-[750px] overflow-hidden">
        {CAROUSEL_SLIDES.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 10 : 0
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[6000ms] ease-linear"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: currentSlide === index ? 'scale(1.1)' : 'scale(1)'
              }}
            />
            <div className="absolute inset-0 bg-black/40 lg:bg-gradient-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent" />
            
            <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ 
                  x: currentSlide === index ? 0 : -50,
                  opacity: currentSlide === index ? 1 : 0
                }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="max-w-2xl"
              >
                <span className="inline-block bg-accent text-white text-[11px] font-bold px-4 py-1.5 rounded-full mb-6">
                  {slide.tag}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl hidden sm:block">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {slide.buttonLink ? (
                    <a 
                      href={slide.buttonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-accent text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-xl shadow-accent/25 active:scale-95"
                    >
                      {slide.buttonText || "Learn more"} <ChevronRight className="w-5 h-5" />
                    </a>
                  ) : (
                    <button className="bg-accent text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-xl shadow-accent/25 active:scale-95">
                      Learn more <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Carousel Controls & Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8">
          <button 
            onClick={() => handleManualSlide('prev')}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-3">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setLastInteraction(Date.now());
                  setCurrentSlide(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? "w-8 bg-accent" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button 
            onClick={() => handleManualSlide('next')}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm transition-all active:scale-90"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Trust Bar - Vertical Pillars connecting hero to content */}
            <section className="bg-white border-b border-surface overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                  {TRUST_ITEMS.map((item, idx) => (
                    <div 
                      key={item.title}
                      className="group relative flex flex-col items-center min-h-[220px] lg:min-h-[300px] border-x border-surface/50 first:border-l-0 last:border-r-0 pt-4 lg:pt-6"
                    >
                      {/* Large Connecting Icon */}
                      <div className="relative z-10 mb-6 transform group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <item.icon className="w-12 h-12 lg:w-16 lg:h-16 text-accent relative z-10" strokeWidth={1} />
                      </div>
      
                      {/* Vertical Connector Line (Visual only) */}
                      <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-surface via-transparent to-surface left-1/2 -translate-x-1/2 -z-0 opacity-20" />
      
                      {/* Revealable Wording */}
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mt-auto pb-6 lg:pb-10 text-center px-6"
                      >
                        <div className="flex flex-col items-center">
                          {item.title.includes("100%") ? (
                            <div className="space-y-0.5">
                              <span className="text-3xl lg:text-4xl font-display font-bold text-primary block">100%</span>
                              <p className="text-[12px] lg:text-[14px] font-bold text-primary leading-tight">
                                Australian Owned Manufacturer
                              </p>
                            </div>
                          ) : item.title.includes("1,000+") ? (
                            <div className="space-y-0.5">
                              <span className="text-3xl lg:text-4xl font-display font-bold text-primary block">1,000+</span>
                              <p className="text-[12px] lg:text-[14px] font-bold text-primary leading-tight">
                                Available From Authorised Resellers
                              </p>
                            </div>
                          ) : (
                            <p className="text-[12px] lg:text-[14px] font-bold text-primary leading-tight max-w-[220px]">
                              {item.title}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

      {/* Featured Copilot+ PCs Section */}
      <section id="featured" className="py-24 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-accent" />
                <span className="text-accent text-xs font-black uppercase tracking-widest">Official Microsoft Partner</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">Copilot+ PCs</h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Leader is proud to be at the forefront of the AI revolution. As a premier Microsoft partner, we've engineered the next generation of Copilot+ PCs to deliver unprecedented performance, all-day battery life, and the most advanced AI experiences available today.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
                <button 
                  onClick={() => setShowCopilotOverlay(true)}
                  className="bg-accent text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-primary transition-all active:scale-95 flex items-center gap-2 group shadow-xl shadow-accent/20"
                >
                  View all Copilot+ PCs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="https://leadermarketing.com.au/aileaderpc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-primary transition-all active:scale-95 flex items-center justify-center"
                >
                  Want to learn more?
                </a>
              </div>
            </motion.div>

            {/* Placeholder for future image */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative hidden sm:block"
            >
              {/* Empty space as requested */}
            </motion.div>                 
          </div>
        </div>
      </section>

      {/* Categories Horizontal Line */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">
              {globalSearchQuery ? `Search Results for "${globalSearchQuery}"` : "Engineered for Every Need"}
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              {globalSearchQuery 
                ? `Showing ${filteredProducts.length} products matching your search.` 
                : "Select a category to explore our range of high-performance solutions."}
            </p>
            {globalSearchQuery && (
              <button 
                onClick={() => {
                  setGlobalSearchQuery('');
                  setNavSearchQuery('');
                }}
                className="mt-6 text-accent font-black uppercase text-[10px] tracking-widest hover:underline flex items-center gap-2 mx-auto"
              >
                <X className="w-3 h-3" /> Clear Search & Show All Categories
              </button>
            )}
          </div>
          
          {!globalSearchQuery && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
              {CATEGORIES.map((cat) => (
                <motion.button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex flex-col items-center p-4 md:p-8 rounded-3xl border-2 transition-all duration-300 ${
                    selectedCategory === cat.id 
                    ? "border-accent bg-accent/5 shadow-premium scale-105" 
                    : "border-surface bg-white hover:border-muted/30 hover:bg-surface/50 hover:shadow-premium"
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                    selectedCategory === cat.id ? "bg-accent text-white shadow-lg shadow-accent/20" : "bg-surface text-muted group-hover:text-primary"
                  }`}>
                    <cat.icon className="w-7 h-7" />
                  </div>
                  <p className={`text-center font-bold text-[11px] ${
                    selectedCategory === cat.id ? "text-accent" : "text-muted"
                  }`}>
                    {cat.name}
                  </p>
                </motion.button>
              ))}
            </div>
          )}

          {/* Product Grid with Filter */}
          <div className="mt-16 flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filter */}
            {!globalSearchQuery && (
              <aside className="lg:w-64 flex-shrink-0 hidden lg:block">
                <div className="sticky top-32 bg-surface p-8 rounded-xl border border-gray-200 shadow-premium">
                  <h4 className="font-bold text-primary text-sm mb-8">Filters</h4>
                  
                  <div className="mb-10">
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-xs font-bold text-primary">Max Price</label>
                      <span className="text-lg font-bold text-accent">${priceFilter}</span>
                    </div>
                    <div className="relative h-6 flex items-center">
                      <div className="absolute w-full h-1.5 bg-white rounded-full border border-surface shadow-inner" />
                      <div 
                        className="absolute h-1.5 bg-accent rounded-full shadow-[0_0_10px_rgba(0,184,212,0.3)]" 
                        style={{ width: `${((priceFilter - 500) / 4500) * 100}%` }}
                      />
                      <input 
                        type="range" 
                        min="500" 
                        max="5000" 
                        step="100"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(parseInt(e.target.value))}
                        className="absolute w-full opacity-0 cursor-pointer z-10"
                      />
                      <div 
                        className="absolute w-5 h-5 bg-white border-2 border-accent rounded-full shadow-lg pointer-events-none transition-transform group-hover:scale-110"
                        style={{ left: `calc(${((priceFilter - 500) / 4500) * 100}% - 10px)` }}
                      />
                    </div>
                    <div className="flex justify-between mt-3 text-[9px] font-black text-muted uppercase tracking-tighter">
                      <span>$500</span>
                      <span>$5000</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">RAM</p>
                      <select 
                        value={ramFilter}
                        onChange={(e) => setRamFilter(e.target.value)}
                        className="w-full bg-white border border-surface rounded-xl px-4 py-2 text-sm font-medium text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                      >
                        {uniqueRams.map(ram => (
                          <option key={ram} value={ram}>{ram}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">CPU Series</p>
                      <select 
                        value={cpuFilter}
                        onChange={(e) => setCpuFilter(e.target.value)}
                        className="w-full bg-white border border-surface rounded-xl px-4 py-2 text-sm font-medium text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                      >
                        {uniqueCpus.map(cpu => (
                          <option key={cpu} value={cpu}>{cpu}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">Graphics</p>
                      <select 
                        value={gpuFilter}
                        onChange={(e) => setGpuFilter(e.target.value)}
                        className="w-full bg-white border border-surface rounded-xl px-4 py-2 text-sm font-medium text-primary focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                      >
                        {uniqueGpus.map(gpu => (
                          <option key={gpu} value={gpu}>{gpu}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </aside>
            )}

            {/* Main Product Grid */}
            <main className="flex-grow">
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <motion.div 
                        layout
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                        onClick={() => handleProductClick(product)}
                        className="bg-surface border border-gray-200 rounded-xl overflow-hidden shadow-premium hover:border-accent/50 transition-all duration-300 group cursor-pointer relative"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-white to-surface/30 relative">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out" 
                            referrerPolicy="no-referrer" 
                          />
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCompare(product);
                              }}
                              className={`backdrop-blur-sm border px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all group/compare active:scale-95 ${
                                [compareProduct1?.id, compareProduct2?.id, compareProduct3?.id].includes(product.id)
                                  ? "bg-accent text-white border-accent"
                                  : "bg-white/90 border-surface hover:bg-accent hover:text-white"
                              }`}
                            >
                              <ArrowLeftRight className="w-3.5 h-3.5" />
                              <span className="text-[10px] font-black uppercase tracking-widest">
                                {[compareProduct1?.id, compareProduct2?.id, compareProduct3?.id].includes(product.id) ? "Added" : "Compare"}
                              </span>
                            </button>
                          </div>
                        </div>
                        <div className="p-8">
                          <div className="space-y-4">
                            <div>
                              <p className="text-[10px] font-mono font-bold text-accent mb-1">{product.sku}</p>
                              <h4 className="text-2xl font-display font-black text-primary leading-tight group-hover:text-accent transition-colors uppercase tracking-tight">{product.name}</h4>
                            </div>
                            
                            <div className="flex items-baseline gap-2">
                              <p className="text-2xl font-display font-black text-primary">${product.price.toLocaleString()}</p>
                              <p className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none">RRP INC GST</p>
                            </div>

                            {/* Product Highlights List */}
                            {product.highlights && (
                              <div className="space-y-1.5 pt-2">
                                {product.highlights.slice(0, 4).map((highlight, i) => (
                                  <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-primary/70">
                                    <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                                    <span className="truncate uppercase tracking-tight">{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-3 mt-8">
                            <button  
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProductClick(product, true);
                              }}
                              className="w-full bg-white text-primary border-2 border-primary/10 py-4 rounded-2xl font-bold text-sm hover:bg-surface transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-primary/10"
                            >
                              <Wrench className="w-4 h-4" /> Customize
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product, {
                                  ram: '16gb',
                                  storage: '512gb',
                                  os: 'win11p'
                                });                                
                              }}
                              className="w-full bg-accent text-white py-4 rounded-2xl font-bold text-sm hover:bg-accent/90 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-accent/10"
                            >
                              <ShoppingCart className="w-4 h-4" /> Add to Cart
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="col-span-full py-20 text-center"
                    >
                      <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="w-8 h-8 text-muted" />
                      </div>
                      <p className="text-muted font-bold">No products match your filters.</p>
                      <button onClick={() => {
                        setPriceFilter(5000);
                        setRamFilter('All');
                        setCpuFilter('All');
                        setGpuFilter('All');
                      }} className="mt-4 text-accent font-bold hover:underline">Reset Filters</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Product Detail Modal - REMOVED in favor of dedicated page */}
           
          </>
        ) : (
          /* Dedicated Product Page View */
          selectedProduct ? (
            <div className="bg-white min-h-screen pt-4 pb-24">
              <div className={`${isCustomizing ? "max-w-[1750px]" : "max-w-7xl"} mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700`}>
                {/* Breadcrumbs / Back Link */}
                <div className="mb-4">
                  <button 
                    onClick={closeProductDetail}
                    className="flex items-center gap-2 text-muted hover:text-accent font-bold text-sm transition-colors group"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Back to Catalog
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 mb-12 items-start py-4">
                  {/* Left: Vertical Thumbnails & Main Image */}
                  <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full lg:w-[820px] h-[620px] flex-shrink-0 flex flex-col md:flex-row md:items-center gap-6"
                  >
                    {/* Vertical Thumbnail Column */}
                    <div className="flex flex-row md:flex-col gap-3 order-2 md:order-1 h-full justify-center">
                      {(selectedProduct.images || [selectedProduct.image, "https://picsum.photos/seed/side/800/600", "https://picsum.photos/seed/back/800/600", "https://picsum.photos/seed/detail/800/600"]).map((img: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 overflow-hidden transition-all duration-300 bg-surface flex-shrink-0 ${
                            activeImageIndex === idx ? "border-accent shadow-lg scale-105" : "border-transparent hover:border-accent/30"
                          }`}
                        >
                          <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover p-1.5" referrerPolicy="no-referrer" />
                        </button>
                      ))}
                    </div>

                    {/* Main Image Container */}
                    <div className="flex-grow h-full bg-surface rounded-xl p-4 lg:p-8 flex items-center justify-center relative overflow-hidden group order-1 md:order-2 shadow-premium">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/50 via-transparent to-transparent opacity-50" />
                      <motion.img 
                        key={activeImageIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={selectedProduct.images ? selectedProduct.images[activeImageIndex] : selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-auto max-h-[480px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)] relative z-10 transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </motion.div>

                  {/* Middle: Customization Menu (In-flow) */}
                  <AnimatePresence mode="popLayout">
                    {isCustomizing && (
                      <motion.div
                        initial={{ opacity: 0, width: 0, margin: 0 }}
                        animate={{ opacity: 1, width: 400, margin: "0 1rem" }}
                        exit={{ opacity: 0, width: 0, margin: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="flex-shrink-0 h-[620px] flex flex-col"
                      >
                        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-premium h-full flex flex-col">
                          <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                <Wrench className="w-5 h-5" />
                              </div>
                              <h3 className="text-xl font-black text-primary uppercase tracking-tight">Customise</h3>
                            </div>
                            <button 
                              onClick={() => setIsCustomizing(false)}
                              className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-muted hover:text-accent transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-8 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                            {Object.entries(UPGRADE_OPTIONS).map(([category, options]) => (
                              <div key={category} className="space-y-4">
                                <label className="text-[10px] font-black text-muted uppercase tracking-widest opacity-60 block">
                                  {category}
                                </label>
                                <div className="space-y-2.5">
                                  {options.map((option) => (
                                    <button
                                      key={option.id}
                                      onClick={() => setSelectedUpgrades(prev => ({ ...prev, [category]: option.id }))}
                                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                                        selectedUpgrades[category] === option.id 
                                          ? "border-accent bg-accent/5 shadow-sm" 
                                          : "border-surface bg-surface/30 hover:bg-surface"
                                      }`}
                                    >
                                      <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-primary">{option.label}</span>
                                        {option.price > 0 && (
                                          <span className="text-[10px] font-black text-accent">+${option.price}</span>
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-8 pt-8 border-t border-surface">
                            <button 
                              onClick={() => setIsCustomizing(false)}
                              className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20"
                            >
                              Apply Configuration
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Right: Product Info, Price & Customization */}
                  <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full lg:w-[400px] flex-shrink-0"
                  >
                    <div className="bg-white rounded-xl p-6 lg:p-8 border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.02)] flex flex-col">
                      <div className="mb-6 flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-accent/10 text-accent text-[9px] font-display font-black px-2.5 py-1 rounded-full uppercase tracking-widest">
                            {selectedProduct.category}
                          </span>
                        </div>
                        <h1 className="text-2xl lg:text-3xl font-display font-bold text-primary leading-tight mb-2">
                          {selectedProduct.name}
                        </h1>
                        <p className="text-accent font-mono font-bold text-[11px] mb-6 tracking-wider uppercase">{selectedProduct.sku}</p>
                        
                        {/* Price Section */}
                        <div className="flex flex-col mb-8 pt-6 border-t border-surface">
                          <div className="flex items-baseline gap-2">
                            <p className="text-3xl font-display font-black text-primary">${calculateTotalPrice().toLocaleString()}</p>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none">RRP INC GST</p>
                          </div>
                          <p className="text-[10px] font-bold text-accent mt-1 uppercase tracking-widest">Available via authorised resellers</p>
                        </div>

                        {/* Product Highlights */}
                        {displayProduct.highlights && (
                          <div className="mb-6 space-y-2">
                            {displayProduct.highlights.map((highlight: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 text-xs font-bold text-primary/80">
                                <div className="w-1 h-1 bg-accent rounded-full" />
                                {highlight}
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Australian Warranty Badge */}
                                              <div className="flex items-center gap-2 mb-8">
                                                <ShieldCheck className="w-4 h-4 text-accent" />
                                                <p className="text-[10px] font-black text-primary uppercase tracking-tight">Australian Warranty</p>
                        </div>

                        {/* Unified Action Buttons */}
                        <div className="space-y-3">
                          <button 
                            onClick={() => handleAddToCompare(displayProduct)}
                            className={`w-full py-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                              [compareProduct1?.id, compareProduct2?.id, compareProduct3?.id].includes(displayProduct.id)
                                ? "bg-accent text-white shadow-lg shadow-accent/20" 
                                : "bg-white text-primary border-2 border-primary/10 hover:bg-white/80"
                            }`}
                          >
                            <ArrowLeftRight className="w-4 h-4" />
                            {[compareProduct1?.id, compareProduct2?.id, compareProduct3?.id].includes(displayProduct.id) ? "Added to Compare" : "Compare this product"}
                          </button>

                        <button 
                            onClick={() => setIsCustomizing(!isCustomizing)}
                            className={`w-full py-4 rounded-xl font-black text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] ${
                              isCustomizing 
                                ? "bg-primary text-white" 
                                : "bg-white text-primary border-2 border-primary/10 hover:bg-white/80"
                          }`}
                        >
                          <Wrench className="w-4 h-4" /> {isCustomizing ? "Close Customization" : "Customize"}
                        </button>
                        
                        <button 
                          onClick={() => {
                            addToCart(selectedProduct, {...selectedUpgrades});                    
                          }}
                          className="w-full bg-accent text-white py-4 rounded-xl font-black text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                          >
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Comprehensive Specifications Section */}
                <div className="bg-surface/30 rounded-[3rem] p-8 lg:p-16 border border-surface">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-primary uppercase tracking-tight">Comprehensive Specifications</h3>
                      <p className="text-muted text-sm font-bold">Detailed technical breakdown of the {selectedProduct.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-10">
                    {Object.entries(displayProduct.specs).map(([key, value]: [string, any]) => (
                      <div key={key} className="group">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1 h-1 bg-accent rounded-full" />
                          <p className="text-[9px] font-black text-muted uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
                            {key.replace(/_/g, ' ')}
                          </p>
                        </div>
                        <p className="text-sm font-bold text-primary group-hover:text-accent transition-colors pl-3 border-l border-surface group-hover:border-accent/30 leading-snug">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Product Journey - Apple Style Immersive Experience */}
                <ProductJourney product={displayProduct} />
              </div>
            </div>
          ) : null
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <img 
                    src={logo}
                    alt="Leader Computers"
                    className="h-10 w-auto"
                    referrerPolicy="no-referrer"
                  />
              </div>
              <p className="text-white/50 text-sm mb-8">
                Australia's largest PC manufacturer, dedicated to the IT channel. 
                Proudly Australian owned and operated since 1996.
              </p>
              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/LeaderAus" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com/LeaderComputers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/leaderau/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/leader-computers-pty-ltd/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.youtube.com/user/LeaderComputers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="col-span-1 hidden md:block">
              <h4 className="font-bold mb-6 uppercase tracking-tight text-sm">Navigation</h4>
                            <ul className="space-y-3 text-white/50 text-xs font-bold text-left uppercase tracking-widest">
                              <li><button onClick={() => handleNavClick('featured')} className="hover:text-white transition-colors">Featured</button></li>
                              <li><button onClick={() => handleNavClick('products')} className="hover:text-white transition-colors">Products</button></li>
                              <li><button onClick={() => window.open('https://web.leadersystems.com.au/become-a-reseller/', '_blank')} className="hover:text-white transition-colors">Become a reseller</button></li>
                              <li><button onClick={() => navigate('/support')} className="hover:text-white transition-colors">Support</button></li>
                            </ul>
                            <h4 className="font-bold mt-8 mb-6 uppercase tracking-tight text-sm">Solutions</h4>
                            <ul className="space-y-3 text-white/50 text-xs font-bold text-left uppercase tracking-widest">
                              {CATEGORIES.map(cat => (
                                <li key={cat.id}>
                                  <button onClick={() => handleSubNavClick(cat.id)} className="hover:text-white transition-colors">
                                    {cat.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {!isSupportPage && (
                            <div id="contact" className="col-span-1 md:col-span-2 bg-white/10 p-10 md:p-16 rounded-xl border border-white/20 shadow-2xl backdrop-blur-sm flex flex-col items-center text-center justify-center">
                              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white mb-8">
                                <Users className="w-8 h-8" />
                              </div>
                              <h4 className="font-black text-3xl text-white uppercase tracking-tight mb-4">Join Our National Reseller Network</h4>
                              <p className="text-white/70 text-sm mb-10 max-w-lg leading-relaxed">
                                Partner with Australia's largest locally owned PC manufacturer and gain access to premium solutions, dedicated support, and exclusive partner benefits.
                              </p>
                              <button 
                                onClick={() => navigate('/resellers')}
                                className="bg-accent text-white px-12 py-5 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-white hover:text-primary transition-all active:scale-95 shadow-xl shadow-accent/20"
                              >
                                Become A Reseller
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-bold text-white/30">
                          <p>© 2026 Leader Computers. All rights reserved.</p>
                          <div className="flex gap-8">
                            <a href="#" className="hover:text-white">Privacy Policy</a>
                            <a href="#" className="hover:text-white">Terms of Sale</a>
                            <a href="#" className="hover:text-white">Reseller Agreement</a>
                          </div>
                        </div>
                      </div>
                    </footer>
              
                    {/* Copilot+ PCs Feature Overlay */}
                    {showCopilotOverlay && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl overflow-y-auto"
                      >
                        <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen flex flex-col">
                          <div className="flex justify-between items-center mb-16">
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="h-px w-8 bg-accent" />
                                <span className="text-accent text-xs font-black uppercase tracking-widest">The Future of AI</span>
                              </div>
                              <h2 className="text-4xl lg:text-6xl font-black text-white">Copilot+ PC Range</h2>
                            </div>
                            <button 
                              onClick={() => setShowCopilotOverlay(false)}
                              className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent transition-all active:scale-90"
                            >
                              <X className="w-8 h-8" />
                            </button>
                          </div>
              
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                            {COPILOT_PRODUCTS.map((product, idx) => (
                              <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative bg-white/5 rounded-xl p-8 border border-white/10 hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/10"
                              >
                                <div className="relative aspect-square mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-transparent">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute top-4 right-4 bg-accent text-white text-[10px] font-black px-3 py-1 rounded-full">
                                    COPILOT+
                                  </div>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsComparing(true);
                                      setCompareProduct1(product);
                                      setShowCopilotOverlay(false);
                                    }}
                                    className="absolute bottom-4 left-4 z-20 bg-white/10 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 hover:bg-accent hover:text-white transition-all group/compare active:scale-95"
                                  >
                                    <ArrowLeftRight className="w-3.5 h-3.5 text-white" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Compare</span>
                                  </button>
                                </div>
              
                                <div className="space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="text-[10px] font-mono font-bold text-accent mb-1">{product.sku}</p>
                                      <h3 className="text-xl font-display font-bold text-white leading-tight group-hover:text-accent transition-colors">{product.name}</h3>
                                    </div>
                                  </div>
              
                                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                                    <div className="flex items-center gap-2">
                                      <Cpu className="w-4 h-4 text-accent" />
                                      <span className="text-xs text-white/60 font-mono font-medium">{product.cpu}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Monitor className="w-4 h-4 text-accent" />
                                      <span className="text-xs text-white/60 font-mono font-medium">{product.ram} RAM</span>
                                    </div>
                                  </div>
              
                                  {/* Product Highlights in Copilot Grid */}
                                  {product.highlights && (
                                    <div className="space-y-1.5 py-2">
                                      {product.highlights.slice(0, 4).map((highlight: string, i: number) => (
                                        <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-white/50">
                                          <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                                          <span className="truncate">{highlight}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
              
                                  <div className="flex flex-col gap-3 pt-4">
                                    <div className="flex items-center justify-center">
                                      <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-mono font-bold text-white">Starts from ${product.price}</span>
                                        <span className="text-[10px] font-semibold text-white/30">RRP/MSRP INC GST</span>
                                      </div>
                                    </div>
                                    <button 
                                      onClick={() => {
                                        handleProductClick(product, true);
                                        setShowCopilotOverlay(false);
                                      }}
                                      className="w-full bg-white text-primary border-2 border-primary/10 py-3 rounded-full font-black text-xs hover:bg-surface transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-primary/10"
                                    >
                                      <Wrench className="w-4 h-4" /> Customize
                                    </button>
                                    <button 
                                      onClick={() => {
                                        addToCart(product, {
                                          ram: '16gb',
                                          storage: '512gb',
                                          os: 'win11p'
                                        });
                                        setShowCopilotOverlay(false);
                                      }}
                                      className="w-full bg-accent text-white py-3 rounded-full font-black text-xs hover:bg-accent/90 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-accent/20"
                                    >
                                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
              
                          <div className="mt-auto bg-accent/10 rounded-[3rem] p-12 border border-accent/20 text-center">
                            <h3 className="text-3xl font-black text-white mb-4">Experience the AI Revolution</h3>
                            <p className="text-white/60 max-w-2xl mx-auto mb-8">
                              Every Copilot+ PC in our range features a dedicated NPU capable of over 40 TOPS, 
                              unlocking next-generation AI features like Recall, Cocreator, and Live Captions.
                            </p>
                            <div className="flex justify-center gap-4">
                              <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full border border-white/10">
                                <ShieldCheck className="w-5 h-5 text-accent" />
                                <span className="text-xs font-bold text-white">Secured-Core PC</span>
                              </div>
                              <div className="flex items-center gap-2 px-6 py-3 bg-white/5 rounded-full border border-white/10">
                                <Wrench className="w-5 h-5 text-accent" />
                                <span className="text-xs font-bold text-white">National Onsite Support</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
              
                    {showLearnMoreOverlay && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-primary overflow-y-auto"
                      >
                        <div className="max-w-7xl mx-auto px-4 py-20 min-h-screen flex flex-col">
                          <div className="flex justify-between items-center mb-16">
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="h-px w-8 bg-accent" />
                                <span className="text-accent text-xs font-black uppercase tracking-widest">Deep Dive</span>
                              </div>
                              <h2 className="text-4xl lg:text-6xl font-black text-white">Learn More</h2>
                            </div>
                            <button 
                              onClick={() => setShowLearnMoreOverlay(false)}
                              className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent transition-all active:scale-90"
                            >
                              <X className="w-8 h-8" />
                            </button>
                          </div>
                          
                          <div className="relative max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              {[
                                {
                                  emoji: "🚀",
                                  title: "Work faster",
                                  text: "Leader Copilot+ PCs are built for speed where it matters most. Open large files instantly, switch between applications without slowdown, and keep workflows moving without interruption—so you can stay focused and in control of your day."
                                },
                                {
                                  emoji: "✨",
                                  title: "Edit smarter",
                                  text: "Take advantage of built-in AI tools that streamline the way you create and refine content. From enhancing images to improving documents, Leader Copilot+ PCs help reduce manual work and make complex edits quicker and easier."
                                },
                                {
                                  emoji: "🎮",
                                  title: "Play harder",
                                  text: "When it’s time to switch off, enjoy smooth performance across streaming, apps, and everyday gaming. Leader Copilot+ PCs are designed to deliver a consistent, responsive experience—so your downtime feels just as seamless as your workday."
                                },
                                {
                                  emoji: "🔥",
                                  title: "Achieve more",
                                  text: "Bring it all together with a system designed for modern productivity. Leader Copilot+ PCs help you manage tasks more effectively, stay organised, and keep up with demanding workloads—so you can focus on results that matter."
                                }
                              ].map((item, idx) => (
                                <motion.div 
                                  key={idx}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="bg-white/5 p-10 rounded-xl border border-white/10 hover:border-accent/30 transition-all group"
                                >
                                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                                    {item.emoji}
                                  </div>
                                  <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h3>
                                  <p className="text-white/60 leading-relaxed text-lg">
                                    {item.text}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
              
                            {/* Central Diamond Button */}
                            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                              <motion.button 
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                onClick={() => {
                                  setShowLearnMoreOverlay(false);
                                  setShowCopilotOverlay(true);
                                }}
                                className="relative w-40 h-40 group"
                              >
                                {/* The Diamond Shape */}
                                <div className="absolute inset-0 bg-accent rotate-45 rounded-2xl shadow-[0_0_40px_rgba(255,107,0,0.3)] group-hover:scale-110 group-hover:rotate-[50deg] transition-all duration-500" />
                                
                                {/* The Content (un-rotated) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                  <span className="text-white font-black uppercase tracking-tighter text-sm leading-tight mb-1">
                                    Explore<br />Copilot+ PCs
                                  </span>
                                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
                                </div>
                              </motion.button>
                            </div>
              
                            {/* Mobile CTA */}
                            <div className="md:hidden mt-12 flex justify-center">
                              <button 
                                onClick={() => {
                                  setShowLearnMoreOverlay(false);
                                  setShowCopilotOverlay(true);
                                }}
                                className="bg-accent text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl shadow-accent/20 flex items-center gap-3"
                              >
                                Explore Copilot+ PCs
                                <ArrowRight className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
      {/* Comparison Bar */}
      <AnimatePresence>
        {isComparing && (
          <motion.div
            initial={{ y: "100%" }}
animate={{ 
y: 0,
height: isComparisonExpanded ? '100vh' : '128px',
top: isComparisonExpanded ? 0 : 'auto'
}}
exit={{ y: "100%" }}
transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.8 }}
className={`fixed bottom-0 left-0 right-0 bg-white border-t border-surface shadow-[0_-20px_40px_rgba(0,0,0,0.1)] pb-safe hidden md:flex flex-col overflow-hidden ${isComparisonExpanded ? 'z-[55]' : 'z-[70]'}`}
>
<AnimatePresence>
{!isComparisonExpanded ? (
<motion.div 
  key="collapsed-bar"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ y: -100, opacity: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between gap-8 w-full"
>
  <div className="flex items-center gap-6 flex-grow">
                  {/* Product 1 Slot */}
                  <motion.div 
                    layout
                    whileHover={compareProduct1 ? { scale: 1.02, y: -2 } : {}}
                    className={`flex items-center gap-4 p-3 rounded-2xl border-2 transition-all min-w-[200px] flex-grow ${
                      compareProduct1 ? "bg-surface border-surface shadow-sm" : "border-muted/20 bg-surface/30 border-dashed"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {compareProduct1 ? (
                        <motion.div 
                          key={`slot1-${compareProduct1.id}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-4 w-full"
                        >
                          <div className="w-14 h-14 bg-white rounded-xl p-2 border border-surface flex-shrink-0 relative group">
                            <img src={compareProduct1.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            <button 
                              onClick={() => {
                                setCompareProduct1(null);
                                if (!compareProduct2 && !compareProduct3) {
                                  setIsComparing(false);
                                  setIsComparisonExpanded(false);
                                }
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="min-w-0 flex-grow">
                            <p className="text-[8px] font-mono font-black text-accent uppercase tracking-tighter truncate">{compareProduct1.sku}</p>
                            <h4 className="text-[10px] font-black text-primary truncate">{compareProduct1.name}</h4>
                            <p className="text-[10px] font-display font-black text-primary mt-0.5">RRP ${compareProduct1.price}</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="slot1-empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center w-full py-2"
                        >
                          <p className="text-[10px] font-bold text-muted">Slot 1</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="flex flex-col items-center justify-center text-muted flex-shrink-0">
                    <ArrowLeftRight className="w-4 h-4" />
                    <span className="text-[7px] font-black uppercase tracking-widest mt-0.5">VS</span>
                  </div>

                  {/* Product 2 Slot */}
                  <motion.div 
                    layout
                    whileHover={compareProduct2 ? { scale: 1.02, y: -2 } : {}}
                    className={`flex items-center gap-4 p-3 rounded-2xl border-2 transition-all min-w-[200px] flex-grow ${
                      compareProduct2 ? "bg-surface border-surface shadow-sm" : "border-muted/20 bg-surface/30 border-dashed"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {compareProduct2 ? (
                        <motion.div 
                          key={`slot2-${compareProduct2.id}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-4 w-full"
                        >
                          <div className="w-14 h-14 bg-white rounded-xl p-2 border border-surface flex-shrink-0 relative group">
                            <img src={compareProduct2.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            <button 
                              onClick={() => {
                                setCompareProduct2(null);
                                if (!compareProduct1 && !compareProduct3) {
                                  setIsComparing(false);
                                  setIsComparisonExpanded(false);
                                }
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="min-w-0 flex-grow">
                            <p className="text-[8px] font-mono font-black text-accent uppercase tracking-tighter truncate">{compareProduct2.sku}</p>
                            <h4 className="text-[10px] font-black text-primary truncate">{compareProduct2.name}</h4>
                            <p className="text-[10px] font-display font-black text-primary mt-0.5">RRP ${compareProduct2.price}</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="slot2-empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center w-full py-2"
                        >
                          <p className="text-[10px] font-bold text-muted">Slot 2</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  <div className="flex flex-col items-center justify-center text-muted flex-shrink-0">
                    <ArrowLeftRight className="w-4 h-4" />
                    <span className="text-[7px] font-black uppercase tracking-widest mt-0.5">VS</span>
                  </div>

                  {/* Product 3 Slot */}
                  <motion.div 
                    layout
                    whileHover={compareProduct3 ? { scale: 1.02, y: -2 } : {}}
                    className={`flex items-center gap-4 p-3 rounded-2xl border-2 transition-all min-w-[200px] flex-grow ${
                      compareProduct3 ? "bg-surface border-surface shadow-sm" : "border-muted/20 bg-surface/30 border-dashed"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {compareProduct3 ? (
                        <motion.div 
                          key={`slot3-${compareProduct3.id}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center gap-4 w-full"
                        >
                          <div className="w-14 h-14 bg-white rounded-xl p-2 border border-surface flex-shrink-0 relative group">
                            <img src={compareProduct3.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                            <button 
                              onClick={() => {
                                setCompareProduct3(null);
                                if (!compareProduct1 && !compareProduct2) {
                                  setIsComparing(false);
                                  setIsComparisonExpanded(false);
                                }
                              }}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="min-w-0 flex-grow">
                            <p className="text-[8px] font-mono font-black text-accent uppercase tracking-tighter truncate">{compareProduct3.sku}</p>
                            <h4 className="text-[10px] font-black text-primary truncate">{compareProduct3.name}</h4>
                            <p className="text-[10px] font-display font-black text-primary mt-0.5">RRP ${compareProduct3.price}</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="slot3-empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center w-full py-2"
                        >
                          <p className="text-[10px] font-bold text-muted">Slot 3</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => {
                      setIsComparing(false);
                      setIsComparisonExpanded(false);
                      setCompareProduct1(null);
                      setCompareProduct2(null);
                      setCompareProduct3(null);
                    }}
                    className="text-muted hover:text-primary font-bold text-[12px] px-4"
                  >
                    Clear All
                  </button>
                  <button 
                    disabled={[compareProduct1, compareProduct2, compareProduct3].filter(Boolean).length < 2}
                    onClick={() => setIsComparisonExpanded(!isComparisonExpanded)}
                    className={`px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-xl flex items-center gap-3 relative overflow-hidden group/btn ${
                      [compareProduct1, compareProduct2, compareProduct3].filter(Boolean).length >= 2
                        ? "bg-accent text-white hover:bg-accent/90 shadow-accent/20 active:scale-95" 
                        : "bg-surface text-muted cursor-not-allowed"
                    }`}
                  >
                    <motion.div
                      key={isComparisonExpanded ? "minimize" : "compare"}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      {isComparisonExpanded ? <ChevronDown className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      {isComparisonExpanded ? "Minimize" : "Compare Now"}
                    </motion.div>
                  </button>
                </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="expanded-comparison"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  onScroll={(e) => setCompareScrollTop(e.currentTarget.scrollTop)}
                  className={`flex-grow overflow-y-auto custom-scrollbar px-8 md:px-12 pb-8 md:pb-12 bg-white relative ${scrolled ? 'pt-[96px]' : 'pt-[112px]'}`}
                >
                {/* Close Button for Expanded View */}
                <button 
                  onClick={() => setIsComparisonExpanded(false)}
                  className="absolute top-32 right-8 w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-all shadow-2xl z-20 group/close active:scale-90 border-4 border-white"
                >
                  <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="max-w-7xl mx-auto">
                  {/* Sticky Header for Comparison */}
                  <AnimatePresence>
                    {compareScrollTop > 500 && (
                      <motion.div 
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -60, opacity: 0 }}
                        style={{ top: 0 }}
                        className="sticky z-30 bg-white/95 backdrop-blur-md border-b-[6px] border-accent -mx-8 md:-mx-12 px-8 md:px-12 py-6 hidden md:block"
                      >
                        <div className="grid grid-cols-[200px_1fr_1fr_1fr] gap-8 items-center">
                          <div />
                          {[compareProduct1, compareProduct2, compareProduct3].map((product, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              {product ? (
                                <>
                                  <div className="w-12 h-12 bg-white rounded-lg p-1 border border-surface flex-shrink-0">
                                    <img src={product.image} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                                  </div>
                                  <div className="flex-grow min-w-0 text-left">
                                    <p className="text-[11px] font-black text-primary truncate uppercase">{product.name}</p>
                                    <div className="flex items-baseline gap-1.5">
                                      <p className="text-[11px] font-display font-bold text-accent">${product.price}</p>
                                      <p className="text-[8px] font-bold text-muted uppercase tracking-widest leading-none">RRP INC GST</p>
                                    </div>
                                  </div>
                                  <button 
                                    onClick={() => {
                                      addToCart(product, {
                                        ram: '16gb',
                                        storage: '512gb',
                                        os: 'win11p'
                                      });                                      
                                    }}
                                    className="w-8 h-8 bg-accent text-white rounded-lg flex items-center justify-center hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 active:scale-95"
                                  >
                                    <ShoppingCart className="w-4 h-4" />
                                  </button>
                                </>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-8 md:pt-12">
                    <div className="grid grid-cols-[200px_1fr_1fr_1fr] gap-8 mb-12">
                    <div className="pt-40">
                    </div>
                    {[compareProduct1, compareProduct2, compareProduct3].map((product, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="text-center flex flex-col items-center w-full"
                      >
                        {/* Image Area */}
                        <div className="aspect-square bg-surface rounded-xl p-8 mb-8 border border-gray-200 relative group w-full max-w-[280px] flex items-center justify-center">
                        {product ? (
                            <>
                              <img src={product.image} alt="" className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                              <button 
                                onClick={() => {
                                  if (idx === 0) setCompareProduct1(null);
                                  if (idx === 1) setCompareProduct2(null);
                                  if (idx === 2) setCompareProduct3(null);
                                  if (![compareProduct1, compareProduct2, compareProduct3].filter((p, i) => i !== idx && p).length) {
                                    setIsComparing(false);
                                    setIsComparisonExpanded(false);
                                  }
                                }}
                                className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-xl opacity-100 transition-opacity z-10"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center text-muted/30">
                              <ArrowLeftRight className="w-12 h-12 mb-2" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Empty Slot</span>
                            </div>
                          )}
                        </div>

                        {/* SKU */}
                        <p className="text-xs font-bold text-primary mb-2 uppercase tracking-widest h-4">
                          {product?.sku || ""}
                        </p>

                        {/* Dropdown */}
                        <CompareProductDropdown 
                          currentProduct={product}
                          onSelect={(p) => {
                            if (idx === 0) setCompareProduct1(p);
                            if (idx === 1) setCompareProduct2(p);
                            if (idx === 2) setCompareProduct3(p);
                                }}
                          category={compareProduct1?.category || compareProduct2?.category || compareProduct3?.category || 'notebooks'}
                        />

                        {/* Price */}
                        <div className="flex flex-col items-center h-10 mt-2">
                          <p className="text-2xl font-display font-bold text-primary tracking-tighter">
                            {product ? `$${product.price}` : ""}
                          </p>
                          {product && (
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none">RRP INC GST</p>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <div className="h-12 mt-6 w-full flex justify-center">
                          {product && (
                            <button 
                              onClick={() => {
                                addToCart(product, {
                                  ram: '16gb',
                                  storage: '512gb',
                                  os: 'win11p'
                                });
                                setIsComparisonExpanded(false);
                                setIsComparing(false);
                              }}
                              className="w-full max-w-[180px] bg-accent text-white py-3 rounded-xl font-bold text-sm hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 active:scale-95 flex items-center justify-center"
                            >
                              Add to cart
                            </button>
                          )}
                            </div>                 
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    {Array.from(new Set([
                      ...(compareProduct1?.specs ? Object.keys(compareProduct1.specs) : []),
                      ...(compareProduct2?.specs ? Object.keys(compareProduct2.specs) : []),
                      ...(compareProduct3?.specs ? Object.keys(compareProduct3.specs) : [])
                    ])).map((specKey, index) => (
                      <motion.div 
                        key={specKey}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (index * 0.05) }}
                        className="grid grid-cols-[200px_1fr_1fr_1fr] gap-8 py-6 border-b border-muted/20 hover:bg-surface/10 transition-colors"
                      >
                        <div className="flex items-center">
                          <span className="text-[10px] font-black text-muted uppercase tracking-widest">{specKey.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="text-sm font-bold text-primary text-center">
                          {compareProduct1?.specs?.[specKey] || "—"}
                        </div>
                        <div className="text-sm font-bold text-primary text-center">
                          {compareProduct2?.specs?.[specKey] || "—"}
                        </div>
                        <div className="text-sm font-bold text-primary text-center">
                          {compareProduct3?.specs?.[specKey] || "—"}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
