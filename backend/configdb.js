import mongoose from 'mongoose';

const connect = async() =>{
    try {
        await mongoose.connect("mongodb+srv://biswajitkumardandapat:ljpJI9TLO2XgaJ1R@cluster0.jvtdfyr.mongodb.net/");
        console.log("successfully conneted to database.");
    } catch (error) {
        console.log(error);
        console.log("Error while connecting to database.");
    }
}
// connect();
export default connect;