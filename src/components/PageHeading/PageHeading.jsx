import React from "react";
import NsicLogo from "../../images/NSIC-logo.png";
import "./PageHeading.less";

const PageHeading = () => {
    return (
    <div className="page-heading-main-container">
        <div className="page-heading-diag-left" style={{'--margin-right': `${580}px`}} />
        <div className="page-heading-diag-left" style={{'--margin-right': `${400}px`}} />
        <div className="page-heading-logo-container" />
        <img src={NsicLogo} alt="NSIC" className="page-heading-nsic-logo" />
        <div className="page-heading-diag-right" style={{'--margin-left': `${400}px`}} />
        <div className="page-heading-diag-right" style={{'--margin-left': `${580}px`}} />
    </div>
    );
}

export default PageHeading;