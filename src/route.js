import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from './page/home';
import PlayList from './page/playlist';
import EditPlaylist from './page/playlist/editPlaylist';
import Albums from './page/albums';

const routeConfig = [{
  component: Home,
  path: '/',
  exact: true
}, {
  component: PlayList,
  path: '/playlist',
  exact: true
}, {
  component: EditPlaylist,
  path: '/playlist/:id',
  exact: true
}, {
  component: Albums,
  exact: true,
  path: '/albums'
}];

export default function AppRoutes() {
  return (
    <Switch>
      {routeConfig.map(route => (
        <Route
          key={route.path}
          {...route}
        />
      ))}
    </Switch>
  )
}