import React from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const TestComponent: React.FC = () => {
    const { t } = useTranslation();

    return <div className="test-component">{t("Test component")}</div>;
};

export default TestComponent;
