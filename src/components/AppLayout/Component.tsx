import React from "react";
import "./styles.scss";

interface IAppLayoutProps {
    children?: any;
}

const AppLayout: React.FC<IAppLayoutProps> = (props) => {
    const { children } = props;
    return (
        <div className="app-layout">
            <div className="header">HEADER</div>
            {children}
            <div className="footer">FOOTER</div>
        </div>
    );
};

export default AppLayout;
