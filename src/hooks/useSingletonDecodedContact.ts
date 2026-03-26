"use client";

import { useEffect, useState } from "react";
import {
  decodeObfuscatedContact,
  type DecodedContact,
} from "@/lib/obfuscatedContact";

let cache: DecodedContact | null | undefined;

export function useSingletonDecodedContact(): DecodedContact | null {
  const [value, setValue] = useState<DecodedContact | null>(null);

  useEffect(() => {
    if (cache === undefined) {
      cache = decodeObfuscatedContact();
    }
    setValue(cache);
  }, []);

  return value;
}
