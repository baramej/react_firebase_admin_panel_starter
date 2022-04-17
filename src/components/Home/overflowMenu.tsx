import * as React from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { Settings } from '@material-ui/icons'

import { FirebaseContext } from '../Firebase'

const OverFlowMenu = () => {
  const firebase = React.useContext(FirebaseContext)
  let [anchorEl, setAnchorEl] = React.useState<Element>()

  const close = () => {
    setAnchorEl(undefined)
  }

  const open: React.MouseEventHandler<HTMLButtonElement> = (
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const onSignOut = async () => {
    setAnchorEl(undefined)
    await firebase?.signOut()
  }

  return (
    <div>
      <IconButton
        onClick={open}
        aria-haspopup="true"
        aria-controls="overflow-menu"
        color="inherit"
      >
        <Settings />
      </IconButton>

      <Menu
        id="overflow-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={close}
      >
        <MenuItem onClick={onSignOut}>Signout</MenuItem>
      </Menu>
    </div>
  )
}

export default OverFlowMenu
