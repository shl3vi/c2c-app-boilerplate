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
  id: string;
  images: Image[];
  price: {
    price: number;
    currency: string;
  };
}
