import { createContext } from 'react';

type SelectContextType = { handleChange: (v: string) => void };
const SelectContext = createContext<SelectContextType>({ handleChange: () => undefined });

export default SelectContext;
