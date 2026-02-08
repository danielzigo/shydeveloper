"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

const NotFoundContext = createContext({
	isNotFound: false,
	setIsNotFound: (_value: boolean) => {},
});

export const NotFoundProvider = ({ children }: { children: ReactNode }) => {
	const [isNotFound, setIsNotFound] = useState(false);

	return <NotFoundContext.Provider value={{ isNotFound, setIsNotFound }}>{children}</NotFoundContext.Provider>;
};

export const useNotFound = () => useContext(NotFoundContext);
