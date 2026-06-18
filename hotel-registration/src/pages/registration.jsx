import { SimpleGrid, Box, Field, Input, Button, Heading, NativeSelect } from "@chakra-ui/react"
import Select from 'react-select'

export default function RegistrationForm() {


    return (


        <Box
            textAlign={'center'}
            bg="white" borderColor="#E8E0D5" maxW={'900px'} mx={'auto'}
            rounded={'xl'}
        >
            {/* Heading */}
            <Heading fontSize={'30px'} color="#2C3E50" fontFamily="'Playfair Display', serif"> Guest Registration From</Heading>

            {/* GRID */}
            <SimpleGrid color="gray.600" fontWeight="500" py={'30px'} columns={{ base: 1, md: 2, lg: 3 }} gap={5}>

                {/* Room No */}
                <Field.Root >
                    <Field.Label color="#5D6D7E">Room No</Field.Label>
                    <Input placeholder="Room No" type="numberq" />
                </Field.Root>


                {/* Name */}
                <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input placeholder="Name" />
                </Field.Root>


                {/* Father Name */}
                <Field.Root>
                    <Field.Label>Father Name</Field.Label>
                    <Input placeholder="Father Name" />
                </Field.Root>


                {/* Cnic */}
                <Field.Root>
                    <Field.Label>CNIC/Passport</Field.Label>
                    <Input placeholder="CNIC" />
                </Field.Root>


                {/* Distt */}
                <Field.Root>
                    <Field.Label>District</Field.Label>
                    <Input placeholder="District" />
                </Field.Root>


                {/* Nationality */}
                <Field.Root>
                    <Field.Label>Nationality</Field.Label>
                    <Input placeholder="Optional" />
                </Field.Root>


                {/* Contact */}
                <Field.Root>
                    <Field.Label>Contact</Field.Label>
                    <Input placeholder="Contact" />
                </Field.Root>


                {/* Car No */}
                <Field.Root>
                    <Field.Label>Vehicle No</Field.Label>
                    <Input placeholder="Car No" />
                </Field.Root>



                {/* Adults */}
                <Field.Root>
                    <Field.Label>Adults</Field.Label>
                    <Input placeholder=" Adults" type="number" />
                </Field.Root>

                {/* Children */}
                <Field.Root>
                    <Field.Label>Children</Field.Label>
                    <Input placeholder=" Children" type="number" />
                </Field.Root>


                {/* Check-In */}
                <Field.Root>
                    <Field.Label>Check-In</Field.Label>
                    <Input placeholder="Check-In" type="datetime-local" />
                </Field.Root>



                {/* Check-out */}
                <Field.Root>
                    <Field.Label>Check-out</Field.Label>
                    <Input placeholder="Check-out" type="datetime-local" />
                </Field.Root>

            </SimpleGrid>

            <Button colorPalette={'blue'}>Register Guest</Button>
        </Box>
    )
}