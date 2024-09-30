import clsx from "clsx";
import { useTranslation } from "react-i18next";
import styles from "./Appearance.module.scss";
import { useSettingBox } from "../components/useSettingBox";
import { useStore_SelectedMicDevice, useStore_MicDeviceList } from "@store";
export const Appearance = () => {
    const { t } = useTranslation();
    // const { currentSelectedMicDevice, updateSelectedMicDevice } = useStore_SelectedMicDevice();
    // const { currentMicDeviceList } = useStore_MicDeviceList();
    const {
        DropdownMenuContainer,
        // SliderContainer,
        // CheckboxContainer,
        // SwitchboxContainer,
        // EntryContainer,
        // ThresholdContainer,
        // RadioButtonContainer,
        // DeeplAuthKeyContainer,
        // WordFilterContainer,
        // ActionButtonContainer,
    } = useSettingBox();

    return (
        <>
            <UiLanguageContainer />
            <UiScalingContainer />
            <MessageLogUiScalingContainer />



            {/* <DropdownMenuContainer dropdown_id="mic_device" label="Mic Device" desc="description" selected_id={currentSelectedMicDevice.data} list={currentMicDeviceList} selectFunction={selectFunction} state={currentSelectedMicDevice.state} />

            <SliderContainer label="Transparent" desc="description" min="0" max="3000"/>
            <CheckboxContainer label="Transparent" desc="description" checkbox_id="checkbox_id_1"/>
            <SwitchboxContainer label="Transparent" desc="description" switchbox_id="switchbox_id_1"/>

            <RadioButtonContainer label="Transparent" desc="description" switchbox_id="radiobutton_id_1"/>

            <EntryContainer width="20rem" label="Transparent" desc="description" switchbox_id="entry_id_1"/>

            <ThresholdContainer label="Transparent" desc="description" id="mic_threshold"  min="0" max="3000"/>

            <DeeplAuthKeyContainer label={t(`config_page.deepl_auth_key.label`)} desc={t(`config_page.deepl_auth_key.desc`)}/>

            <WordFilterContainer label={t(`config_page.mic_word_filter.label`)} desc={t(`config_page.mic_word_filter.desc`)}/>

            <ActionButtonContainer label={t(`config_page.open_config_filepath.label`)} IconComponent={FolderOpenSvg} OnclickFunction={()=>{}}/> */}

        </>
    );
};

import { LabelComponent } from "../components/label_component/LabelComponent";
import { useUiLanguage } from "@logics_configs/useUiLanguage";

const UiLanguageContainer = () => {
    const { t } = useTranslation();
    const { currentUiLanguage, setUiLanguage } = useUiLanguage();

    const SELECTABLE_UI_LANGUAGES_DICT = {
        en: "English",
        ja: "日本語",
        ko: "한국어",
        "zh-Hant": "繁體中文",
    };


    const is_not_en_lang = currentUiLanguage.data !== "en" && currentUiLanguage.data !== undefined;
    return (
        <div className={styles.ui_language_container}>
            <div className={styles.ui_language_label_wrapper}>
                {is_not_en_lang
                ?
                    <>
                        <LabelComponent label="UI Language" desc={t("config_page.ui_language.label")}/>
                    </>
                :
                    <LabelComponent label={t("config_page.ui_language.label")}/>
                }
            </div>
            <div className={styles.ui_language_selector_container}>
                {currentUiLanguage.state === "pending" && <span className={styles.loader}></span>}
                {Object.entries(SELECTABLE_UI_LANGUAGES_DICT).map(([key, value]) => (
                    <label key={key} className={clsx(styles.radio_button_wrapper, { [styles.is_selected]: currentUiLanguage.data === key } )}>
                        <input
                            type="radio"
                            name="radio"
                            value={key}
                            onChange={() => setUiLanguage(key)}
                            checked={currentUiLanguage.data === key}
                        />
                        <p className={styles.radio_button_label}>{value}</p>
                    </label>
                ))}
            </div>
        </div>
    );
};


import { useUiScaling } from "@logics_configs/useUiScaling";
import { SliderContainer } from "../components/useSettingBox";

import { useEffect, useState } from "react";
const UiScalingContainer = () => {
    const { t } = useTranslation();
    const { currentUiScaling, setUiScaling } = useUiScaling();
    const [ui_ui_scaling, setUiUiScaling] = useState(currentUiScaling.data);

    const onchangeFunction = (value) => {
        setUiUiScaling(value);
    };
    const onchangeCommittedFunction = (value) => {
        setUiScaling(value);
    };
    useEffect(() => {
        setUiUiScaling(currentUiScaling.data);
    }, [currentUiScaling.data]);

    const createMarks = (min, max) => {
        const marks = [];
        for (let value = min; value <= max; value += 10) {
            const label = ([50,70,130,140,160,170,190].includes(value)) ? "" : value;
            marks.push({ value, label: `${label}` });
        }
        return marks;
    };

    const marks = createMarks(40, 200);

    return (
        <SliderContainer
            label={t("config_page.ui_size.label") + " (%)"}
            min="40"
            max="200"
            onchangeCommittedFunction={onchangeCommittedFunction}
            onchangeFunction={onchangeFunction}
            variable={ui_ui_scaling}
            marks={marks}
            step={null}
            track={false}
        />
    );
};

import { useMessageLogUiScaling } from "@logics_configs/useMessageLogUiScaling";

const MessageLogUiScalingContainer = () => {
    const { t } = useTranslation();
    const { currentMessageLogUiScaling, setMessageLogUiScaling } = useMessageLogUiScaling();
    const [ui_message_log_ui_scaling, setUiMessageLogUiScaling] = useState(currentMessageLogUiScaling.data);

    const onchangeFunction = (value) => {
        setUiMessageLogUiScaling(value);
    };
    const onchangeCommittedFunction = (value) => {
        setMessageLogUiScaling(value);
    };
    useEffect(() => {
        setUiMessageLogUiScaling(currentMessageLogUiScaling.data);
    }, [currentMessageLogUiScaling.data]);

    const createMarks = (min, max) => {
        const marks = [];
        for (let value = min; value <= max; value += 10) {
            const label = ([50,70,130,140,160,170,190].includes(value)) ? "" : value;
            marks.push({ value, label: `${label}` });
        }
        return marks;
    };

    const marks = createMarks(40, 200);

    return (
        <SliderContainer
            label={t("config_page.textbox_ui_size.label") + " (%)"}
            min="40"
            max="200"
            onchangeCommittedFunction={onchangeCommittedFunction}
            onchangeFunction={onchangeFunction}
            variable={ui_message_log_ui_scaling}
            marks={marks}
            step={null}
            track={false}
        />
    );
};