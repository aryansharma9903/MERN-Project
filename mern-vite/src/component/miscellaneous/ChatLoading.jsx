import { Stack } from '@chakra-ui/react'
import { SkeletonText } from "@chakra-ui/react"
import React from 'react'

const ChatLoading = () => {
  return (
    <Stack>
      <SkeletonText noOfLines={3} gap="4" />
      <SkeletonText noOfLines={3} gap="4" />
      <SkeletonText noOfLines={3} gap="4" />
      <SkeletonText noOfLines={3} gap="4" />
      <SkeletonText noOfLines={3} gap="4" />
      <SkeletonText noOfLines={3} gap="4" />


    </Stack>
  )
}

export default ChatLoading
