/* jshint ignore:start */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Bookmark from '@material-ui/icons/Bookmark';

const BookmarkMenu = (props)=> {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const storageData = JSON.parse( localStorage.getItem('bookmarks') );

  function openMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className='bookmark-menu'>
      <IconButton onClick={openMenu} aria-controls="fade-menu" aria-haspopup="true">
        <Bookmark />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {
          storageData !== null && storageData.length
          ?
          storageData.sort().map((city) => (
            <MenuItem key={city} onClick={props.checkBookmarkedCity}>
              {city}
            </MenuItem>
          )) 
          :
          <MenuItem >
            No bookmarked cities
          </MenuItem>
        }
      </Menu>
    </div>
  );
	
}

export default BookmarkMenu;
/* jshint ignore:end */