import React from 'react'
import { useResolvedPath, useMatch, Link } from "react-router-dom";

const CustomLink = (props) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    const {
        children,
        to
    } = props;

    return (
    <div>
    <Link
        style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
        {...props}
    >
        {children}
    </Link>
    {match && " (active)"}
    </div>
    )
}

export default CustomLink