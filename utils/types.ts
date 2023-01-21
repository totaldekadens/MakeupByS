import { SelectItemProps } from "@mantine/core";
import { Schema, Types } from "mongoose";
import { LineItem } from "../components/cart/AddToCartIcon";
import { ChosenOption } from "../components/checkout/Courrier";
import { CategoryDocument } from "../models/Category";
import { ColorTagDocument } from "../models/ColorTag";
import { OrderStatusDocument } from "../models/OrderStatus";
import { Address, UserDocument } from "../models/User";

export type PopulatedOrder = {
  status: OrderStatusDocument;
  orderNo: Number;
  orderNoStripe: string;
  existingCustomer: UserDocument;
  lineItems: LineItem[];
  courrier: {
    name: string;
    info: ChosenOption;
  };
  name: string;
  email: string;
  phone: string;
  invoiceAddress: Address;
  deliveryAddress?: Address | undefined;
  registerDate: string;
  shippingDate: string;
  _id?: Types.ObjectId | undefined;
};

export type PopulatedColor = {
  hexcolor: string;
  colorTag: Types.ObjectId;
  seasons: [
    {
      title: string;
      description: string;
      slug: string;
      _id?: Types.ObjectId;
    }
  ];
  _id?: Types.ObjectId;
};

export type PopulatedProduct = {
  mainProduct: {
    description1: string;
    partNo: string;
    ingredients: string;
    brand: string;
    price: { $numberDecimal: Schema.Types.Decimal128 };
    category: CategoryDocument;
    description2?: string;
    weight?: number;
    discount?: number;
    _id: Types.ObjectId;
  };
  title: string;
  partNo: string;
  slug: string;
  images: string[];
  colors: [
    {
      hexcolor: string;
      colorTag?: ColorTagDocument;
      seasons: [
        {
          title: string;
          description: string;
          slug: string;
          _id?: Types.ObjectId;
        }
      ];
      _id?: Types.ObjectId;
    }
  ];
  createdDate: string;
  lastUpdated: string;
  availableQty: number;
  reservedQty?: number;
  discount?: number;
  _id: Types.ObjectId;
};

export type PopulatedMainProduct = {
  description1: string;
  partNo: string;
  ingredients: string;
  brand: string;
  price: { $numberDecimal: Schema.Types.Decimal128 };
  category: CategoryDocument;
  description2?: string;
  weight?: number;
  discount?: number;
  _id: Types.ObjectId;
};

export interface ItemProps extends SelectItemProps {
  mainProduct: {
    description1: string;
    partNo: string;
    ingredients: string;
    brand: string;
    price: {
      $numberDecimal: Schema.Types.Decimal128;
    };
    category: CategoryDocument;
    description2?: string;
    weight?: number;
    discount?: number;
    _id: Types.ObjectId;
  };
  title: string;
  partNo: string;
  slug: string;
  images: string[];
  colors: [
    {
      hexcolor: string;
      colorTag: Types.ObjectId;
      seasons: [
        {
          title: string;
          description: string;
          slug: string;
          _id?: Types.ObjectId;
        }
      ];
      _id?: Types.ObjectId;
    }
  ];
  createdDate?: string | undefined;
  lastUpdated?: string | undefined;
  availableQty: number;
  reservedQty?: number | undefined;
  discount?: number | undefined;
  _id: Types.ObjectId;
}
