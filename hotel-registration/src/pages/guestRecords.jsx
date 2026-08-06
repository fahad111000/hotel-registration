import {
    Box, Flex, Heading, VStack, Text, Button,
    Table, Input, Dialog, IconButton, Pagination, ButtonGroup,
    TableHeader,
    TableColumnHeader, Badge, Card,
    HStack,
    Icon, Separator, SimpleGrid
} from "@chakra-ui/react"
import {
    LuChevronLeft, LuChevronsRight, LuEye, LuX,
    LuCalendarDays, LuHistory, LuBed, LuCircleCheck,
    LuCalendarArrowDown, LuCalendarArrowUp, LuUsers
} from "react-icons/lu"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FaCalendarAlt } from 'react-icons/fa'
import { IoClose } from "react-icons/io5"
import { MdChildCare } from "react-icons/md";
import { useGuest } from "../context/guestContext"
import { useState } from "react"


export default function GuestRecords() {

    const [currentPage, SetCurrentPage] = useState(1);
    const itemPerPage = 5;


    const [selectedHistory, setSelectedHistory] = useState(null)
    const [historyOpen, setHistoryOpen] = useState(false)

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



            <Flex gap={3} py={2} align={'center'} justifyContent={'space-between'}>

                {/* Guest List  */}
                <Box>
                    <Heading color={'#2C3E50'} fontFamily="'Playfair Display', serif"
                        fontWeight={'bolder'} fontSize={'25px'}> Guest Records </Heading>
                </Box>

                <HStack mx={2}>
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

                </HStack>
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
                        <Table.ColumnHeader>Action</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body py={'100px'}>
                    {paginatedRecords.map((guestRecord, index) => (

                        <Table.Row key={index}>


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
                            <Table.Cell>
                                <Button variant={'subtle'} color={'blue.600'} size={'xs'}>

                                    <LuEye

                                        onClick={() => {
                                            setHistoryOpen(true)
                                        }}
                                    />
                                </Button>
                            </Table.Cell>
                        </Table.Row>

                    ))}


                </Table.Body>
            </Table.Root>


            {/* Dialog */}
            <Dialog.Root open={historyOpen} onOpenChange={(e) => setHistoryOpen(e.open)}>
                <Dialog.Backdrop />
                <Dialog.Positioner>

                    <Dialog.Content maxW="900px">

                        <Dialog.CloseTrigger asChild position={'absolute'} top={3} right={3}>
                            <Button variant={'surface'} colorPalette={'red'} size={'sm'}>
                                <IoClose size={10} />
                            </Button>
                        </Dialog.CloseTrigger>

                        <Dialog.Body >

                            {/* Guest Info header */}
                            <Flex justifyContent={'center'} flexDirection={'column'}>

                                {/* HEading */}
                                <Flex align={'center'} gap={3}>
                                    < LuHistory />
                                    <Heading size="md" textAlign={'center'} >Guest History</Heading>
                                </Flex>

                                <HStack mt={5}>
                                    <Text fontWeight={'bold'}>Fahad khan</Text>
                                    <Badge colorPalette={'blue'}
                                        px={2} py={1} >
                                        5 Visits
                                    </Badge>
                                </HStack>

                                <HStack color={'GrayText'} mt={3} pb={3}>
                                    <Text>17301-3908766-7</Text>
                                    <Text mx={5}>03029317283</Text>
                                </HStack>

                                <hr></hr>

                            </Flex>

                            {/* Table */}
                            {/* <Table.Root mt={4}>
                                <TableHeader>
                                    <Table.Row>
                                        <TableColumnHeader>SNo</TableColumnHeader>
                                        <TableColumnHeader>Room NO</TableColumnHeader>
                                        <TableColumnHeader>Check-IN</TableColumnHeader>
                                        <TableColumnHeader>Check-Out</TableColumnHeader>
                                        <TableColumnHeader>Adults</TableColumnHeader>
                                        <TableColumnHeader>Children</TableColumnHeader>
                                        <TableColumnHeader>Price</TableColumnHeader>
                                    </Table.Row>
                                </TableHeader>

                                <Table.Body>

                                </Table.Body>
                            </Table.Root>

                             */}

                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>





                                <Card.Root my={6} borderRadius="xl" boxShadow="sm" border="1px solid" borderColor="gray.200">
                                    <Card.Body p={4}>

                                        <Flex justify="space-between" align="center" mb={3}>
                                            <HStack>
                                                <LuBed color="#7C3AED" size={18} />
                                                <Text fontWeight="bold">Visit #2</Text>
                                            </HStack>

                                            <Badge colorPalette="green">
                                                Latest
                                            </Badge>
                                        </Flex>
                                        <VStack align="start" gap={2}>


                                            <Flex mt={5} w={'full'} justifyContent={'space-between'} >

                                                <HStack>
                                                    <Text fontWeight="medium">Room:</Text>

                                                    <Text>205</Text>

                                                </HStack>

                                                <Badge colorPalette="green" borderRadius="sm">
                                                    5,000
                                                </Badge>
                                            </Flex>

                                            <HStack>

                                                <LuCalendarArrowDown color="green" />
                                                <Text>Jun 5, 2026</Text>
                                            </HStack>

                                            <HStack >
                                                <LuCalendarArrowUp color="red" />
                                                <Text>Jun 6, 2026</Text>
                                            </HStack>

                                            <HStack justify="space-between" w="100%">
                                                <LuUsers />
                                                <MdChildCare size={18} />
                                            </HStack>

                                        </VStack>

                                    </Card.Body>
                                </Card.Root>

                            </SimpleGrid>




                        </Dialog.Body>


                    </Dialog.Content>


                </Dialog.Positioner>
            </Dialog.Root>

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