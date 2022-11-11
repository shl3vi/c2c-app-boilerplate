export interface ReactComponentProps {
  children?: React.ReactNode;
}

export type Nullable<T> = T | null;

export interface StaticProps {
  locale?: string;
}

export interface Image {
  url: string;
  alt?: string;
}

export interface Item {
  mainImage: Image;
  ownerId: string;
  title: string;
  description: string;
  size: string;
  id: string;
  images: Image[];
  price: {
    price: number;
    currency: string;
  };
}
export interface ItemDTO extends Omit<Item, "id"> {
  mainImage: Image;
  images: Image[];
}

export interface CreateItemObj {
  title: string;
  description: string;
  size: string;
  images?: File[];
  price: {
    price: number;
    currency: string;
  };
}

export type UserSettingsContactTypes = "facebook" | "whatsapp";

export interface UserSettings {
  _id: string;
  uid: string;
  contactInfo: {
    [key in UserSettingsContactTypes]: {
      enabled: boolean;
      value?: string;
    };
  };
}
