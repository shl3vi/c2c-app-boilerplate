import { User } from "firebase/auth";
import { action, makeAutoObservable, observable } from "mobx";
import {
  CreateItemObj,
  Item,
  Nullable,
  UserSettings,
  UserSettingsContactTypes,
} from "../types/types";
import { signInWithFB, addAuthStateChangedListener, signOut } from "./fbAuth";
import { ProductsDB } from "./products-db";
import { createDefaultUserSettings, UsersDB } from "./users-db";

export class AppStore {
  public currentUser: Nullable<User> = null;
  public items: Item[] = [];
  public detailedItems: { [id: string]: Item } = {};
  public productsDB = new ProductsDB();
  public usersDB = new UsersDB();
  public readonly isRTL;
  public myAccount: UserSettings = null as any;

  constructor({ isRTL }: { isRTL: boolean }) {
    this.isRTL = isRTL;
    makeAutoObservable(
      this,
      {
        init: action,
        fetchItem: action,
        signIn: action,
      },
      { autoBind: true }
    );
  }

  public async init() {
    addAuthStateChangedListener(this.setCurrentUser);
    const products = await this.productsDB.getProducts();
    this.items = products;
    if (this.currentUser) {
      await this.fetchUserSettings();
    }
  }

  public async fetchUserSettings() {
    const currentUserId = (this.currentUser as any).uid;
    this.myAccount = await this.usersDB.getUser(currentUserId);
    if (!this.myAccount) {
      const userSettings = createDefaultUserSettings(currentUserId);
      await this.usersDB.addUser(userSettings);
      this.myAccount = await this.usersDB.getUser(currentUserId);
    }
  }

  public async fetchItem(itemId: string) {
    const product = await this.productsDB.getProduct(itemId);
    this.detailedItems[itemId] = product;
  }

  public async signIn() {
    await signInWithFB();
  }

  public async signOut() {
    await signOut();
  }

  public setCurrentUser(user: Nullable<User>) {
    this.currentUser = user;
  }

  public async getUserItems(): Promise<Item[]> {
    return this.productsDB.getUserProducts((this.currentUser as User).uid);
  }

  public async createItem(item: CreateItemObj) {
    const urls = await Promise.all(
      (item.images as File[]).map((f) => this.productsDB.handleUpload(f))
    );
    if (!this.currentUser) {
      alert("user is not logged in");
      return Promise.reject();
    }
    await this.productsDB.addProduct(
      { ...item, images: urls.map((url) => ({ url })) },
      (this.currentUser as User).uid
    );
  }

  public async setContactInfoState(type: UserSettingsContactTypes) {
    this.myAccount.contactInfo[type].enabled =
      !this.myAccount.contactInfo[type].enabled;
    await this.usersDB.updateUser(this.myAccount._id, {
      contactInfo: this.myAccount.contactInfo,
    });
  }

  public async setContactInfoValue() {
    await this.usersDB.updateUser(this.myAccount._id, {
      contactInfo: this.myAccount.contactInfo,
    });
  }
}
