import PropTypes from "prop-types";

export const noteValidator = PropTypes.exact({
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  archived: PropTypes.bool,
});
