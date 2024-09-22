import { useStore_UiLanguage } from "@store";
import { useStdoutToPython } from "@logics/useStdoutToPython";

export const useUiLanguage = () => {
    const { asyncStdoutToPython } = useStdoutToPython();
    const { currentUiLanguage, updateUiLanguage, pendingUiLanguage } = useStore_UiLanguage();

    const getUiLanguage = () => {
        pendingUiLanguage();
        asyncStdoutToPython("/get/ui_language");
    };

    const setUiLanguage = (selected_ui_language) => {
        pendingUiLanguage();
        asyncStdoutToPython("/set/ui_language", selected_ui_language);
    };

    return {
        currentUiLanguage,
        getUiLanguage,
        updateUiLanguage,
        setUiLanguage,
    };
};