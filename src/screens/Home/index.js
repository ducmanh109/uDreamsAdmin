import { database } from "../../firebase";
import { ref, onValue } from "firebase/database";
import FlatList from "flatlist-react";
import { useCallback, useState } from "react";
import Modal from "react-modal";

const Home = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [listAccount, setListAccount] = useState(false);
  const [subject, setSubject] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [examIndex, setExamIndex] = useState(0);

  const [quesKey, setQueskey] = useState();
  const [correctAns, setCorrectAns] = useState();
  const [quesTitle, setQuesTitle] = useState();
  const [imageQuestion, setImageQuestion] = useState();

  const showListAccount = () => {
    setListAccount(true);
  };
  const showListSubject = useCallback((event) => {
    setListAccount(false);
    event.preventDefault();
    const startCountRef = ref(database, "/SubjectData");
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      setSubjectData(data);
    });
  }, []);

  const showSubject = useCallback((subject) => {
    setSubjectName(subject);
    const startCountRef = ref(database, `/${subject}`);
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      setSubject(data);
    });
  }, []);

  const renderListSubject = useCallback(
    (item, index) => {
      return (
        <div key={index} onClick={() => showSubject(item.id)}>
          <div
            style={{
              flexDirection: "row",
              width: 200,
              alignSelf: "center",
            }}
          >
            <h1>{item.subject} ---môn học</h1>
          </div>
        </div>
      );
    },
    [showSubject]
  );
  const showModal = useCallback(
    (index) => {
      setModalVisible(true);
      setTitle(subject[index].title);
      setExamIndex(index);
    },
    [subject]
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderSubject = useCallback(
    (item, index) => {
      return (
        <div key={index} className="mt-10">
          <div className="flex-row">
            <h2>id: {item.id}</h2>
            <h2 onClick={() => showModal(index)}>{item.title} --Đề môn học</h2>
            <h2>{item.description}</h2>
          </div>
        </div>
      );
    },
    [showModal]
  );

  const updateData = useCallback(() => {
    const startCountRef = ref(database, `${subjectName}/${examIndex}`);
    onValue(startCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);
    });
  }, [examIndex, subjectName]);
  return (
    <div className="home p-10">
      <div>
        <label onClick={showListAccount} className="w-2 bg-red-500 rounded-3xl">
          Tài khoản
        </label>
        <label
          onClick={showListSubject}
          className="m-20 w-2 bg-red-500 rounded-3xl"
        >
          Dữ liệu
        </label>
        {listAccount ? (
          <FlatList list={subject} />
        ) : (
          <>
            <FlatList
              list={subjectData}
              renderWhenEmpty={() => <div>Chưa có dữ liệu</div>}
              renderItem={renderListSubject}
            />
            <FlatList
              list={subject}
              renderWhenEmpty={() => {}}
              renderItem={renderSubject}
            />
          </>
        )}
        <Modal
          isOpen={modalVisible}
          onAfterOpen={showModal}
          onRequestClose={closeModal}
        >
          <div>
            <label>{title}</label>
            <label
              className="ml-72 w-7 bg-blend-color"
              onClick={() => updateData()}
            >
              Cập nhật
            </label>
          </div>
          <FlatList
            list={subject[0]?.questions}
            renderItem={(itemQues, index) => {
              return (
                <>
                  <div className="mt-6 justify-between flex-row">
                    <div className="flex flex-row">
                      <p>key: </p>
                      <input
                        className=" border "
                        defaultValue={itemQues?.key}
                        value={quesKey}
                        onChange={(event) => setQueskey(event.target.value)}
                      ></input>
                    </div>
                    <div className="flex flex-row">
                      <p>correctAnswer: </p>
                      <input
                        className=" border "
                        defaultValue={itemQues?.correctAnswer}
                        value={correctAns}
                        onChange={(event) => setCorrectAns(event.target.value)}
                      ></input>
                    </div>
                    <div className="flex flex-row">
                      <p>title: </p>
                      <input
                        className=" border w-4/5 "
                        defaultValue={itemQues?.title}
                        value={quesTitle}
                        onChange={(event) => setQuesTitle(event.target.value)}
                      ></input>
                    </div>
                    <div className="flex flex-row">
                      <p>imageQuestion: </p>
                      <input
                        className=" border w-4/5 "
                        defaultValue={itemQues?.imageQuestion}
                        value={imageQuestion}
                        onChange={(event) =>
                          setImageQuestion(event.target.value)
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="mt-10"></div>
                  <FlatList
                    list={subject[0]?.questions[0].answers}
                    renderItem={(itemAns, index) => {
                      return (
                        <div>
                          <div className="flex flex-row">
                            <p>keyAnswer: </p>
                            <input
                              className=" border "
                              defaultValue={itemAns?.key}
                            ></input>
                          </div>
                          <div className="flex flex-row">
                            <p>option: </p>
                            <input
                              className=" border "
                              defaultValue={itemAns?.option}
                            ></input>
                          </div>
                          <div className="flex flex-row">
                            <p>title: </p>
                            <input
                              className=" border w-4/5"
                              defaultValue={itemAns?.title}
                            ></input>
                          </div>
                          <div>------</div>
                        </div>
                      );
                    }}
                  />
                </>
              );
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Home;
