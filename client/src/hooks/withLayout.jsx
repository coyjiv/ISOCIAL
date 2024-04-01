import Layout from '../components/layout';
import { Slide, ToastContainer } from "react-toastify";
import { API_URL } from "../api/index.js";
import { StompSessionProvider } from "react-stomp-hooks";
import { useMediaQuery } from 'usehooks-ts';

const withLayout = (WrappedComponent) => {
    const WithLayout = (props) => {
        const isMobile = useMediaQuery('(max-width: 768px)');
        return (
            <StompSessionProvider url={`${API_URL}/ws`}
                connectHeaders={{ "Authorization": `Bearer ${localStorage.getItem("access")}` }}
                disconnectHeaders={{ "Authorization": `Bearer ${localStorage.getItem("access")}` }}>
                <Layout>
                    <ToastContainer
                        position={isMobile ? "top-center" : "bottom-left"}
                        autoClose={false}
                        hideProgressBar={true}
                        newestOnTop={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Slide}
                        limit={1}
                    />
                    <WrappedComponent {...props} />
                </Layout>
            </StompSessionProvider>
        );
    }

    WithLayout.displayName = `withLayout(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithLayout;
};

export { withLayout };