import React from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const PageNotFound: React.FC = () => {
    const { t } = useTranslation();

    return <div className="page-not-found">{t("Page not found")}</div>;
};

export default PageNotFound;
