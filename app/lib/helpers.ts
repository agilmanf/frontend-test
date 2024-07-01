import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const mergeRefs = <T>(
  ...refs: (React.MutableRefObject<T> | React.LegacyRef<T>)[]
): React.RefCallback<T> => {
  return (v) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(v);
      } else if (ref !== null) {
        (ref as React.MutableRefObject<T | null>).current = v;
      }
    });
  };
};

export const parseCookie = (s: string | null) => {
  if (!s) return {};
  return s.split("; ").reduce((r, a) => {
    const [k, v] = a.split("=");
    return { ...r, [k]: v };
  }, {} as Record<string, string>);
};
