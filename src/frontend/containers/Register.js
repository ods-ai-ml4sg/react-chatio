import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {Redirect, withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

import {
  addListenersTo,
  removeListenersFrom,
  userRegister,
  channelList,
  resetErrorMessage} from "../actions";

import {
  RESPONSE_CHANNEL,
  RESPONSE_USER_REGISTER,
  RESPONSE_ERROR} from '../../common/actions/index'

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoaded: false
    };

    // Binding for react scope
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    addListenersTo: PropTypes.func.isRequired,
    removeListenersFrom: PropTypes.func.isRequired,
    userRegister: PropTypes.func.isRequired,
    resetErrorMessage: PropTypes.func.isRequired,
    channelList: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.addListenersTo([RESPONSE_USER_REGISTER, RESPONSE_CHANNEL, RESPONSE_ERROR]);
  }

  // wait for update and dispatch if registered
  // here must be some advanced logic for init for Dashboard
  // mayBe isLoading?
  componentDidUpdate(prevPros, prevState, SS) {
    if(this.props.user.isRegistered && this.props.channels.length === 0) {
      this.props.channelList();
    } else if (this.props.user.isRegistered && this.props.channels.length > 0) {
      this.setState({isLoaded: true});
    }
  }

  // Deprecated, how to unsub?
  componentWillUnmount() {
    this.props.removeListenersFrom([RESPONSE_USER_REGISTER, RESPONSE_CHANNEL, RESPONSE_ERROR]);
  }

  handleChange(e) {
    // Reset
    if(this.props.error.isError) {
      this.props.resetErrorMessage();
    }

    this.setState({username: e.target.value});
  }

  handleSubmit(e) {
    this.props.userRegister(this.state.username);
    e.preventDefault();
  }

  render() {
    const {classes} = this.props;

    if (this.state.isLoaded) {
      return <Redirect to='/chat' />;
    }

    return (
      <React.Fragment>
        <CssBaseline/>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon/>
            </Avatar>
            <Typography variant="subheading">Enter a new user or enter existing</Typography>
            <form
              className={classes.form}
              onSubmit={this.handleSubmit}
            >
              <FormControl margin="normal" required fullWidth error={this.props.error.isError} >
                <InputLabel htmlFor="username">{this.props.error.errorMessage || "Username"}</InputLabel>
                <Input
                  label='Test'
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                Register to chat
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  error: state.error,
  channels: state.channels
});

export default withRouter(connect(mapStateToProps, {
  addListenersTo,
  removeListenersFrom,
  userRegister,
  channelList,
  resetErrorMessage
})(withStyles(styles)(Register)))
