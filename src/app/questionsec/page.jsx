"use client";
import React, { useEffect, useState, useContext } from "react";
import { useGlobalContext } from "../../context/Store";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firestore } from "../../context/FirbaseContext";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-cube";
import { EffectCube } from "swiper";
import { ImSwitch } from "react-icons/im";
import { decryptObjData, getCookie } from "../../modules/encryption";
import { v4 as uuid } from "uuid";
import {
  createDownloadLink,
  round2dec,
} from "../../modules/calculatefunctions";
function QuestionSec() {
  const router = useRouter();
  const [docId, setDocId] = useState(uuid().split("-")[0]);
  const [serial, setSerial] = useState(0);
  const [isAccepting, setIsAccepting] = useState(true);
  let details = getCookie("tid");
  if (details) {
    details = decryptObjData("tid");
  }
  const questionadmin = details?.question;
  const {
    state,
    questionState,
    setQuestionState,
    questionUpdateTime,
    setQuestionUpdateTime,
    questionRateState,
    setQuestionRateState,
    schoolState,
    setStateArray,
    setStateObject,
  } = useGlobalContext();

  const [data, setData] = useState([]);
  const [showSlide, setShowSlide] = useState(false);
  const [qData, setQData] = useState([]);
  const [qRateData, setQRateData] = useState({
    question_pp_rate: 0,
    question_1_rate: 0,
    question_2_rate: 0,
    question_3_rate: 0,
    question_4_rate: 0,
    question_5_rate: 0,
    term: "1st",
    year: new Date().getFullYear(),
  });
  const [selectedSchool, setSelectedSchool] = useState({});
  const [inputField, setInputField] = useState({});
  const [addInputField, setAddInputField] = useState({
    id: docId,
    sl: serial,
    school: "",
    gp: "",
    udise: "",
    cl_pp_student: 0,
    cl_1_student: 0,
    cl_2_student: 0,
    cl_3_student: 0,
    cl_4_student: 0,
    cl_5_student: 0,
    payment: "Due",
    paid: 0,
    total_student: 0,
    total_rate: 0,
  });
  const [schoolData, setSchoolData] = useState([]);
  const [questionInputField, setQuestionInputField] = useState({
    question_pp_rate: 0,
    question_1_rate: 0,
    question_2_rate: 0,
    question_3_rate: 0,
    question_4_rate: 0,
    question_5_rate: 0,
    term: "1st",
    year: 2024,
  });
  const userData = async () => {
    const q = query(collection(firestore, "questions"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setQData(data);
    setQuestionState(data);
    setQuestionUpdateTime(Date.now());
    setDocId(`questions${data.length + 101}-${uuid().split("-")[0]}`);
    setSerial(data.length + 1);
    setShowSlide(true);
    setData(data);
    setSchoolData(schoolState);
    const q2 = query(collection(firestore, "question_rate"));

    const querySnapshot2 = await getDocs(q2);
    const data2 = querySnapshot2.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setQRateData(data2[0]);
    setQuestionRateState(data2[0]);
    setQuestionInputField({
      id: data2[0].id,
      question_pp_rate: data2[0].pp_rate,
      question_1_rate: data2[0].i_rate,
      question_2_rate: data2[0].ii_rate,
      question_3_rate: data2[0].iii_rate,
      question_4_rate: data2[0].iv_rate,
      question_5_rate: data2[0].v_rate,
      term: data2[0].term,
      year: data2[0].year,
    });
  };
  const changeData = (e) => {
    setSelectedSchool(qData.filter((el) => el.udise.match(e.target.value))[0]);
  };

  const addSchool = async () => {
    try {
      await setDoc(doc(firestore, "questions", docId), addInputField)
        .then(() => {
          setQuestionState([...questionState, addInputField]);
          setQuestionUpdateTime(Date.now());
          toast.success("School Successfully Added!!!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setAddInputField({
            id: docId,
            school: "",
            gp: "",
            udise: "",
            cl_pp_student: 0,
            cl_1_student: 0,
            cl_2_student: 0,
            cl_3_student: 0,
            cl_4_student: 0,
            cl_5_student: 0,
            payment: "Due",
            paid: 0,
            total_student: 0,
            total_rate: 0,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something Went Wrong in Server!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (e) {
      toast.error("Something Went Wrong in Server!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const updateQuestionStudentValue = async () => {
    try {
      const docRef = doc(firestore, "questions", inputField.id);
      await updateDoc(docRef, inputField)
        .then(() => {
          setQuestionState(
            questionState.map((el) => {
              if (el.id === inputField.id) {
                return inputField;
              }
              return el;
            })
          );
          setQuestionUpdateTime(Date.now());
          toast.success("Data Successfully Updated!!!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((e) => {
          console.log(e);
          toast.error("Something Went Wrong in Server!", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,

            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });

      toast.success("Data Successfully Updated!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      toast.error("Something Went Wrong in Server!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleSelection = (e) => {
    setAddInputField({
      ...addInputField,
      school: e.target.value.split("-")[0],
      udise: e.target.value.split("-")[1],
      gp: e.target.value.split("-")[2],
      id: docId,
      sl: serial,
    });
  };
  const updateQrateData = async () => {
    try {
      const docRef = doc(firestore, "question_rate", questionInputField.id);
      await updateDoc(docRef, {
        pp_rate: parseFloat(questionInputField.question_pp_rate).toFixed(2),
        i_rate: parseFloat(questionInputField.question_1_rate).toFixed(2),
        ii_rate: parseFloat(questionInputField.question_2_rate).toFixed(2),
        iii_rate: parseFloat(questionInputField.question_3_rate).toFixed(2),
        iv_rate: parseFloat(questionInputField.question_4_rate).toFixed(2),
        v_rate: parseFloat(questionInputField.question_5_rate).toFixed(2),
        term: questionInputField.term,
        year: parseInt(questionInputField.year),
      });
      setQuestionRateState({
        pp_rate: parseFloat(questionInputField.question_pp_rate).toFixed(2),
        i_rate: parseFloat(questionInputField.question_1_rate).toFixed(2),
        ii_rate: parseFloat(questionInputField.question_2_rate).toFixed(2),
        iii_rate: parseFloat(questionInputField.question_3_rate).toFixed(2),
        iv_rate: parseFloat(questionInputField.question_4_rate).toFixed(2),
        v_rate: parseFloat(questionInputField.question_5_rate).toFixed(2),
        term: questionInputField.term,
        year: parseInt(questionInputField.year),
      });
      toast.success("Data Successfully Updated!!!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (e) {
      toast.error("Something Went Wrong in Server!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const getQuestionData = async () => {
    const difference = (Date.now() - questionUpdateTime) / 1000 / 60 / 15;
    if (questionState.length === 0 || difference >= 1) {
      userData();
    } else {
      const data = questionState;
      setQData(data);
      setDocId(`questions${data.length + 101}-${uuid().split("-")[0]}`);
      setSerial(data.length + 1);
      setShowSlide(true);
      setData(data);
      setSchoolData(schoolState);
      setQRateData(questionRateState);
      setQuestionInputField({
        id: questionRateState.id,
        question_pp_rate: questionRateState.pp_rate,
        question_1_rate: questionRateState.i_rate,
        question_2_rate: questionRateState.ii_rate,
        question_3_rate: questionRateState.iii_rate,
        question_4_rate: questionRateState.iv_rate,
        question_5_rate: questionRateState.v_rate,
        term: questionRateState.term,
        year: questionRateState.year,
      });
    }
  };

  useEffect(() => {
    document.title = "WBTPTA AMTA WEST:Question Section";
    if (!state && questionadmin !== "admin") {
      router.push("/login");
    }
    getQuestionData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setInputField({
      cl_pp_student: selectedSchool.cl_pp_student,
      cl_1_student: selectedSchool.cl_1_student,
      cl_2_student: selectedSchool.cl_2_student,
      cl_3_student: selectedSchool.cl_3_student,
      cl_4_student: selectedSchool.cl_4_student,
      cl_5_student: selectedSchool.cl_5_student,
      payment: selectedSchool.payment,
      paid: selectedSchool.paid,
      total_student: selectedSchool.total_student,
      total_rate: selectedSchool.total_rate,
    });
  }, [selectedSchool, addInputField]);
  useEffect(() => {}, [questionInputField]);
  return (
    <div className="container my-5">
      <h3 className="text-primary my-2">Question Section</h3>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="col-md-6 mx-auto">
        {showSlide ? (
          <Swiper
            modules={[
              Navigation,
              Pagination,
              Scrollbar,
              A11y,
              EffectCube,
              Autoplay,
            ]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            effect={"cube"}
            cubeEffect={{
              slideShadows: true,
              shadowOffset: 7,
              shadowScale: 0.74,
            }}
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            className="mySwiper"
          >
            {data.map((el, ind) => {
              return (
                <SwiperSlide key={ind}>
                  <div
                    className="mb-5 bg-light p-2"
                    style={{
                      borderRadius: "20px",
                    }}
                  >
                    <h6 className="text-success">{el.school}</h6>
                    <h6 className="text-primary">UDISE: {el.udise}</h6>
                    <h6 className="text-primary">GP: {el.gp}</h6>
                    <h6 className="text-primary">PP: {el.cl_pp_student}</h6>
                    <h6 className="text-primary">I: {el.cl_1_student}</h6>
                    <h6 className="text-primary">II: {el.cl_2_student}</h6>
                    <h6 className="text-primary">III: {el.cl_3_student}</h6>
                    <h6 className="text-primary">IV: {el.cl_4_student}</h6>
                    <h6 className="text-primary">V: {el.cl_5_student}</h6>
                    <h6 className="text-primary">
                      TOTAL STUDENT: {el.total_student}
                    </h6>
                    <h6 className="text-primary">
                      TOTAL AMOUNT: {el.total_rate}
                    </h6>
                    <h6 className="text-primary">PAYMENT STATUS: {el.paid}</h6>
                    <h6 className="text-primary">PAID AMOUNT: {el.payment}</h6>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : null}
      </div>
      <div className="col-md-6 mx-auto mb-3">
        {/* Add School Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary m-2"
          data-bs-toggle="modal"
          data-bs-target="#myModal3"
        >
          Add School
        </button>
        <button
          type="button"
          className="btn btn-warning m-2"
          data-bs-toggle="modal"
          data-bs-target="#myModal4"
          onClick={() =>
            setTimeout(() => {
              if (typeof window !== undefined) {
                document.getElementById("term").value = questionInputField.term;
              }
            }, 300)
          }
        >
          Update Rate
        </button>
        <button type="button" className="btn">
          {
            <ImSwitch
              color={showSlide ? "red" : "green"}
              onClick={() => setShowSlide(!showSlide)}
            />
          }
        </button>
        {/* Add School modal */}
        {/* <Link
          className="btn btn-sm btn-success m-2"
          href={`/PrintQuestionAll?allData=${JSON.stringify(
            data
          )}&qRate=${JSON.stringify(qRateData)}`}
        >
          Print All Invoice
        </Link> */}
        <button
          type="button"
          className="btn btn-sm btn-success m-2"
          onClick={() => {
            router.push("/PrintQuestionAll");

            setStateObject(data);
          }}
        >
          Print All Invoice
        </button>
        <button
          type="button"
          className="btn btn-sm btn-info"
          onClick={() => {
            router.push("/PrintQuestionAllCompact");
            setStateObject(data);
          }}
        >
          Print Question All Compact
        </button>
        {state === "admin" && (
          <div>
            <button
              type="button"
              className="btn btn-sm m-3 btn-warning"
              onClick={() => {
                createDownloadLink(questionState, "questions");
              }}
            >
              Download Question Data
            </button>
            <button
              type="button"
              className="btn btn-sm m-3 btn-warning"
              onClick={() => {
                createDownloadLink(questionRateState, "question_rate");
              }}
            >
              Download Question Rate Data
            </button>
          </div>
        )}

        <div
          className="modal fade"
          id="myModal3"
          tabIndex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-dark text-center"
                  id="myModalLabel"
                >
                  Add School:
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setAddInputField({
                      id: docId,
                      school: "",
                      gp: "",
                      udise: "",
                      cl_pp_student: 0,
                      cl_1_student: 0,
                      cl_2_student: 0,
                      cl_3_student: 0,
                      cl_4_student: 0,
                      cl_5_student: 0,
                      payment: "Due",
                      paid: 0,
                      total_student: 0,
                      total_rate: 0,
                    });
                  }}
                ></button>
              </div>
              <div className="modal-body modal-lg text-dark text-center">
                <div className="container-fluid p-0 row text-dark text-center">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">School Name</label>
                    <div className="mx-auto mb-3">
                      <select
                        className="form-select"
                        defaultValue={inputField.school}
                        name="school"
                        onChange={handleSelection}
                      >
                        <option value="">Select School Name</option>
                        {schoolData.length > 0
                          ? schoolData.map((el) => {
                              return (
                                <option
                                  key={el.id}
                                  value={
                                    el.school + "-" + el.udise + "-" + el.gp
                                  }
                                >
                                  {el.school}
                                </option>
                              );
                            })
                          : null}
                      </select>
                    </div>
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">GP Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="gp"
                      value={addInputField.gp}
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          gp: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">UDISE</label>
                    <input
                      type="text"
                      className="form-control"
                      name="udise"
                      value={addInputField.udise}
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          udise: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">PP</label>
                    <input
                      type="number"
                      className="form-control"
                      name="cl_pp_student"
                      value={addInputField.cl_pp_student}
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          cl_pp_student: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Class I</label>
                    <input
                      type="number"
                      className="form-control"
                      name="cl_1_student"
                      value={addInputField.cl_1_student}
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          cl_1_student: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Class II</label>
                    <input
                      type="number"
                      className="form-control"
                      name="cl_2_student"
                      value={addInputField.cl_2_student}
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          cl_2_student: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Class III</label>
                    <input
                      type="number"
                      className="form-control"
                      name="cl_3_student"
                      value={addInputField.cl_3_student}
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          cl_3_student: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Class IV</label>
                    <input
                      type="number"
                      className="form-control"
                      name="cl_4_student"
                      value={addInputField.cl_4_student}
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          cl_4_student: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Class V</label>
                    <input
                      type="number"
                      className="form-control"
                      name="cl_5_student"
                      value={addInputField.cl_5_student}
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          cl_5_student: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Total Student</label>
                    <input
                      type="number"
                      className="form-control"
                      name="total_student"
                      value={
                        addInputField.cl_pp_student +
                        addInputField.cl_1_student +
                        addInputField.cl_2_student +
                        addInputField.cl_3_student +
                        addInputField.cl_4_student +
                        addInputField.cl_5_student
                      }
                      onMouseLeave={(e) =>
                        setAddInputField({
                          ...addInputField,
                          total_student: parseInt(e.target.value),
                        })
                      }
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          total_student: parseInt(e.target.value),
                        })
                      }
                    />
                    <span className="text-danger">Hover</span>
                  </div>
                  <div className="mb-3 col-lg-6">
                    <label className="form-label">Total Rate</label>
                    <input
                      type="number"
                      className="form-control"
                      name="total_rate"
                      value={Math.floor(
                        addInputField.cl_pp_student * qRateData.pp_rate +
                          addInputField.cl_1_student * qRateData.i_rate +
                          addInputField.cl_2_student * qRateData.ii_rate +
                          addInputField.cl_3_student * qRateData.iii_rate +
                          addInputField.cl_4_student * qRateData.iv_rate +
                          addInputField.cl_5_student * qRateData.v_rate
                      )}
                      onMouseLeave={(e) =>
                        setAddInputField({
                          ...addInputField,
                          total_rate: parseInt(e.target.value),
                        })
                      }
                      onChange={(e) =>
                        setAddInputField({
                          ...addInputField,
                          total_rate: parseInt(e.target.value),
                        })
                      }
                    />
                    <span className="text-danger">Hover</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setAddInputField({
                      id: docId,
                      school: "",
                      gp: "",
                      udise: "",
                      cl_pp_student: 0,
                      cl_1_student: 0,
                      cl_2_student: 0,
                      cl_3_student: 0,
                      cl_4_student: 0,
                      cl_5_student: 0,
                      payment: "Due",
                      paid: 0,
                      total_student: 0,
                      total_rate: 0,
                    });
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  name="submit"
                  onClick={addSchool}
                  data-bs-dismiss="modal"
                >
                  Add School
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="myModal4"
          tabIndex="-1"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-dark text-center"
                  id="myModalLabel"
                >
                  Update Question Rate
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-dark text-center">
                <div className="container-fluid p-0 row text-dark text-center">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">PP Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pp_rate"
                      value={questionInputField.question_pp_rate}
                      onChange={(e) =>
                        setQuestionInputField({
                          ...questionInputField,
                          question_pp_rate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class I Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.question_1_rate}
                      onChange={(e) =>
                        setQuestionInputField({
                          ...questionInputField,
                          question_1_rate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class II Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.question_2_rate}
                      onChange={(e) =>
                        setQuestionInputField({
                          ...questionInputField,
                          question_2_rate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class III Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.question_3_rate}
                      onChange={(e) =>
                        setQuestionInputField({
                          ...questionInputField,
                          question_3_rate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class IV Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.question_4_rate}
                      onChange={(e) =>
                        setQuestionInputField({
                          ...questionInputField,
                          question_4_rate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Class V Rate</label>
                    <input
                      type="text"
                      className="form-control"
                      name="i_rate"
                      value={questionInputField.question_5_rate}
                      onChange={(e) =>
                        setQuestionInputField({
                          ...questionInputField,
                          question_5_rate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Year</label>
                    <input
                      type="number"
                      className="form-control"
                      name="year"
                      value={questionInputField.year}
                      onChange={(e) =>
                        setQuestionInputField({
                          ...questionInputField,
                          year: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <h6 className="form-label">
                      Current Term: {qRateData.term}
                    </h6>
                    <h6 className="form-label">
                      Selected Term: {questionInputField.term}
                    </h6>
                  </div>
                  <div className="col-md-6 mx-auto mb-3">
                    <label className="form-label">Select Term</label>
                    <select
                      className="form-select"
                      id="term"
                      defaultValue={""}
                      onChange={(e) => {
                        setQuestionInputField({
                          ...questionInputField,
                          term: e.target.value,
                        });
                      }}
                      aria-label="Default select example"
                    >
                      <option value="">Select Term</option>

                      <option value="1st">1st</option>
                      <option value="2nd">2nd</option>
                      <option value="3rd">3rd</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setQuestionInputField({
                      question_pp_rate: qRateData.pp_rate,
                      question_1_rate: qRateData.i_rate,
                      question_2_rate: qRateData.ii_rate,
                      question_3_rate: qRateData.iii_rate,
                      question_4_rate: qRateData.iv_rate,
                      question_5_rate: qRateData.v_rate,
                      term: qRateData.term,
                      year: qRateData.year,
                    });
                  }}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  name="submit"
                  onClick={updateQrateData}
                  data-bs-dismiss="modal"
                >
                  Update Rate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 mx-auto mb-3">
        <select
          className="form-select"
          id="selectForm"
          defaultValue={""}
          onChange={changeData}
          aria-label="Default select example"
        >
          <option value="">Select School Name</option>
          {qData.length > 0
            ? qData.map((el) => {
                return (
                  <option key={el.id} value={el.udise}>
                    {el.school}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      {Object.keys(selectedSchool).length > 0 ? (
        <div className="col-md-6 mx-auto p-2 my-3">
          <table className="container">
            <tr>
              <th colSpan="2">
                Amta West Circle, {qRateData.term} Summative Exam,{" "}
                {qRateData.year}
              </th>
            </tr>
            <tr>
              <th>School Name</th>
              <th>
                <span>{selectedSchool.school}</span>
              </th>
            </tr>
            <tr>
              <th>Gram Panchayet</th>
              <th>
                <span id="gp">{selectedSchool.gp}</span>
              </th>
            </tr>
            <tr>
              <th>PP Students</th>
              <th>
                <span id="pp">{selectedSchool.cl_pp_student}</span>
              </th>
            </tr>
            <tr>
              <th>I Students</th>
              <th>
                <span id="i">{selectedSchool.cl_1_student}</span>
              </th>
            </tr>
            <tr>
              <th>II Students</th>
              <th>
                <span id="ii">{selectedSchool.cl_2_student}</span>
              </th>
            </tr>
            <tr>
              <th>III Students</th>
              <th>
                <span id="iii">{selectedSchool.cl_3_student}</span>
              </th>
            </tr>
            <tr>
              <th>IV Students</th>
              <th>
                <span id="iv">{selectedSchool.cl_4_student}</span>
              </th>
            </tr>
            {selectedSchool.cl_5_student > 0 ? (
              <tr className="v_hide">
                <th className="v_hide">V Students</th>
                <th className="v_hide">
                  <span id="v">{selectedSchool.cl_5_student}</span>
                </th>
              </tr>
            ) : null}
            <tr>
              <th>Total</th>
              <th>
                <span id="total">{selectedSchool.total_student}</span>
              </th>
            </tr>
            <tr>
              <th>PP Cost</th>
              <th>
                <span id="pp_rate">
                  {round2dec(selectedSchool.cl_pp_student * qRateData.pp_rate)}
                </span>
              </th>
            </tr>
            <tr>
              <th>I Cost</th>
              <th>
                <span id="i_rate">
                  {round2dec(selectedSchool.cl_1_student * qRateData.i_rate)}
                </span>
              </th>
            </tr>
            <tr>
              <th>II Cost</th>
              <th>
                <span id="ii_rate">
                  {round2dec(selectedSchool.cl_2_student * qRateData.ii_rate)}
                </span>
              </th>
            </tr>
            <tr>
              <th>III Cost</th>
              <th>
                <span id="iii_rate">
                  {round2dec(selectedSchool.cl_3_student * qRateData.iii_rate)}
                </span>
              </th>
            </tr>
            <tr>
              <th>IV Cost</th>
              <th>
                <span id="iv_rate">
                  {round2dec(selectedSchool.cl_4_student * qRateData.iv_rate)}
                </span>
              </th>
            </tr>

            {selectedSchool.cl_5_rate > 0 ? (
              <tr className="v_hide">
                <th className="v_hide">V Cost</th>
                <th className="v_hide">
                  <span id="v_rate">
                    {round2dec(selectedSchool.cl_5_student * qRateData.v_rate)}
                  </span>
                </th>
              </tr>
            ) : null}
            <tr>
              <th>Total Cost</th>
              <th>
                <span id="total_rate">
                  {Math.floor(
                    selectedSchool.cl_pp_student * qRateData.pp_rate +
                      selectedSchool.cl_1_student * qRateData.i_rate +
                      selectedSchool.cl_2_student * qRateData.ii_rate +
                      selectedSchool.cl_3_student * qRateData.iii_rate +
                      selectedSchool.cl_4_student * qRateData.iv_rate +
                      selectedSchool.cl_5_student * qRateData.v_rate
                  )}
                </span>
              </th>
            </tr>
            <tr>
              <th>Payment Status</th>
              <th>
                <span id="payment">{selectedSchool.payment}</span>
              </th>
            </tr>
            <tr>
              <td>
                <Link
                  className="btn btn-sm m-1 btn-info"
                  href={`/printquestioninvoice`}
                  onClick={() => {
                    setStateObject(selectedSchool);
                  }}
                >
                  Print Invoice
                </Link>
                <button
                  type="button"
                  id={selectedSchool.id}
                  className="btn btn-sm px-2 rounded btn-danger"
                  onClick={async (e) => {
                    let schId = selectedSchool.id;
                    // eslint-disable-next-line no-restricted-globals
                    let confmessage = confirm(
                      `Are You Sure To Delete ${selectedSchool.school}`
                    );
                    if (confmessage) {
                      try {
                        await deleteDoc(doc(firestore, "questions", schId));

                        toast.success("Successfully Deleted School!!!", {
                          position: "top-right",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,

                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });

                        setSelectedSchool({});
                      } catch (e) {
                        toast.error("Something Went Wrong in Server!", {
                          position: "top-right",
                          autoClose: 1500,
                          hideProgressBar: false,
                          closeOnClick: true,

                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }
                    }
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                {/* <!-- Button trigger modal --> */}
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal2"
                >
                  Update Student Number & Payment Status
                </button>
              </td>
            </tr>
          </table>
          <div className="text-center ">
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="myModal2"
              tabIndex="-1"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-md">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1
                      className="modal-title fs-5 text-dark text-center"
                      id="myModalLabel"
                    >
                      Update Student Number
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body text-dark text-center">
                    <div className="container-fluid p-0 row text-dark text-center">
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          School Name
                        </label>
                        <p id="school_student">{selectedSchool.school}</p>
                      </div>

                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">PP</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cl_pp_student_inp"
                          name="cl_pp_student"
                          value={inputField.cl_pp_student}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              cl_pp_student: parseInt(e.target.value),
                            })
                          }
                        />
                        <p>{selectedSchool.cl_pp_student}</p>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">Class I</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cl_1_student_inp"
                          name="cl_1_student"
                          value={inputField.cl_1_student}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              cl_1_student: parseInt(e.target.value),
                            })
                          }
                        />
                        <p>{selectedSchool.cl_1_student}</p>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">Class II</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cl_2_student_inp"
                          name="cl_2_student"
                          value={inputField.cl_2_student}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              cl_2_student: parseInt(e.target.value),
                            })
                          }
                        />
                        <p>{selectedSchool.cl_2_student}</p>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">Class III</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cl_3_student_inp"
                          name="cl_3_student"
                          value={inputField.cl_3_student}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              cl_3_student: parseInt(e.target.value),
                            })
                          }
                        />
                        <p>{selectedSchool.cl_3_student}</p>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">Class IV</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cl_4_student_inp"
                          name="cl_4_student"
                          value={inputField.cl_4_student}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              cl_4_student: parseInt(e.target.value),
                            })
                          }
                        />
                        <p>{selectedSchool.cl_4_student}</p>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">Class V</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cl_5_student_inp"
                          name="cl_5_student"
                          value={inputField.cl_5_student}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              cl_5_student: parseInt(e.target.value),
                            })
                          }
                        />
                        <p>{selectedSchool.cl_5_student}</p>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Total Student
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="total_student_inp"
                          name="total_student"
                          value={
                            inputField.cl_pp_student +
                            inputField.cl_1_student +
                            inputField.cl_2_student +
                            inputField.cl_3_student +
                            inputField.cl_4_student +
                            inputField.cl_5_student
                          }
                          onMouseLeave={(e) =>
                            setInputField({
                              ...inputField,
                              total_student: parseInt(e.target.value),
                            })
                          }
                          readOnly
                        />
                        <p>{selectedSchool.total_student}</p>
                        <h6 className="text-danger">Hover</h6>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label className="form-label fw-bold">Payment</label>
                        <select
                          name="payment"
                          id="payment_inp"
                          className="form-select"
                          aria-label="Default select example"
                          value={inputField.payment}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              payment: e.target.value,
                            })
                          }
                        >
                          <option value="">Select From Below</option>
                          <option value="Due">Due</option>
                          <option value="Paid">Paid</option>
                        </select>
                        <p>{selectedSchool.payment}</p>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Paid Amount
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="paid_inp"
                          name="paid"
                          value={inputField.paid}
                          onChange={(e) =>
                            setInputField({
                              ...inputField,
                              paid: parseInt(e.target.value),
                            })
                          }
                        />
                        <p>{selectedSchool.paid}</p>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">
                          Net Bill(Rs.)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="total_rate_inp"
                          name="total_rate"
                          value={Math.floor(
                            inputField.cl_pp_student * qRateData.pp_rate +
                              inputField.cl_1_student * qRateData.i_rate +
                              inputField.cl_2_student * qRateData.ii_rate +
                              inputField.cl_3_student * qRateData.iii_rate +
                              inputField.cl_4_student * qRateData.iv_rate +
                              inputField.cl_5_student * qRateData.v_rate
                          )}
                          onMouseLeave={(e) =>
                            setInputField({
                              ...inputField,
                              total_rate: parseInt(e.target.value),
                            })
                          }
                          readOnly
                        />
                        <p>{selectedSchool.total_rate}</p>
                        <h6 className="text-danger">Hover</h6>
                      </div>
                      <div className="mb-3 col-lg-6">
                        <label className="form-label fw-bold">ID</label>
                        <input
                          type="text"
                          className="form-control"
                          name="id"
                          value={selectedSchool.id}
                          onMouseLeave={(e) =>
                            setInputField({
                              ...inputField,
                              id: e.target.value,
                            })
                          }
                          readOnly
                        />
                        <p>{selectedSchool.id}</p>
                        <h6 className="text-danger">Hover</h6>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={(e) => {
                        document.getElementById("selectForm").selectedIndex = 0;
                        setSelectedSchool({});
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      id="submit"
                      name="submit"
                      data-bs-dismiss="modal"
                      onClick={updateQuestionStudentValue}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default QuestionSec;
