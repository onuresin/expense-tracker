import { useContext } from "react";
import { CurrencyContext } from "../context/currency-context";

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency, CurrencyProvider icinde kullanilmali");
  }
  return context;
}
