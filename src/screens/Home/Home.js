import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import FlatList from 'flatlist-react';
import { useCallback, useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/solid';

const Home = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [listAccount,setListAccount] = useState(false)
  const [subject,setSubject] = useState([])

  const showListAccount = () => {
    setListAccount(true)
  };
  const showListSubject = (event) => {
      setListAccount(false)
      event.preventDefault();
      const startCountRef = ref(database, '/SubjectData');
      onValue(startCountRef, (snapshot) => {
        const data = snapshot.val();
        setSubject(data);
        console.log('data day ne>>>', data);
      });
  };
const showSubject = (event,subject)=>{
  event.preventDefault();
  const startCountRef = ref(database, `${subject}`);
      onValue(startCountRef, (snapshot) => {
        const data = snapshot.val();
        setSubjectData(data);
      });
}
  const renderSubject = useCallback((item, index) => {
    return (
    <div key={index} onClick={()=>showSubject(item.subject)}>
      <div
        style={{
          flexDirection: 'row',
          background: 'red',
          width: 200,
          alignSelf: 'center',
        }}
      >
        <h1>{item.subject}</h1>
      </div>
    </div>
  );
},[])
  return (
    <div className="home" style={styles.container}>
      <div>
        <label style={styles.title} onClick={showListAccount}>Tài khoản</label>
        <label style={styles.title1} onClick={showListSubject}>Dữ liệu</label>
        {listAccount ? <FlatList list={subject}/>
        :
        <FlatList
          list={subjectData}
          renderWhenEmpty={() => <div>Chưa có dữ liệu</div>}
          renderItem={renderSubject}
  />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: 20,
  },
  title:{
    paddingInline: 87,
    background:'red', 
    borderRadius: 20,
    fontSize: 25
  },
  title1:{
    paddingInline: 87,
    background:'red', 
    borderRadius: 20,
    marginLeft: 500,
    fontSize: 25
  }
};
export default Home;
