import { withLayout } from "../../hooks/withLayout"

const HomePage = () => {
  return (
    <a href="/login">магазин</a>
  )
}


const Home = withLayout(HomePage)
export default Home