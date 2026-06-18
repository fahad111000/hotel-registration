import { Box, Flex, Heading, Text, Button, SimpleGrid } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const navigate = useNavigate()

    return (
        <Box bg={'#F8F6F2'} minH={'100vh'} p={8}>

            {/* Navbar */}
            <Flex justify={'space-between'} align={'center'} bg={'white'}
                p={4} rounded={'xl'} mb={8} shadow={'sm'}>
                <Heading size={'md'} color={'#2C3E50'}>Aryana Hotel</Heading>
                <Button colorPalette={'red'} variant={'subtle'}
                    onClick={() => navigate('/')}>
                    Logout
                </Button>
            </Flex>

            {/* Action Cards */}
            <SimpleGrid columns={2} gap={6}>

                <Box bg={'white'} p={6} rounded={'xl'} shadow={'sm'}
                    cursor={'pointer'} onClick={() => navigate('/guestlist')}>
                    <Text fontWeight={'bold'} color={'#2C3E50'}>Guest List</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>View all records</Text>
                </Box>
            </SimpleGrid>

        </Box>
    )
}