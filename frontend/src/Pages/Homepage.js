import { Box, Container,Text,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useNavigate } from 'react-router-dom';



const Homepage = () => {

  const history = useNavigate();

  useEffect(()=>{
      const user = JSON.parse(localStorage.getItem("userInfo"));   
  
      if(user){
          history("/chats");
      }
  },[history]);


  return (
    <Container maxW='xl' centerContent>
      <Box
        textAlign={'center'}
        d='flex'
        justifyContent='center'
        p={'3'}
        bg={'#B048B5'}
        w="100%"
        m='40px 0 15px 0'
        border={'solid #B048B5'}
        borderRadius='lg'
        borderWidth="1px"
      >
        <Text fontSize={'5xl'} fontFamily={'work sans'} color={'white'} background={'#B048B5'}>
          Talk-a-tive
        </Text>
      </Box>
      <Box bg={'#D291BC'} w='100%' p={'4'} borderRadius={'lg'} borderWidth={'1px'} border={'solid #D291BC'}>
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList>
          <Tab width={'50%'}>Login</Tab>
          <Tab width={'50%'}>Sign up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <Signup />
          </TabPanel>
        </TabPanels>
      </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage;
