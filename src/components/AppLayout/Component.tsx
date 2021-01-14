import React, { useCallback } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";

interface IAppLayoutProps {
    children?: any;
}

const AppLayout: React.FC<IAppLayoutProps> = (props) => {
    const { children } = props;
    const { i18n } = useTranslation();
    // TODO: move logic to actual header
    const handleLangChange = useCallback(
        (value) => {
            i18n.changeLanguage(value);
        },
        [i18n],
    );

    return (
        <div className="app-layout">
            <div className="header">
                HEADER
                <button type="button" onClick={() => handleLangChange(i18n.language === "en" ? "ru" : "en")}>
                    {i18n.language}
                </button>
            </div>
            {children}
            <div className="footer">FOOTER</div>
        </div>
    );
};

export default AppLayout;
