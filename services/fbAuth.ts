import { signInWithPopup, FacebookAuthProvider, User } from "firebase/auth";
import { Nullable } from "../types/types";
import { auth } from "./firebase";

const provider = new FacebookAuthProvider();
// provider.addScope("user_birthday");

export const signInWithFB = async (): Promise<Nullable<User>> => {
  try {
    const result = await signInWithPopup(auth, provider);
    // The signed-in user info.
    const user = result.user;
    return user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // const credential = FacebookAuthProvider.credentialFromResult(result);
    // const accessToken = credential.accessToken;
    // console.log({ accessToken });

    // ...
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    console.log('Error:', {errorCode, email, credential});
    
    return null;
    // ...
  }
};

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};

export const addAuthStateChangedListener = (listener: (user: Nullable<User>) => void): void => {
  auth.onAuthStateChanged(listener);
};
