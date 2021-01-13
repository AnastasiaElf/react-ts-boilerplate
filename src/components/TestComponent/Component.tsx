import React from "react";
import "./styles.scss";

interface ITestComponentProps {
    children?: any;
}

const TestComponent: React.FC<ITestComponentProps> = () => <div className="test-component">Test Component</div>;

export default TestComponent;
