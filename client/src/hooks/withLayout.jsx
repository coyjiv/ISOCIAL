import Layout from '../components/layout';
import { useGetUserProfile } from "../hooks";

const withLayout = (WrappedComponent) => {
	const WithLayout = (props) => {
		useGetUserProfile();
		
	return (
		<Layout>
			<WrappedComponent {...props} />
		</Layout>
	)	
};

WithLayout.displayName = `withLayout(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

return WithLayout;
};

export { withLayout };