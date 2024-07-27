import {
    atom,
    useAtomValue,
    useSetAtom
} from "jotai";

import { translator_list, test_device_list, generateTestData } from "@data";

export const store = {
    backend_subprocess: null,
    config_window: null,
    log_box_ref: null,
};

const generatePropertyNames = (base_ame) => ({
    current: `current${base_ame}`,
    update: `update${base_ame}`,
    async_update: `asyncUpdate${base_ame}`,
    add: `add${base_ame}`,
    async_add: `asyncAdd${base_ame}`,
});

const createAtomWithHook = (initialValue, base_ame) => {
    const property_names = generatePropertyNames(base_ame);
    const atomInstance = atom(initialValue);

    const useHook = () => {
        const currentAtom = useAtomValue(atomInstance);
        const setAtom = useSetAtom(atomInstance);

        const updateAtom = (value) => {
            setAtom(value);
        };

        const addAtom = (value) => {
            setAtom((old_value) => [...old_value, value]);
        };

        return {
            [property_names.current]: currentAtom,
            [property_names.update]: updateAtom,
            [property_names.add]: addAtom,
        };
    };

    return { atomInstance, useHook };
};

import { loadable } from "jotai/utils";
const createAsyncAtomWithHook = (initialValue, base_ame) => {
    const property_names = generatePropertyNames(base_ame);
    const atomInstance = atom(initialValue);
    const asyncAtom = atom(async (get) => get(atomInstance));
    const loadableAtom = loadable(asyncAtom);

    const useHook = () => {
        const asyncCurrentAtom = useAtomValue(loadableAtom);
        const setAtom = useSetAtom(atomInstance);

        const updateAtom = (value) => {
            setAtom(value);
        };

        const asyncSetAtom = useSetAtom(atom(null, async (get, set, payloadAsyncFunc, ...args) => {
            set(atomInstance, payloadAsyncFunc(...args));
        }));

        const asyncUpdateAtom = async (asyncFunction, ...args) => {
            asyncSetAtom(asyncFunction, ...args);
        };

        const addAtom = (value) => {
            setAtom((old_value) => [...old_value, value]);
        };

        const asyncAddAtom = useSetAtom(atom(null, async (get, set, payloadAsyncFunc, ...args) => {
            const old_value = await get(atomInstance);
            set(atomInstance, payloadAsyncFunc([...old_value, ...args]));
        }));

        return {
            [property_names.current]: asyncCurrentAtom,
            [property_names.update]: updateAtom,
            [property_names.async_update]: asyncUpdateAtom,
            [property_names.add]: addAtom,
            [property_names.async_add]: asyncAddAtom,
        };
    };

    return { atomInstance, useHook };
};

export const { atomInstance: Atom_UiLanguageStatus, useHook: useUiLanguageStatus } = createAtomWithHook("en", "UiLanguageStatus");
export const { atomInstance: Atom_TranslationStatus, useHook: useTranslationStatus } = createAsyncAtomWithHook(false, "TranslationStatus");
export const { atomInstance: Atom_TranscriptionSendStatus, useHook: useTranscriptionSendStatus } = createAsyncAtomWithHook(false, "TranscriptionSendStatus");
export const { atomInstance: Atom_TranscriptionReceiveStatus, useHook: useTranscriptionReceiveStatus } = createAsyncAtomWithHook(false, "TranscriptionReceiveStatus");
export const { atomInstance: Atom_ForegroundStatus, useHook: useForegroundStatus } = createAsyncAtomWithHook(false, "ForegroundStatus");

export const { atomInstance: Atom_MessageLogsStatus, useHook: useMessageLogsStatus } = createAtomWithHook(generateTestData(20), "MessageLogsStatus");
export const { atomInstance: Atom_MainWindowCompactModeStatus, useHook: useMainWindowCompactModeStatus } = createAtomWithHook(false, "MainWindowCompactModeStatus");
export const { atomInstance: Atom_IsOpenedLanguageSelector, useHook: useIsOpenedLanguageSelector } = createAtomWithHook(
    { your_language: false, target_language: false },
    "IsOpenedLanguageSelector"
);

export const { atomInstance: Atom_SelectedPresetTabStatus, useHook: useSelectedPresetTabStatus } = createAtomWithHook(1, "SelectedPresetTabStatus");
export const { atomInstance: Atom_IsOpenedConfigWindow, useHook: useIsOpenedConfigWindow } = createAtomWithHook(false, "IsOpenedConfigWindow");
export const { atomInstance: Atom_SelectedConfigTabId, useHook: useSelectedConfigTabId } = createAtomWithHook("appearance", "SelectedConfigTabId");
export const { atomInstance: Atom_IsOpenedDropdownMenu, useHook: useIsOpenedDropdownMenu } = createAtomWithHook("", "IsOpenedDropdownMenu");

export const { atomInstance: Atom_SelectedMicDeviceStatus, useHook: useSelectedMicDeviceStatus } = createAsyncAtomWithHook("device b", "SelectedMicDeviceStatus");

export const { atomInstance: Atom_MicDeviceListStatus, useHook: useMicDeviceListStatus } = createAtomWithHook(test_device_list, "MicDeviceListStatus");

export const { atomInstance: Atom_TranslatorListStatus, useHook: useTranslatorListStatus } = createAtomWithHook(translator_list, "TranslatorListStatus");
export const { atomInstance: Atom_SelectedTranslatorIdStatus, useHook: useSelectedTranslatorIdStatus } = createAtomWithHook("CTranslate2", "SelectedTranslatorIdStatus");
export const { atomInstance: Atom_IsOpenedTranslatorSelector, useHook: useIsOpenedTranslatorSelector } = createAtomWithHook(false, "IsOpenedTranslatorSelector");

export const { atomInstance: Atom_VrctPosterIndex, useHook: useVrctPosterIndex } = createAtomWithHook(0, "VrctPosterIndex");
export const { atomInstance: Atom_PosterShowcaseWorldPageIndex, useHook: usePosterShowcaseWorldPageIndex } = createAtomWithHook(0, "PosterShowcaseWorldPageIndex");