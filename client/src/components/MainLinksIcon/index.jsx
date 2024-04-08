import PropTypes from 'prop-types'

export const MainLinksIcon = ({
    url,
    positionX,
    positionY,
    sizeWidth,
    sizeHeight,
    width,
    height,
}) => (
    <i
        data-visualcompletion='css-img'
        style={{
            backgroundImage: `url('${url}')`,
            backgroundPosition: `${positionX}px ${positionY}px`,
            backgroundSize: `${sizeWidth}px ${sizeHeight}px`,
            width: `${width}px`,
            height: `${height}px`,
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
        }}
    ></i>
)

MainLinksIcon.propTypes = {
    url: PropTypes.string,
    positionX: PropTypes.number,
    positionY: PropTypes.number,
    sizeWidth: PropTypes.number,
    sizeHeight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
}