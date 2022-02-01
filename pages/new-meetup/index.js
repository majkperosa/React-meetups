import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {Fragment} from "react";
import Head from "next/head";
function newMeetup(){
    async function addMeetupHandler (enteredMeetupData){
        
        const response = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers:{
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log(data)
    }

    return <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta name = "description" content = "Dodaj novi meetup point"/>
      </Head>
    <NewMeetupForm onAddMeetup = {addMeetupHandler}/>
    </Fragment>
}

export default newMeetup;