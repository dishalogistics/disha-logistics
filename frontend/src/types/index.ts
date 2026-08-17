// types for Shipment
export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country?: string;
}

export interface Shipment {
  _id: string;
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  transporter: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  driver: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  pickupAddress: Address;
  deliveryAddress: Address;
  goodsType: string;
  weight: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: 'cm' | 'in' | 'ft';
  };
  vehicleType: string;
  deliverySpeed: string;
  insurance: boolean;
  couponCode?: string;
  notes?: string;
  basePrice: number;
  discount: number;
  finalPrice: number;
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  status: string; // you can use the status enum from backend
  statusHistory: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
