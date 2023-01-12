import {Button, Card, CardActions, CardContent} from "@mui/material";
import {useEffect} from "react";
import defitrack from "@defitrack/js-client";

export default function () {

    useEffect(async () => {

    }, []);

    return <>
        <Card>
            <CardContent>
                <p>test</p>
            </CardContent>
            <CardActions>
                <Button>test</Button>
            </CardActions>
        </Card>
    </>
};