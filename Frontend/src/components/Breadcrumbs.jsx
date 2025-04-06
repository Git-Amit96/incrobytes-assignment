import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = ({path_segments}) => {
  const format_segment = (segment) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  console.log(path_segments);
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4 pt-4">
      <Link to="/" className="hover:text-gray-700">
        Home
      </Link>
      {path_segments.map((segment, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-400">/</span>
          <Link
            to={segment.url}
            className={`hover:text-gray-700 ${
              index === path_segments.length - 1 ? 'text-gray-900 font-medium' : ''
            }`}
          >
            {format_segment(segment.name)}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs; 