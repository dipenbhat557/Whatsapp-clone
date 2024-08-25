import React from 'react';
import { TbCircleDashed } from 'react-icons/tb';
import { BiCommentDetail } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProfileSection = ({
  auth,
  isProfile,
  isGroup,
  handleNavigate,
  handleClick,
  handleCreateGroup,
  handleLogout,
  handleClose,
  open,
  anchorEl,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-3">
      <div onClick={handleNavigate} className="flex items-center space-x-3">
        <img
          className="rounded-full w-10 h-10 cursor-pointer"
          src={
            auth.reqUser?.profile ||
            "https://media.istockphoto.com/id/521977679/photo/silhouette-of-adult-woman.webp?b=1&s=170667a&w=0&k=20&c=wpJ0QJYXdbLx24H5LK08xSgiQ3zNkCAD2W3F74qlUL0="
          }
          alt="profile"
        />
        <p>{auth.reqUser?.name}</p>
      </div>
      <div className="space-x-3 text-2xl flex">
        <TbCircleDashed
          className="cursor-pointer"
          onClick={() => navigate("/status")}
        />
        <BiCommentDetail />
        <div>
          <BsThreeDotsVertical
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className='cursor-pointer'
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleNavigate}>Profile</MenuItem>
            <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
