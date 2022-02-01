import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(()=>{

  //     setLoadedMeetups(DUMY_MEETUPS);

  // },[])

  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta name = "description" content = "To je meetup aplikacija"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}
// export async function getServerSideProps(context){
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: DUMY_MEETUPS
//         }
//     };
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://majk:majkperosa@cluster0.dndkm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 30,
  };
}

export default HomePage;
