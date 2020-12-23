import React, { useState, useEffect, useRef } from 'react'
import { userColumns } from "./columns"
import { Table, Input } from "antd"
import axios from "axios"
import "antd/dist/antd.css"
import './App.css'
const { Search } = Input

  export default function App() {
    const [searchVal, setSearchVal] = useState(null)
    const [inputVal, setInputVal] = useState(true)
    const [bugsData, setBugsData] = useState([{}])
    const [err, setErr] = useState(false)
    const isInitialMount = useRef(true)
    let textInput = React.createRef()
    
  const handleClick = () => {
    let value = textInput.current.state.value
    if(value && value.length <13 && value.length > 1){
      setInputVal(true)
      setSearchVal(value)
    } else setInputVal(false)
  } 
  
  useEffect(() => {
    if (isInitialMount.current) {
       isInitialMount.current = false;
    } else {
      const fetchUsers = async () => {
        const data = await axios.get(`http://localhost:8080/data/${searchVal}`)
        if(data.data !== 'err'){
          setErr(false)
          setBugsData(data)
        } else setErr(true)
      }
      fetchUsers()
    }
  },[searchVal])
  
  return (
    <>
    <div id="title">Search Bugs</div>
      <Search
        ref={textInput}
        id={inputVal? 'correctInp' : 'wrongInp'}
        label="Tester Name"
        placeholder="Enter the tester name"
        style={{ width: "13rem" ,
                 height: '2rem', 
                 padding: '0', 
                 textAlign: 'center'
              }}
        />
      <button onClick={handleClick}>Fetch</button>
      <p id={err ? 'errOn' : 'errOff'}>Temporary error occurred, please try again later</p>
      <Table
        rowKey="name"
        dataSource={bugsData.length === 0 ? bugsData : bugsData.data}
        columns={userColumns}
        pagination={false}
      />
    </>
  )
}