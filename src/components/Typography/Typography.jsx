import PropTypes from "prop-types";

const TypographyVariant = PropTypes.oneOf([
  "title",
  "paragraph16_regular",
  "paragraph14_regular",
]);
const TypographyTag = PropTypes.oneOf([
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "div",
  "p",
]);

const Typography = ({
  variant = "title",
  tag: Component = "div",
  children,
  className,
  ...props
}) => {
  return (
    <Component className={`${variant} ${className}`} {...props}>
      {children}
    </Component>
  );
};

Typography.propTypes = {
  variant: TypographyVariant,
  tag: TypographyTag,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Typography;
