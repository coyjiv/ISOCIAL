import PropTypes from 'prop-types'

const Image = ({ src, alt, title }) => {
  return <img src={src} alt={alt} title={title} />
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
}

Image.displayName = 'Image'

export default Image
