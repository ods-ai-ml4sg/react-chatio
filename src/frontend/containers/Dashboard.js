/* eslint-disable no-undef */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import ChannelMessage from '../components/ChannelMessage';
import {ChannelsList, UsersList} from '../components/ChannelsList';
import {Redirect, withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import * as ActionTypes from '../../common/actions/index'

import {
  resetErrorMessage,
  messagePost,
  addListenersTo,
  removeListenersFrom,
  channelList,
  resetChannelUnread
} from "../actions";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'hidden',
    position: 'relative'
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

class Dashboard extends Component {

  static propTypes = {
    classes: PropTypes.object.isRequired,
    addListenersTo: PropTypes.func.isRequired,
    messagePost: PropTypes.func.isRequired,
    channelList: PropTypes.func.isRequired,
    resetChannelUnread: PropTypes.func.isRequired
  };

  eventsToListen = [
    ActionTypes.RESPONSE_MESSAGE,
    ActionTypes.RESPONSE_MESSAGE_SELF,
    ActionTypes.RESPONSE_CHANNEL,
    ActionTypes.RESPONSE_USER_UPDATE
  ];

  state = {
    open: true,
    message: '',
    // channel: this.props.channels[0].name // Default channel
    channel: 'public' // Default channel
  };

  // Subscribe for events from backend
  componentDidMount() {
    this.props.addListenersTo(this.eventsToListen);
  }

  // Scroll messages up on update
  // Reset unread counter
  // Could be really slow?
  componentDidUpdate(prevPros, prevState, SS) {
    // React way? Ref?
    // const element = ReactDOM.findDOMNode(this);
    // TODO figure/refactor this ugly hack
    try {
      let scroller = document.getElementById('messageContainer');
      scroller.scrollTop = scroller.scrollHeight;

      let currentIndex = this.props.channels.map(e => e.name).indexOf(this.state.channel);
      if(this.props.channels[currentIndex].meta.unread !==0) {
        this.props.resetChannelUnread(this.state.channel);
      }
    }
    catch(e) {

    }
  }

  // Deprecated, how to unsub?
  // If don't unsub, listeners may duplicate if state is not cleared on reload
  componentWillUnmount() {
    this.props.removeListenersFrom(this.eventsToListen);
  }

  // endsWith is not supported in all browsers???
  endsWith = function(string, suffix) {
    return string.indexOf(suffix, this.length - suffix.length) !== -1;
  };

  typeMessage = e => {
    // Check if Enter was hit
    if (this.endsWith(e.target.value, '\n')) {
      if (e.target.value.length > 1) {
        this.props.messagePost(this.state.channel, this.state.message);
      }
      this.setState({message: ''});
      return;
    }

    this.setState({message: e.target.value});
  };

  changeChannel = channelName => {
    this.setState({channel: channelName.name});
    this.props.resetChannelUnread(channelName.name);
  };

  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;

    if (!this.props.user.isRegistered) {
      return <Redirect to='/'/>;
    }

    return (
      <React.Fragment>
        <CssBaseline/>
        <div className={classes.root}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon/>
              </IconButton>
              <Typography variant="title" color="inherit" noWrap className={classes.title}>
                # {this.state.channel}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon/>
              </IconButton>
            </div>
            <Divider/>
            <List>
              <ChannelsList
                channels={this.props.channels}
                changeChannel={this.changeChannel}
              />
            </List>
            <Divider/>
            <List>
              <UsersList
                users={this.props.user.users}
                changeChannel={this.changeChannel}
              />
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className="channel-container" id="channelContainer">
              <div className="channel-messages" id="messageContainer">
                {this.props.messages[this.state.channel].map((val, ind) => {
                  return (
                    <ChannelMessage
                      message={val}
                      messageType="outcoming-message"
                      key={ind.toString()}
                    />)
                })
                }
              </div>
            </div>
            <div id="chatInput">
              <TextField
                className="channel-input"
                id="outlined-full-width"
                label="Message chat"
                style={{margin: 8}}
                fullWidth
                placeholder="Type.."
                margin="normal"
                variant="filled"
                onChange={this.typeMessage}
                value={this.state.message}
                multiline
              />
            </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  channels: state.channels,
  messages: state.messages,
  user: state.user,
  error: state.error
});

export default withRouter(connect(mapStateToProps, {
  addListenersTo,
  removeListenersFrom,
  resetErrorMessage,
  messagePost,
  channelList,
  resetChannelUnread
})(withStyles(styles)(Dashboard)))
