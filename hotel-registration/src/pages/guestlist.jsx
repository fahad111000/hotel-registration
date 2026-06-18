import { Box, Flex, Heading, VStack, Text, Button, Table, Input, Dialog } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import RegistrationForm from "./registration";
import { useState } from "react"
import { IoClose } from "react-icons/io5"

export default function GuestList({ addGuest, guests }) {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();
    const newGuest = () => {
        navigate('/registration')
    }

    return (
        <Box p={'10px'} maxW={'1200px'} mx={'auto'} my={'40px'} border={'3px solid '}
            borderColor={'#E8E0D5'} rounded={'xl'} shadow={'md'}>

            <Flex p={'10px'} align={'center'} justifyContent={'space-between'}>

                {/* Guest List  */}
                <Box>
                    <Heading color={'#2C3E50'}>Guest List</Heading>
                    <Text fontSize={'14px'} fontWeight={"semibold"}>3 guests checked in</Text>
                </Box>

                <Button onClick={() => setOpen(true)}>New Guest</Button>
            </Flex>

            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} closeOnInteractOutside={false}
                size="xl">
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>

                        {/* X button */}
                        <Dialog.CloseTrigger asChild position={'absolute'} top={3} right={3}>
                            <Button variant={'surface'} colorPalette={'red'} size={'sm'}>
                                <IoClose size={10} />
                            </Button>
                        </Dialog.CloseTrigger>

                        <Dialog.Body pt={'20px'}>

                            <RegistrationForm addGuest={addGuest} onClose={() => setOpen(false)} />

                        </Dialog.Body>

                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>

            <hr></hr>

            {/* Table */}
            <Table.Root mt={'30px'}>

                {/* Table HEader */}
                <Table.Header >
                    <Table.Row bg={'gray.100'}>
                        <Table.ColumnHeader>Room No</Table.ColumnHeader>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Father Name</Table.ColumnHeader>
                        <Table.ColumnHeader>CNIC/Passport</Table.ColumnHeader>
                        <Table.ColumnHeader>District</Table.ColumnHeader>
                        <Table.ColumnHeader>Contact</Table.ColumnHeader>
                        <Table.ColumnHeader>Car no</Table.ColumnHeader>
                        <Table.ColumnHeader>Adults</Table.ColumnHeader>
                        <Table.ColumnHeader>Children</Table.ColumnHeader>
                        <Table.ColumnHeader>Checked In</Table.ColumnHeader>
                        <Table.ColumnHeader>Checked Out</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body py={'100px'}>
                    {guests.map((guest, index) => (

                        <Table.Row _hover={{ bg: 'purple.50' }} key={index}>

                            <Table.Cell>{guest.roomNo}</Table.Cell>
                            <Table.Cell>{guest.name}</Table.Cell>
                            <Table.Cell>{guest.fatherName}</Table.Cell>
                            <Table.Cell>{guest.cnic}</Table.Cell>
                            <Table.Cell>{guest.district}</Table.Cell>
                            <Table.Cell>{guest.contact}</Table.Cell>
                            <Table.Cell>{guest.carNo}</Table.Cell>
                            <Table.Cell>{guest.adults}</Table.Cell>
                            <Table.Cell>{guest.children}</Table.Cell>
                            <Table.Cell>{guest.checkedIN}</Table.Cell>
                            <Table.Cell>{guest.checkedOut}</Table.Cell>
                        </Table.Row>
                    ))}


                </Table.Body>
            </Table.Root>

            <Flex justifyContent={'space-between'} align={'center'} mt={4}>
                <Text className="no-print" fontWeight={'semibold'}>Total Guest {guests.length}</Text>
                <Button className="no-print" onClick={() => window.print()}>Print</Button>
            </Flex>
        </Box >
    )
}