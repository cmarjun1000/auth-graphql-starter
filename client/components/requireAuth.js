import React from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import currentUserQuery from '../queries/CurrentUser';

export default (WrappedComponent) => {
    class RequireAuth extends React.Component {
        componentWillUpdate(nextProps) {
            if (!nextProps.data.loading && !nextProps.data.user) {
                hashHistory.push("/login");
            }
        }
        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return graphql(currentUserQuery)(RequireAuth);
}

