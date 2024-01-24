import Layout from '../components/layout';

const withLayout = (WrappedComponent) => {
    const WithLayout = (props) => (
        <Layout>
            <WrappedComponent {...props} />
        </Layout>
    );

    WithLayout.displayName = `withLayout(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithLayout;
};

export { withLayout };