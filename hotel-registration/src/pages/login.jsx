import { Box, Input, Text, Heading, VStack, Button, Field, Flex, Stack } from "@chakra-ui/react"
import { FaUser, FaLock, FaHotel } from 'react-icons/fa'
export default function Login() {
    return (
        <Box
            minH={'100vh'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            px={'4'}

        >
            {/* Card */}
            <Box
                w={'full'}
                p={5}
                rounded={'lg'}
                shadow={'md'}
                maxW={'430px'}
                border={'1px solid'}
                borderColor={'gray.200'}
            >

                <Stack gap={6}>
                    <Stack gap={1} textAlign={'center'}>
                        <Box p={4} borderRadius={'full'} bg={'gray.100'} m={'auto'}>
                            <FaHotel size={'30px'} />
                        </Box>
                        <Heading size={'xl'}>Aryana Hotel</Heading>
                        <Text color="gray.500">Staff login — authorized access only</Text>
                    </Stack>

                    {/* Text */}
                    <Field.Root>
                        <Field.Label>user name</Field.Label>
                        <Input type="text" placeholder="user name" />
                    </Field.Root>

                    {/* Password */}
                    <Field.Root>
                        <Field.Label>Password</Field.Label>
                        <Input type="password" placeholder="password" />
                    </Field.Root>

                    {/* Button */}
                    <Button
                        size="lg"
                        colorPalette="purple"
                        rounded="xl"
                    >
                        Sign In
                    </Button>

                    <Text
                        fontSize="sm"
                        color="blue.500"
                        textAlign="right"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                    >
                        Forgot Password?
                    </Text>

                </Stack>
            </Box>
        </Box>
    )
}