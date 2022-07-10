import React, { useState } from 'react'



function Dropdown() {

  const [dropdownListVisibility, setDropdownVisibility] = useState(false);

  const [editVisibility, setEditVisibility] = useState(false);

  const [newInputVal, setNewInputVal] = useState("");

  const [checked, setChecked] = useState([]);





  // const listItem = ["Create Personal", "Prepare Wireframe", "Send Final Proposal", "send document"];



  const [listItem, setListItem] = useState([{ name: "Create Personal" }, { name: "Prepare Wireframe" }]);



  // Add/Remove checked item from list

  const handleCheck = (event) => {

   

    var updatedList = [...checked];

    if (event.target.checked) {

      updatedList = [...checked, {name:event.target.value}];

    } else {

      updatedList.splice(checked.indexOf(event.target.value), 1);

    }

    setChecked(updatedList);

  };







  const handleDelete = (name) => {

    setChecked(checked.filter(item => item.name !== name));

  };





  const tickHandler = (name) => {

    for (let i = 0; i < checked.length; i++) {

      if (checked[i].name === name) {

        return true;

      }

    }

  }







  const addItemHandler = () => {





    setListItem([...listItem, { name: "" }])



    // if(newInputVal!==""){

    //   setListItem((oldItem)=>{

    //     return [...oldItem,newInputVal]

    //   });

    // }



    // setNewInputVal("");

    // setEditVisibility(!editVisibility);

  }



  const handleChange = (e, index) => {

    let newArr = [...listItem];

    newArr[index].name = e.target.value;

    setListItem(newArr);

  }

 

  const isDisable = listItem.find((e) => e.name === "")

  return (

    <div className='dropdown3-container'>

      <div className='selected-item'>



        {

          checked.map((data, index) =>

            <div key={index} className="df checked-list">{data.name} <div style={{ marginLeft: "8px" , zIndex:"1254654"}} onClick={() => handleDelete(data.name)} >&#10005;</div>

            </div>

          )

        }

      </div>

      <div onClick={() => { setDropdownVisibility(!dropdownListVisibility) }}>Compact</div>



      {

        dropdownListVisibility &&

        <>

    <div className='back-container' onClick={()=>{setDropdownVisibility(false);}}></div>

        <div className="dropdown3-list-container">

          <ul>

            {

              listItem.



                map((data, index) =>

                  <li key={index} className="dropdown3-list hover">

                    <input type="checkbox" id={data} value={data.name} style={{ color: "white", backgroundColor: "white", accentColor: "#4FCA7A" }} onChange={handleCheck} checked={tickHandler(data.name)} />

                    <input type="text" value={data.name} className="label" onChange={(e) => { handleChange(e, index); }} />

                    {/* <label htmlFor={data} className="label">{data}</label> */}

                  </li>

                )

            }

            {editVisibility &&

              <li className="dropdown3-list hover">

                <input type="checkbox" style={{ color: "white", backgroundColor: "white", accentColor: "#4FCA7A" }} />

                <input type="text" onChange={(e) => setNewInputVal({ name: e.target.value })} value={newInputVal} />

              </li>

            }

            <button className='add-item add-item-btn' onClick={addItemHandler} disabled={isDisable}>Add Item</button>

          </ul>

        </div>

        </>

        }



    </div>

  )

}



export default Dropdown