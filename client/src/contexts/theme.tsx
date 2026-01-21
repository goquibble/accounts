import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
	theme: "system",
	setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = "system",
	storageKey = "vite-ui-theme",
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	);

	useEffect(() => {
		const root = window.document.documentElement;

		// Disable transitions before changing the theme
		root.classList.add("disable-transitions");
		root.classList.remove("light", "dark");

		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

			const applySystemTheme = () => {
				root.classList.remove("light", "dark");
				root.classList.add(systemTheme.matches ? "dark" : "light");
			};

			applySystemTheme();
			systemTheme.addEventListener("change", applySystemTheme);

			// Enable transitions after the theme is applied
			requestAnimationFrame(() => {
				root.classList.remove("disable-transitions");
			});

			return () => {
				systemTheme.removeEventListener("change", applySystemTheme);
			};
		}

		root.classList.add(theme);
		// Enable transitions after the theme is applied
		requestAnimationFrame(() => {
			root.classList.remove("disable-transitions");
		});
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider value={value} {...props}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined)
		throw new Error("useTheme must be used within a ThemeProvider");

	return context;
};
