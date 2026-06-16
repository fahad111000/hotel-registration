import { Box, Flex, Heading, VStack, Text, Button, Table } from "@chakra-ui/react"

export default function GuestList() {
    return (
        <Box p={'10px'} maxW={'1200px'} mx={'auto'} my={'40px'} border={'1p solid '}
            borderColor={'#E8E0D5'} rounded={'xl'} shadow={'md'}>

            <Flex p={'10px'} align={'center'} justifyContent={'space-between'}>

                {/* Guest List  */}
                <Box>
                    <Heading color={'#2C3E50'}>Guest List</Heading>
                    <Text fontSize={'14px'} fontWeight={"semibold"}>3 guests checked in</Text>
                </Box>

                <Button >New Guest</Button>
            </Flex>

            <hr></hr>

            {/* Table */}
            <Table.Root mt={'30px'}>

                {/* Table HEader */}
                <Table.Header >
                    <Table.Row bg={'gray.100'}>
                        <Table.ColumnHeader>Sno</Table.ColumnHeader>
                        <Table.ColumnHeader>Room No</Table.ColumnHeader>
                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                        <Table.ColumnHeader>Father Name</Table.ColumnHeader>
                        <Table.ColumnHeader>CNIC</Table.ColumnHeader>
                        <Table.ColumnHeader>District</Table.ColumnHeader>
                        <Table.ColumnHeader>Contact</Table.ColumnHeader>
                        <Table.ColumnHeader>Checked In</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>

                <Table.Body py={'100px'}>

                    <Table.Row _hover={{ bg: 'purple.50' }}>
                        <Table.Cell>1</Table.Cell>
                        <Table.Cell>101</Table.Cell>
                        <Table.Cell>Fahad</Table.Cell>
                        <Table.Cell>Noor ul wahab</Table.Cell>
                        <Table.Cell>1730193246464</Table.Cell>
                        <Table.Cell>Peshawar</Table.Cell>
                        <Table.Cell>03021598431</Table.Cell>
                        <Table.Cell>5:40 pm</Table.Cell>
                    </Table.Row>


                </Table.Body>
            </Table.Root>

            <Flex justifyContent={'space-between'} align={'center'} mt={4}>
                <Text>Total: 1 guest</Text>
                <Button className="no-print" colorPalette={'purple'} onClick={() => window.print()}>Print</Button>
            </Flex>
        </Box>
    )
}