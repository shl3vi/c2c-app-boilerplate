import {
  collection,
  query,
  where,
  CollectionReference,
  getDocs,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { UserSettings } from "../types/types";
import { db } from "./firebase";

export const createDefaultUserSettings = (
  uid: string
): Omit<UserSettings, "_id"> => ({
  uid,
  contactInfo: {
    facebook: {
      enabled: false,
    },
    whatsapp: {
      enabled: false,
    },
  },
});

export class UsersDB {
  private collection: CollectionReference<UserSettings>;
  constructor() {
    this.collection = collection(db, "users") as any;
  }

  public getUser = async (userId: string): Promise<UserSettings> => {
    return this.withErrorHandler(async () => {
      const userQuery = query(this.collection, where("uid", "==", userId));
      const querySnapshot = await getDocs<UserSettings>(userQuery);
      if (querySnapshot.size === 0) {
        return null;
      }
      const uDoc = querySnapshot.docs[0];
      return { ...uDoc.data(), _id: uDoc.id };
    }, "getUser");
  };

  public addUser = (userSettings: Omit<UserSettings, "_id">) => {
    return this.withErrorHandler(async () => {
      const docRef = await addDoc(this.collection, userSettings);
      console.log("Document written with ID: ", docRef.id);
    }, "addUser");
  };

  public updateUser = async (
    id: string,
    overrideObj: Partial<UserSettings>
  ) => {
    const userRef = doc(db, "users", id);
    await setDoc(userRef, overrideObj, { merge: true });
  };

  withErrorHandler = async (cb: () => Promise<any>, errorName: string) => {
    try {
      return cb();
    } catch (e) {
      console.error(`Error : ${errorName}`, e);
    }
  };
}
