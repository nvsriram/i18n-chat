import { createContext, useContext } from "react";

export const FormContext = createContext(null);

export const FormProvider = FormContext.Provider;

export const useFormContext = () => {
    const context = useContext(FormContext);

    if (!context) {
        throw new Error("useFormContext should be used within FormProvider");
    }

    return context;
}