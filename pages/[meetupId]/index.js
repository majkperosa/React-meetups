import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient , ObjectId} from "mongodb";
import Head from "next/head";
import {Fragment} from "react";
function meetupId(props) {
  return <Fragment>
  <Head>
    <title>{props.meetupData.title}</title>
    <meta name = "description" content = {props.meetupData.description} />
  </Head>
  <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      adress={props.meetupData.address}
      description={props.meetupData.description}
    />

</Fragment>

  
}
export async function getStaticPaths() {

    const client = await MongoClient.connect("mongodb+srv://majk:majkperosa@cluster0.dndkm.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

    client.close();

  return {
      fallback: true,
    paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString() }})) 
    
  };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect("mongodb+srv://majk:majkperosa@cluster0.dndkm.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId (meetupId), })

    client.close();
    


  
  return {
    props: {
      meetupData: {
          image: selectedMeetup.image,
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          adress: selectedMeetup.address,
          description: selectedMeetup.description
      },
    },
  };
}

export default meetupId;
