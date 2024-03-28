// import { useEffect, useCallback, useState, useMemo } from "react"
// import InfiniteScroll from "react-infinite-scroll-component"
// import PropTypes from 'prop-types'
// import styles from '../PostsWrapper/postsWrapper.module.scss'

// const InfiniteDataWrapper = ({ queryFn, skeleton, mapperFnc, mapperQueryArgsFnc, infiniteWrapperProps = {} }) => {
//     const [page, setPage] = useState(0)
//     const [items, setItems] = useState([]);

//     const { data, error, isLoading, isSuccess } = queryFn(...mapperQueryArgsFnc(page))
//     console.log(data);

//     if (data && !data.content) {
//         throw new Error('missing content field from query')
//     }


//     useEffect(() => {
//         if (isSuccess && data?.content) {
//             setItems(prevData => [...prevData, ...data.content]);
//             console.log('working!!!', data);
//         }
//     }, [data, isSuccess]);

//     const fetchMoreData = () => {
//         setPage((prevPage) => prevPage + 1);
//     };

//     const itemsToRender = mapperFnc(items)


//     return (
//         <InfiniteScroll
//             dataLength={items.length}
//             next={fetchMoreData}
//             hasMore={data?.hasNext}
//             loader={<div style={{ display: 'flex', width: '100%' }}>{skeleton}</div>}
//             className={styles.infiniteWrapper}
//             {...infiniteWrapperProps}
//         >
//             {
//                 itemsToRender
//             }
//         </InfiniteScroll>
//     )
// }

// InfiniteDataWrapper.propTypes = {
//     queryFn: PropTypes.func.isRequired,
//     skeleton: PropTypes.node,
//     mapperFnc: PropTypes.func.isRequired,
//     mapperQueryArgsFnc: PropTypes.func.isRequired,
//     infiniteWrapperProps: PropTypes.object
// }

// export default InfiniteDataWrapper