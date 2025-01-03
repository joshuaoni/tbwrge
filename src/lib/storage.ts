import Cookies from "js-cookie";

interface StorageInterface {
  setItem(key: string, value: string): void;
  getItem(key: string): unknown;
  deleteItem(key: string): void;
  checkItem(key: string): boolean;
}

export class CookieStorage implements StorageInterface {
  setItem(key: string, value: string) {
    return Cookies.set(key, value, {
      expires: 6,
      sameSite: "strict",
    });
  }

  getItem(key: string) {
    return Cookies.get(key);
  }

  checkItem(key: string) {
    return Cookies.get(key) != undefined || Cookies.get(key) != null;
  }

  deleteItem(key: string) {
    Cookies.remove(key);
  }
}
