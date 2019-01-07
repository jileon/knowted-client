import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';

const requiresLogin = WrappedComponent => {
	class RequiresLogin extends React.Component {
		static propTypes = {
			RL_loggedIn: PropTypes.bool.isRequired,
			RL_submitting: PropTypes.bool.isRequired
		};

		render() {
			const { RL_submitting, RL_loggedIn, ...passThroughProps } = this.props;

			if (RL_submitting) return <Loading />;
			if (!RL_loggedIn) return <Redirect to="/" />;

			return <WrappedComponent {...passThroughProps} />;
		}
	}

	RequiresLogin.displayName = `RequiresLogin(${WrappedComponent.displayName ||
		WrappedComponent.name ||
		'Component'})`;

	const mapStateToProps = state => ({
		RL_loggedIn: state.auth.loggedIn,
		RL_submitting: state.auth.submitting
	});

	return connect(mapStateToProps)(RequiresLogin);
};

export default requiresLogin;
