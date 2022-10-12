import { uuidv4 } from "@firebase/util";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  writeBatch,
  doc,
} from "firebase/firestore";
import { CreateItemObj, Item } from "../types/types";
import { db } from "./firebase";

export class ProductsDB {
  private collection;
  constructor() {
    this.collection = collection(db, "products");
  }

  public addProduct = (createItemObj: CreateItemObj, ownerId: string) => {
    const item: Item = {
      id: uuidv4(),
      ownerId,
      title: createItemObj.title,
      description: createItemObj.description,
      price: createItemObj.price,
      mainImage: createItemObj.images ? createItemObj.images[0] : null,
      images: createItemObj.images || []
    }
    return this.withErrorHandler(async () => {
      const docRef = await addDoc(this.collection, item);
      console.log("Document written with ID: ", docRef.id);
    }, "addProduct");
  };

  public getProduct = async (productId: string) => {
    return this.withErrorHandler(async () => {
      const pRef = doc(db, "products", productId);
      const pDoc = await getDoc(pRef);
      return pDoc.data();
    }, "getProduct");
  };

  public getProducts = async (): Promise<Item[]> => {
    return this.withErrorHandler(async () => {
      const querySnapshot = await getDocs(this.collection);
      const products: Item[] = [];
      querySnapshot.forEach((doc) => products.push(doc.data() as Item));
      return products;
    }, "getProducts");
  };

  public addProducts = (productsToAdd: Item[]) => {
    return this.withErrorHandler(async () => {
      const batch = writeBatch(db);
      productsToAdd.forEach((p) => {
        const pRef = doc(db, `/products/${p.title}`);
        batch.set(pRef, p);
      });
      await batch.commit();
    }, "addProducts");
  };

  withErrorHandler = async (cb: () => Promise<any>, errorName: string) => {
    try {
      return cb();
    } catch (e) {
      console.error(`Error : ${errorName}`, e);
    }
  };
}
