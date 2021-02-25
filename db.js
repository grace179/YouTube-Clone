import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true 
    }
);

//MongoDB와의 연결을 'db'로 저장
const db = mongoose.connection;

const handleOpen = () => console.log("👍 Connected to DB");
const handleError = error => console.log(`❌ Error on DB Connection: ${error}`);

//once : 한번 실행 되는 것
//connection을 열고, handleOpen함수 실행
db.once("open", handleOpen);

// Error
db.on("error", handleError);
