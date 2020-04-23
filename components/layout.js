import globalStyles from '../styles/global.js';
import { node } from 'prop-types';

const Layout = ({ children }) => (
  <div className="page-layout">
    {children}
    <style jsx global>
      {globalStyles}
    </style>
  </div>
);

Layout.propTypes = {
  children: node.isRequired
};

export { Layout };
