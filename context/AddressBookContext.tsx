"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface SavedAddress {
  id: string;
  label: string; // e.g. "Home", "Office"
  street: string;
  city: string;
  state: string;
}

interface AddressBookContextValue {
  addresses: SavedAddress[];
  addAddress: (address: Omit<SavedAddress, "id">) => void;
  removeAddress: (id: string) => void;
}

const AddressBookContext = createContext<AddressBookContextValue | undefined>(
  undefined
);
const STORAGE_KEY = "shopiq_addresses";

export function AddressBookProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAddresses(JSON.parse(raw));
    } catch {
      // Start empty.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
    } catch {
      // Fail silently.
    }
  }, [addresses, isHydrated]);

  function addAddress(address: Omit<SavedAddress, "id">) {
    setAddresses((prev) => [
      ...prev,
      { ...address, id: crypto.randomUUID() },
    ]);
  }

  function removeAddress(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <AddressBookContext.Provider
      value={{ addresses, addAddress, removeAddress }}
    >
      {children}
    </AddressBookContext.Provider>
  );
}

export function useAddressBook() {
  const ctx = useContext(AddressBookContext);
  if (!ctx)
    throw new Error(
      "useAddressBook must be used within an AddressBookProvider"
    );
  return ctx;
}
