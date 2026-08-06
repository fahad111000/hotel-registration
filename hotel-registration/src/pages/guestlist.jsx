import { Box, Flex, Heading, VStack, Text, Button, Table, Input, Dialog } from "@chakra-ui/react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import { LuTrash2, LuPencil } from "react-icons/lu";
import RegistrationForm from "./registration";
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import GuestRecords from "./guestRecords";
import { useGuest } from "../context/guestContext";
import { useNavigate } from "react-router-dom";

export default function GuestList() {

    // navigate
    const navigate = useNavigate()

    // Edit
    const [isEdit, setIsEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    // useState for dilog box
    const [open, setOpen] = useState(false);

    // Context values extract here
    const { guests, addGuest, deleteEntry } = useGuest()

    // Search 
    const [search, setSearch] = useState('')



    const matchesSearch = (value) => (value || "").toLowerCase().includes(search.trim().toLowerCase())

    const filterdGuests = guests.filter((guest) => {
        const matchedSearch =
            matchesSearch(guest.name) ||
            matchesSearch(guest.fatherName) ||
            matchesSearch(guest.cnic) ||
            matchesSearch(guest.district) ||
            matchesSearch(guest.contact) ||
            matchesSearch(guest.carNo);


        return matchedSearch
    })

    const highlightText = (text) => {
        if (!text) return ''
        if (!search.trim()) return text

        const regex = new RegExp(`(${search.trim()})`, 'gi')
        const parts = text.split(regex)

        return parts.map((part, i) =>
            part.toLowerCase() === search.trim().toLowerCase()
                ? <span key={i} style={{ color: '#EDD012', fontWeight: 'bold' }}>{part}</span>
                : part
        )
    }


    return (
        <Box p={'10px'} maxW={'1300px'} mx={'auto'} my={'40px'} border={'3px solid '}
            borderColor={'#E8E0D5'} rounded={'xl'} shadow={'md'}>

            <Flex p={'10px'} align={'center'} justifyContent={'space-between'}>

                {/* Guest List  */}
                <Box >
                    <Heading color={'#2C3E50'} fontFamily="'Playfair Display', serif"
                        fontWeight={'bolder'} fontSize={'25px'}>Guest List </Heading>
                </Box>

                <Flex gap={3}>
                    <Input placeholder="search name, cnice etc"
                        value={search}
                        w={'320px'} onChange={(e) => setSearch(e.target.value)} />


                    <Button
                        onClick={() => {
                            setSearch('')

                        }}
                    >
                        Clear
                    </Button>

                </Flex>

                <Flex gap={5}>
                    {/* View All Records */}
                    <Button onClick={() => navigate('/guestRecords')}>View All Records</Button>

                    <Button onClick={() => {
                        setOpen(true)
                        setIsEdit(false)
                        setEditIndex(null)
                    }}>New Guest</Button>

                </Flex>

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

                            <RegistrationForm isEdit={isEdit} editIndex={editIndex} onClose={() => setOpen(false)} />

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
                        <Table.ColumnHeader>Father/Husband </Table.ColumnHeader>
                        <Table.ColumnHeader>CNIC</Table.ColumnHeader>
                        <Table.ColumnHeader>District</Table.ColumnHeader>
                        <Table.ColumnHeader>Contact</Table.ColumnHeader>
                        <Table.ColumnHeader>Car no</Table.ColumnHeader>
                        <Table.ColumnHeader>Adults</Table.ColumnHeader>
                        <Table.ColumnHeader>Children</Table.ColumnHeader>
                        <Table.ColumnHeader>Checked In</Table.ColumnHeader>
                        <Table.ColumnHeader>Checked Out</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body py={'100px'}>
                    {filterdGuests.map((guest, index) => (

                        <Table.Row  key={index}>

                            <Table.Cell>{guest.roomNo}</Table.Cell>
                            <Table.Cell >{highlightText(guest.name)}</Table.Cell>
                            <Table.Cell>{highlightText(guest.fatherName)}</Table.Cell>
                            <Table.Cell>{highlightText(guest.cnic)}</Table.Cell>
                            <Table.Cell>{highlightText(guest.district)}</Table.Cell>
                            <Table.Cell>{highlightText(guest.contact)}</Table.Cell>
                            <Table.Cell>{highlightText(guest.carNo)}</Table.Cell>
                            <Table.Cell>{guest.adults}</Table.Cell>
                            <Table.Cell>{guest.children}</Table.Cell>
                            <Table.Cell>{guest.checkedIN}</Table.Cell>
                            <Table.Cell>{guest.checkedOut}</Table.Cell>
                            <Table.Cell>
                                <Flex gap={2}>
                                    <Button
                                        variant="outline"
                                        color="blue.600"
                                        size="xs"
                                        onClick={() => {
                                            setIsEdit(true);
                                            setEditIndex(guests.indexOf(guest));
                                            setOpen(true)
                                        }}
                                    >
                                        <LuPencil size={16} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        color="red.600"
                                        size="xs"
                                        onClick={() => deleteEntry(index)}
                                    >
                                        <LuTrash2 size={16} />
                                    </Button>
                                </Flex>
                            </Table.Cell>



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