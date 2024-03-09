import Layout from '../components/layout';
import {Bounce, ToastContainer} from "react-toastify";
import {API_URL} from "../api/index.js";
import {StompSessionProvider} from "react-stomp-hooks";

const withLayout = (WrappedComponent) => {
    const WithLayout = (props) => (
        <StompSessionProvider url={`${API_URL}/ws`}
                              connectHeaders={{"Authorization": `Bearer ${localStorage.getItem("access")}`}}
                              disconnectHeaders={{"Authorization": `Bearer ${localStorage.getItem("access")}`}}>
            <Layout>
                <ToastContainer
                    position="bottom-right"
                    autoClose={false}
                    stacked

                    hideProgressBar={true}
                    newestOnTop={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
                <WrappedComponent {...props} />
            </Layout>
        </StompSessionProvider>
    );

    WithLayout.displayName = `withLayout(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithLayout;
};

export { withLayout };