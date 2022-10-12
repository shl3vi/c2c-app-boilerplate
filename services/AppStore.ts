import { User } from "firebase/auth";
import { action, makeAutoObservable} from "mobx";
import { CreateItemObj, Item, Nullable } from "../types/types";
import { signInWithFB, addAuthStateChangedListener, signOut } from "./fbAuth";
import { ProductsDB } from "./products-db";

export class AppStore {
  public currentUser: Nullable<User> = null;
  public items: Item[] = [];
  public detailedItems: {[id: string] : Item} = {};
  public productsDB = new ProductsDB();

  constructor() {
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

  public async createItem(item: CreateItemObj) {
    if (!this.currentUser) {
      alert('user is not logged in');
      return Promise.reject();
    }
    await this.productsDB.addProduct(item, this.currentUser.uid);
  }
}
