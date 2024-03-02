import { useEffect, useState } from 'react';
import { Avatar, Box, Container, Divider, Grid, Input, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AiFillHome } from "react-icons/ai";
import { useGetProfileByIdQuery } from '../../../store/services/profileService';
import { useSubscribersCountQuery } from '../../../store/services/friendService';
import { useParams } from 'react-router-dom'
import styles from '../profile.module.scss'
import CreatePostModal from '../../../components/modals/CreatePost';
import { placeholderAvatar } from '../../../data/placeholders';
import { useGetPostsByUserQuery } from '../../../store/services/postService';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from '../../../components/Post/Post';
import classNames from 'classnames';
// import PostsWrapper from '../../../components/PostsWrapper';

const Posts = () => {
  const { id } = useParams();

  const fetchProfileId = id ?? localStorage.getItem('userId')
  // eslint-disable-next-line no-unused-vars
  const { data: profile, isLoading } = useGetProfileByIdQuery(fetchProfileId);
  const { data: loggedUserProfile, isLoading: isLoggedUserLoading } = useGetProfileByIdQuery(localStorage.getItem('userId'))
  const { data: subscribersCount } = useSubscribersCountQuery(fetchProfileId);

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)
  const triggerPostModal = () => setIsCreatePostModalOpen(true)

  const [page, setPage] = useState(0)
  const { data: postQueryData } = useGetPostsByUserQuery({ id: fetchProfileId, page, size: 5 });

  const { content: posts, hasNext } = postQueryData ?? { content: [] }

  const [postsData, setPostsData] = useState([])

  useEffect(() => {
    if (posts && posts.length > 0) {
      if (page === 0) {
        setPostsData(posts);
      } else {
        const existingPostIds = new Set(postsData.map(post => post.id));

        const newPosts = posts.filter(post => !existingPostIds.has(post.id));

        setPostsData([...postsData, ...newPosts]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, page]);


  const onClose = () => {
    setIsCreatePostModalOpen(false)
  }

  const addNewPost = (post) => {
    if (post) setPostsData([post, ...postsData])
    console.log('post', post);
  }

  const removePost = (postId) => {
    setPostsData(postsData.filter(post => post.id !== postId))
  }
  const fetchData = () => {
    setPage(page + 1);
  };

  console.log('postsData', postsData, postQueryData);



  return (
    profile &&
    <>
      <Box sx={{ backgroundColor: (theme) => theme.palette.wash }}>
        <Container maxWidth={'lg'} sx={{ p: 2 }}>
          <Grid container spacing={4} >
            <Grid item xs={12} sm={6} md={5}>
              <div className={styles.card}>
                <Typography fontWeight={900} fontSize={20}>About me</Typography>
                <Typography marginY={2}>{profile.bio}</Typography>
                <Divider />
                <Typography marginTop={2}><AiFillHome /> Lives in {profile.city}</Typography>
                <Typography marginTop={2}>Subscribers : {subscribersCount}</Typography>
              </div>
              <div className={styles.card}>
                <div>
                  <Typography fontWeight={900} fontSize={20}>Photos</Typography>
                  <Link to={'?tab=Photos'}><Typography>View all</Typography></Link>
                </div>
                <div>


                </div>
              </div>
              <div className={styles.card}>
                <div>
                  <Typography fontWeight={900} fontSize={20}>Friends</Typography>
                  <Link to={'?tab=Friends'}><Typography>View all</Typography></Link>
                </div>

              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              {(!isLoggedUserLoading && loggedUserProfile?.id === id || !id) && <div className={classNames(styles.card, styles.mt10)}>
                <div onClick={triggerPostModal}>
                  <Stack width={'100%'} gap={2} direction={'row'}>
                    <Avatar src={loggedUserProfile?.avatarsUrl[0] ?? placeholderAvatar(loggedUserProfile?.gender, loggedUserProfile?.firstName, loggedUserProfile?.lastName)} sx={{ width: 40, height: 'auto' }} />
                    <Input sx={{ width: '100%', borderRadius: '50px', "MuiInput-input": { cursor: 'pointer' } }} disableUnderline placeholder={'What\'s on your mind?'} />
                  </Stack>
                </div>
              </div>}

              <section>
                {postsData.length > 0 && <InfiniteScroll
                  dataLength={postsData?.length ?? 0}
                  next={fetchData}
                  hasMore={hasNext}
                  loader={<h4>Loading...</h4>}
                  className={styles.postWrapper}
                >
                  {postsData?.map((post) => <Post key={post.id}
                    postId={post.id}
                    authorId={post.authorId}
                    avatarUrl={post.authorAvatar}
                    username={post.authorFullName}
                    creationDate={post.creationDate}
                    textContent={post.textContent}
                    images={post.attachments}
                    likesCount={post.likesCount}
                    commentsCount={post?.commentsCount}
                    recentComments={post?.recentComments}
                    liked={post.liked}
                    removePost={() => removePost(post.id)}
                    favourite={post.favourite}
                  />)}
                </InfiniteScroll>}
                {/* <PostsWrapper /> */}
              </section>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <CreatePostModal open={isCreatePostModalOpen} onClose={onClose} onSuccess={addNewPost} />
    </>
  )
}

export default Posts