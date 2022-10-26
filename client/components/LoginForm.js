import React from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

import mutation from '../mutations/Login';
import AuthForm from './AuthForm';
import query from '../queries/CurrentUser';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { errors: [] };
    }

    componentDidUpdate(nextProps) {
        //nextprops is the next set of props that will be in place when the component rerenders.
        if(!this.props.data.user && nextProps.data.user) {
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(res => {
            this.setState({ errors: res.graphQLErrors.map(error => error.message) });
        });
    }

    render() {
        return (
            <div>
                <h5>Login</h5>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

export default graphql(mutation)(LoginForm);