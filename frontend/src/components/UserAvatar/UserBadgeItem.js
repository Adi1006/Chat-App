import CloseIcon from '@chakra-ui/icons'
import { Box, CloseButton  } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <div>
      <Box
        display="flex"
        px={2}
        py={1}
        borderRadius="lg"
        m="1"
        mb='2'
        variant="solid"
        fontSize={12}
        backgroundColor="purple"
        color="white"
        cursor="pointer"
        onClick={handleFunction}
        justifyContent="center"
        alignItems="center"
      >
        {user.name}
        <CloseButton />
      </Box>
    </div>
  )
}

export default UserBadgeItem
