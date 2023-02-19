
import { createContext,useContext, useEffect,useState } from "react";
import { initializeApp } from "firebase/app";
import {signOut,getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {collection,addDoc} from "firebase/firestore";
import {deleteDoc,updateDoc,query,where,getDocs,orderBy,doc,getDoc} from "firebase/firestore";
const  FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyBREuP2OO1UwHmiMEb_4Vjm2tYs2hBRPKw",
    authDomain: "todo-list-a1b58.firebaseapp.com",
    projectId: "todo-list-a1b58",
    storageBucket: "todo-list-a1b58.appspot.com",
    messagingSenderId: "75717516397",
    appId: "1:75717516397:web:190e24df9127496df9f364",
    measurementId: "G-68CGYLVNN1"
  };
  
  

  export const useFirebase = () =>{
      return useContext(FirebaseContext);
  }
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  

export const FirebaseProvider = (props) =>{

    const [user,setUser] = useState(null);
  
    useEffect(()=>{
       onAuthStateChanged(firebaseAuth,(user)=>{
        setTaskData([]);
          if(user){
          
              setUser(user);
          }else{
              setUser(null);
          }
       })
    },[user]);
     
      const loginStatus = user ? true : false;
    
     const signupUserwithEmailandPassword = (email,password,displayName) =>{
        createUserWithEmailAndPassword(firebaseAuth,email,password,displayName);
     }
     const signinUserwithEmailandPassword = (email,password) =>{
        signInWithEmailAndPassword(firebaseAuth,email,password);
     }
     
     const userLogout = () =>{
        signOut(firebaseAuth).then(()=>{
            return true;
        }).catch((err)=>{
            return false;
        })
     }
     const addNewUser = async (name,email) => {
        
        await  addDoc(collection(firestore,"Users"),{
              name,
              userEmail : email,
              userId : user.uid
         });
    
   };

    
     const addUserTask = async (title,description) => {
        console.log(firestore);
          await  addDoc(collection(firestore,"UserTasks"),{
                title,
                description,
                userId : user.uid,
                userEmail : user.email,
                date : new Date()
           });
           console.log(firestore);
     };

     const getTaskById = async (id)=>{
          const docRef = doc(firestore,'UserTasks',id);
          const result = await getDoc(docRef);
          return result;
     }
    
    const updateTaskById = async (id, Title,Description) =>{
        const docRef = doc(firestore,'UserTasks',id);
        await updateDoc(docRef,{
            title : Title,
            description : Description
        });
    }

   const deleteTaskById = async(id)=>{
    const docRef = doc(firestore,'UserTasks',id);
    await deleteDoc(docRef);
   }

    const [TaskData,setTaskData] = useState([]);
    // const [newTaskData,setnewTaskData] = useState([]);
    // useEffect(()=>{
    //     setTaskData(newTaskData);
    // },[newTaskData]);
    const fetchUserData = async() =>{
     //   console.log(user);
      
        const userTaskref = collection(firestore,"UserTasks");
        // firebaseApp.collection("UserTasks").orderBy("date");
        //  const sortit = query(userTaskref,orderBy("date"));
        //  const sortsnap = await getDocs(sortit);
       const q = query(collection(firestore,"UserTasks"),where("userEmail","==",user.email));
       const querysnap = await getDocs(q);
       
       querysnap.forEach((doc)=>{
        // console.log(doc.id," => ",doc.data());
        const obj = doc.data();
        obj.TaskId = doc.id;
    //     // obj.Description = doc.data().description;
    //     // obj.Title = doc.data().title;
    //     // obj.userId = doc.data().userId;
    //     // obj.userEmail = doc.data().userEmail;
        const newTaskData = TaskData;
        newTaskData.push(obj);
        // const uniqueData = [...new Map(newTaskData.map(item =>[item.TaskId, item])).values()];
        // setTaskData(uniqueData);
        setTaskData(newTaskData);
    //   console.log(TaskData);
       });
    
     
      return (TaskData);
    }
console.log(TaskData);
    return (
        <FirebaseContext.Provider value={{firebaseAuth,firestore,deleteTaskById,updateTaskById,getTaskById,signupUserwithEmailandPassword,signinUserwithEmailandPassword,addUserTask,addNewUser,fetchUserData,userLogout,loginStatus,user,setUser,TaskData ,setTaskData}}>{props.children}</FirebaseContext.Provider>
    );
}