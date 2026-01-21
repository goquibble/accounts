import { createContext, type ReactNode, useContext, useState } from "react";

type DialogType = "profile-picture" | "logout-confirm";

interface DialogContextType {
	dialog: DialogType | null;
	openDialog: (dialog: DialogType) => void;
	closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function DialogProvider({ children }: { children: ReactNode }) {
	const [dialog, setDialog] = useState<DialogType | null>(null);

	const openDialog = (d: DialogType) => setDialog(d);
	const closeDialog = () => setDialog(null);

	return (
		<DialogContext.Provider value={{ dialog, openDialog, closeDialog }}>
			{children}
		</DialogContext.Provider>
	);
}

export function useDialog() {
	const context = useContext(DialogContext);
	if (context === undefined) {
		throw new Error("useDialog must be used within a DialogProvider");
	}
	return context;
}
