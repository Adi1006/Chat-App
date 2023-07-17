import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Toast, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import {BellIcon ,  ChevronDownIcon} from "@chakra-ui/icons"
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import ChatLoading from '../chatLoading';


const SideDrawer = () => {
  const [search,setSearch]=useState("");
  const [searchResult, setSearchResult]=useState([]);
  const [loading,setLoading] = useState(false);
  const [loadingChat , setLoadingChat]=useState();
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {user , setSelectedChat  , chats ,setChats}  =ChatState();
  const navigate = useNavigate();
  
  const logoutHandler = () =>{
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toast=useToast();

  const handleSearch = async() =>{
       if(!search){
        toast({
          title:"Please Enter something in search",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"top-left"
        });
        return ;
       }

       try {
        setLoading(true);
        const config = {
          headers:{
            Authorization:`Bearer ${user.token}`
          },
        }
        const {data} = await axios.get(`/api/user?search=${search}`,config);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast({
          titile:"Error Occured!",
          description:"Failed to Load the Search Reaults",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left"
        })
       }
  };

  const accessChat =async (userId) =>{
      try{
        setLoadingChat(true);
        const config = {
          headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${user.token}`,
          }
        };

        const { data} = await axios.post("/api/chat",{userId},config);
        if(!chats.find((c) => c._id === data._id)) setChats([data,...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        onClose();
      }
      catch(error){
        toast({
          titile:"Error Occured!",
          description:"Failed to Load te Search Reaults",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom-left"
        })
      }
  }

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="white"
        width="100%"
        padding="5px 10px 5px 10px"
        borderWidth="5px"
      >
      
        <Text fontSize="3xl" fontFamily="Work sans"  color="#A74AC7" marginLeft="45vw">
          Talk-a-tive
        </Text> 
        <div>
          <Menu>
            <MenuButton p={1}>
                <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={ <ChevronDownIcon /> } >
              <Avatar 
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

    </div>
  )
}

export default SideDrawer
