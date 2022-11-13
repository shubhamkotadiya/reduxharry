import { initializeApp } from 'firebase/app';
import  {getAuth} from 'firebase/auth';

export const fireBaseConifg = {
    apiKey: "AIzaSyAWPoN7JYbr3c8eQcRwvjMDXqmQHgxFdMU",
    authDomain: "summachar-school.firebaseapp.com",
    projectId: "summachar-school",
    storageBucket: "summachar-school.appspot.com",
    messagingSenderId: "849303439802",
    appId: "1:849303439802:web:d13fffddfa739a726eb583",
    measurementId: "G-R6EP6CNJSF"
};

const app = initializeApp(fireBaseConifg);
export const auth = getAuth(app);
export default app;