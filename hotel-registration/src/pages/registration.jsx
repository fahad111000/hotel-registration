import { SimpleGrid, Box, Field, Input, Button, Heading, NativeSelect } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useGuest } from "../context/guestContext"
import Select from 'react-select'

export default function RegistrationForm({ onClose, isEdit, editIndex }) {


    const { addGuest, guests, updateGuest } = useGuest();
    const [formData, setFormData] = useState({
        roomNo: '',
        name: '',
        fatherName: '',
        cnic: '',
        adults: '',
        children: '',
        district: '',
        contact: '',
        carNo: '',
        checkedIN: '',
        checkedOut: ''
    })

    const handelFormSubmit = () => {
        if (isEdit) {
            updateGuest(editIndex, formData);
        } else {
            addGuest(formData)
        }
        onClose()
    }


    useEffect(() => {
        if (isEdit && editIndex !== null) {
            setFormData(guests[editIndex])
        }
    }, [isEdit, editIndex])



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
                    <Input placeholder="Room No" type="number"
                        value={formData.roomNo} onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })} />
                </Field.Root>


                {/* Name */}
                <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input placeholder="Name"
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Field.Root>


                {/* Father Name */}
                <Field.Root>
                    <Field.Label>Father/Husband Name</Field.Label>
                    <Input placeholder="Father Name"
                        value={formData.fatherName} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    />
                </Field.Root>


                {/* Cnic */}
                <Field.Root>
                    <Field.Label>CNIC/Passport</Field.Label>
                    <Input placeholder="CNIC"
                        value={formData.cnic} onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                    />
                </Field.Root>


                {/* Distt */}
                <Field.Root>
                    <Field.Label>District</Field.Label>
                    <Input placeholder="District"
                        value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })} />
                </Field.Root>


                {/* Nationality */}
                {/* <Field.Root>
                    <Field.Label>Nationality</Field.Label>
                    <Input placeholder="Optional"
                        value={formData.nationality} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} />
                </Field.Root> */}


                {/* Contact */}
                <Field.Root>
                    <Field.Label>Contact</Field.Label>
                    <Input placeholder="Contact"
                        value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                </Field.Root>


                {/* Car No */}
                <Field.Root>
                    <Field.Label>Vehicle No</Field.Label>
                    <Input placeholder="Car No"
                        value={formData.carNo} onChange={(e) => setFormData({ ...formData, carNo: e.target.value })}
                    />
                </Field.Root>



                {/* Adults */}
                <Field.Root>
                    <Field.Label>Adults</Field.Label>
                    <Input placeholder=" Adults" type="number"
                        value={formData.adults} onChange={(e) => setFormData({ ...formData, adults: e.target.value })}

                    />
                </Field.Root>

                {/* Children */}
                <Field.Root>
                    <Field.Label>Children</Field.Label>
                    <Input placeholder=" Children" type="number"
                        value={formData.children} onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                    />
                </Field.Root>


                {/* Check-In */}
                <Field.Root>
                    <Field.Label>Check-In</Field.Label>
                    <Input placeholder="Check-In" type="datetime-local"
                        value={formData.checkedIN} onChange={(e) => setFormData({ ...formData, checkedIN: e.target.value })}
                    />
                </Field.Root>



                {/* Check-out */}
                <Field.Root>
                    <Field.Label>Check-out</Field.Label>
                    <Input placeholder="Check-out" type="datetime-local"
                        value={formData.checkedOut} onChange={(e) => setFormData({ ...formData, checkedOut: e.target.value })}
                    />
                </Field.Root>

            </SimpleGrid>
            <Button colorPalette={'blue'} onClick={handelFormSubmit}>Register Guest</Button>

        </Box>
    )
}