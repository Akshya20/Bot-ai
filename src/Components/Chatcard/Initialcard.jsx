import {Box,Typography,Stack} from "@mui/material";
import Card from "./Chatcard"
import icon from "../../Images/icon1.png"



function Intial({generateResponse}){

    const initialData = [
        {
            heading: 'Hi, what is the weather',
            subtext: 'Get immediate AI generated response'
        },
        {
            heading: 'Hi, what is my location',
            subtext: 'Get immediate AI generated response'
        },
        {
            heading: 'Hi, what is the temperature',
            subtext: 'Get immediate AI generated response'
        },
        {
            heading: 'Hi, how are you',
            subtext: 'Get immediate AI generated response'
        },
    ]
    return(
        <Stack height={1} justifyContent={'flex-end'} p={{ xs: 2, md: 3 }}>
    <Stack alignItems={'center'} spacing={2} my={5}>
        <Typography variant='h2'>How Can I Help You Today?</Typography>
        <Box
            component={'img'}
            src={icon}
            height={{ xs: 42, md: 70 }}
            width={{ xs: 42, md: 70 }}
            boxShadow={4}
            borderRadius={'50%'}
        />
    </Stack>
    <Box
        display="flex"
        flexWrap="wrap"
        gap={{ xs: 1, md: 3 }}
        justifyContent="space-between"
    >
        {initialData.map(item => (
            <Box
                key={item.heading}
                flexBasis={{ xs: '100%', md: 'calc(50% - 12px)' }} // Adjusts the width for each item
            >
                <Card
                    heading={item.heading}
                    subtext={item.subtext}
                    handleClick={generateResponse}
                />
            </Box>
        ))}
    </Box>
</Stack>
    );
}

export default Intial;