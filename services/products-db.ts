import { uuidv4 } from "@firebase/util";
import { rejects } from "assert";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  writeBatch,
  doc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { CreateItemObj, Item, ItemDTO } from "../types/types";
import { db, storage } from "./firebase";
import { compress as compressImage } from "./imageCompressor";

export class ProductsDB {
  private collection;
  constructor() {
    this.collection = collection(db, "products");
  }

  public addProduct = (
    createItemObj: Omit<CreateItemObj, "images"> & {
      images: { url: string }[];
    },
    ownerId: string
  ) => {
    const item: ItemDTO = {
      ownerId,
      title: createItemObj.title,
      description: createItemObj.description,
      price: createItemObj.price,
      mainImage: createItemObj.images[0],
      images: createItemObj.images,
    };
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
      querySnapshot.forEach((doc) => {
        products.push({ ...(doc.data() as Item), id: doc.id });
      });
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

  public async handleUpload(file: File): Promise<string> {
    if (!file) {
      alert("Please choose a file first!");
    }
    const compressedImage = await compressImage(file);
    const storageRef = ref(storage, `/files/${compressedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, compressedImage);

    return new Promise<string>((resolve) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          console.log({ percent });
        },
        (err) => {
          console.log(err);
          rejects(err as any);
        },
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            resolve(url);
          });
        }
      );
    });
  }

  withErrorHandler = async (cb: () => Promise<any>, errorName: string) => {
    try {
      return cb();
    } catch (e) {
      console.error(`Error : ${errorName}`, e);
    }
  };
}
