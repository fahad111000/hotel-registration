import { Box, Flex, Heading, VStack, Text, Button, Table, Input, Dialog, IconButton, Pagination, ButtonGroup } from "@chakra-ui/react"
import { LuChevronLeft, LuChevronsRight } from "react-icons/lu"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import { useGuest } from "../context/guestContext"
import { useState } from "react"


export default function GuestRecords() {

    const [currentPage, SetCurrentPage] = useState(1);
    const itemPerPage = 3;


    // Records
    const { records } = useGuest();

    // Search
    const [search, setSearch] = useState('');

    // Dates
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)


    // Search matches adn text hilights
    const matchesSearch = (value) => (value || '').toLowerCase().includes(search.trim().toLowerCase())
    const highlightText = (text) => {
        if (!text) return ''
        if (!search.trim()) return text;

        const regex = RegExp(`(${search.trim()})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) =>
            part.toLowerCase() === search.trim().toLowerCase() ? <span key={i} style={{ color: '#EDD012', fontWeight: 'bold' }}>{part}</span>
                : part
        )


    }

    const filterGuest = records.filter((record) => {
        const matchedSearch =
            matchesSearch(record.name) ||
            matchesSearch(record.fatherName) ||
            matchesSearch(record.cnic) ||
            matchesSearch(record.district) ||
            matchesSearch(record.contact) ||
            matchesSearch(record.carNo);

        let matchDate = true
        if (startDate && endDate) {
            const guestDate = new Date(record.checkedIN);
            const endOfDay = new Date(endDate);

            endOfDay.setHours(23, 59, 59, 999)
            matchDate = guestDate >= startDate && guestDate <= endOfDay
        }

        return matchedSearch && matchDate
    })


    const paginatedRecords = filterGuest.slice(
        (currentPage - 1) * itemPerPage, currentPage * itemPerPage
    )


    return (
        <Box p={'10px'} maxW={'1300px'} mx={'auto'} my={'40px'} border={'3px solid '}
            borderColor={'#E8E0D5'} rounded={'xl'} shadow={'md'}>

            <Flex p={'10px'} flexDirection={'column'} gap={30} align={'center'} justifyContent={'space-between'}>

                {/* Guest List  */}
                <Box>
                    <Heading color={'#2C3E50'} fontFamily="'Playfair Display', serif"
                        fontWeight={'bolder'} fontSize={'25px'}> Guest Records </Heading>
                </Box>

                <Flex gap={3}>
                    <Input placeholder="search name, cnice etc"
                        w={'320px'} onChange={(e) => setSearch(e.target.value)} />

                    <DatePicker
                        selectsRange
                        startDate={startDate}
                        endDate={endDate}

                        onChange={(dates) => {

                            const [start, end] = dates
                            setStartDate(start)
                            setEndDate(end)
                        }
                        }

                        value={startDate, endDate}
                        withPortal={false}
                        portalId="datepicker-portal"
                        customInput={

                            <Box position="relative" w={'200px'} popperPlacement="bottom-start" >
                                <Input placeholder="Select date range"
                                    value={
                                        startDate && endDate ?
                                            `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()} ` : ""}
                                    readOnly
                                />
                                <Box bg={'grey.300'} p={'5px'} position="absolute" right="10px" top="50%" transform="translateY(-50%)">
                                    <FaCalendarAlt color="#5D6D7E" />
                                </Box>
                            </Box>
                        }
                    />

                    <Button onClick={() => {
                        setSearch('')
                        setStartDate(null)
                        setEndDate(null)
                    }}>
                        Clear
                    </Button>

                </Flex>
            </Flex>

            <hr></hr>

            {/* Table */}
            <Table.Root mt={'30px'}>

                {/* Table HEader */}
                <Table.Header >
                    <Table.Row bg={'gray.100'}>
                        <Table.ColumnHeader>Room No</Table.ColumnHeader>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Father/Husband Name</Table.ColumnHeader>
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
                    {paginatedRecords.map((guestRecord, index) => (

                        <Table.Row _hover={{ bg: 'purple.50' }} key={index}>


                            <Table.Cell>{guestRecord.roomNo}</Table.Cell>
                            <Table.Cell>{highlightText(guestRecord.name)}</Table.Cell>
                            <Table.Cell>{highlightText(guestRecord.fatherName)}</Table.Cell>
                            <Table.Cell>{highlightText(guestRecord.cnic)}</Table.Cell>
                            <Table.Cell>{highlightText(guestRecord.district)}</Table.Cell>
                            <Table.Cell>{highlightText(guestRecord.contact)}</Table.Cell>
                            <Table.Cell>{highlightText(guestRecord.carNo)}</Table.Cell>
                            <Table.Cell>{guestRecord.adults}</Table.Cell>
                            <Table.Cell>{guestRecord.children}</Table.Cell>
                            <Table.Cell>{guestRecord.checkedIN}</Table.Cell>
                            <Table.Cell>{guestRecord.checkedOut}</Table.Cell>
                        </Table.Row>

                    ))}


                </Table.Body>
            </Table.Root>

            <Flex justifyContent={'space-between'} align={'center'} mt={4}>
                <Text className="no-print" fontWeight={'semibold'}>Total Guest {records.length}</Text>
                <Button className="no-print" onClick={() => window.print()}>Print</Button>
            </Flex>

            <Pagination.Root count={filterGuest.length} pageSize={itemPerPage} page={currentPage}
                onPageChange={(e) => SetCurrentPage(e.page)} >
                <ButtonGroup>
                    <Pagination.PrevTrigger asChild>
                        <IconButton><LuChevronLeft /></IconButton>
                    </Pagination.PrevTrigger>

                    <Pagination.Items

                        render={(page) => (
                            <IconButton variant={{ base: 'outline', _selected: 'solid' }}>
                                {page.value}
                            </IconButton>
                        )}
                    />

                    <Pagination.NextTrigger asChild>
                        <IconButton><LuChevronsRight /></IconButton>
                    </Pagination.NextTrigger>

                </ButtonGroup>
            </Pagination.Root>

        </Box >
    )
}