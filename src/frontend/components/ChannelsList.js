/* eslint-disable no-undef */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Badge from "@material-ui/core/Badge";
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';

export class ChannelsList extends Component {

  static propTypes = {
    channels: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        {this.props.channels.map((val, ind) => {
          return (
            <ListItem button onClick={() => this.props.changeChannel(val)} key={ind.toString()}>
              <ListItemIcon>
                <PeopleIcon/>
              </ListItemIcon>
              <ListItemText primary={val.name}/>
              {val.meta.unread !== 0 &&
                <Badge badgeContent={val.meta.unread} color="secondary">
                  <MailIcon/>
                </Badge>
              }
            </ListItem>)
        })}
      </div>
    )
  }
}

export class UsersList extends Component {

  static propTypes = {
    users: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
        <ListSubheader inset>Online users</ListSubheader>
        {this.props.users.map((val, ind) => {
          return (
            <ListItem key={ind.toString()}>
              <ListItemIcon>
                <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary={val}/>
            </ListItem>)
        })}
      </div>
    )
  }
}
