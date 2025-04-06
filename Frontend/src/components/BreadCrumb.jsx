import { Link, useLocation } from "react-router-dom";

const BreadCrumb = () => {
    const location = useLocation();

    const paths = location.pathname.split("/").filter(Boolean);

    const crumbs = [];


    if (paths.includes("subCategory") && paths.includes("category") ) {
        crumbs.push(
            <span key="category" className="text-gray-500">
                <Link to="/" key="home" className="text-black hover:underline">
                    Category
                </Link>
            </span>
        );
    }

    if (paths.includes("products") && paths.includes("subCategory") ) {
        crumbs.push(
            <span key="category" className="text-gray-500">
                <Link to="/" key="home" className="text-black hover:underline">
                    Category
                </Link>
            </span>
        );
        crumbs.push(
            <span key="subCategory" className="text-gray-500">
                <Link to="/category/67f0f0772c0e382b8af79064/subCategory" key="home" className="text-black hover:underline">
                    Sub Category
                </Link>
            </span>
        );
    }
    if (crumbs.length === 0) return null;

    return (
        <nav className="text-sm mb-4 space-x-2">
            {crumbs.map((crumb, index) => (
                <span key={index}>
                    {crumb}
                    {index < crumbs.length - 1 && <span className="mx-1">/</span>}
                </span>
            ))}
        </nav>
    );
};

export default BreadCrumb;

