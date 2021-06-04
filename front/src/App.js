import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';



function IotForm() {

  //-- hooks formulaire
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  //-- hooks rendu etat module
  const [modState, setModState] = useState([]);
  const [modName, setModName] = useState([]);
  const [etatname, setEtatname] = useState();
  const [etatTemp, setEtatTemp] = useState();
  const [etatRuntime, setRunTime] = useState();
  const [etatDataSent, setDataSent] = useState();
  const [etatOpCond, setOpCond] = useState();

 



  //--- appel des données sur BDD

  useEffect(() => {

    axios
      .get("http://localhost:4545/etatModules")
      .then(res => {
        setModState(res.data)
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {

    axios
      .get("http://localhost:4545/modules")
      .then(res => {
        setModName(res.data)
      })
      .catch(err => console.log(err));
  }, []);




  const handleAddname = (e) => {
    const newValue = e.target.value
    setName(newValue);
  }

  const handleAddnumber = (e) => {
    const newValue = e.target.value
    setNumber(newValue);
  }

  const handleAdddescription = (e) => {
    const newValue = e.target.value
    setDescription(newValue);
  }

  const handleAddtype = (e) => {
    const newValue = e.target.value
    setType(newValue);
  }




  //---- Envoi des données sur BDD

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4545/modules", { name, number, description, type })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

  }


  return (
    <div className="App">

      <div id="title"><h1>IOT-CONNECT</h1></div>
      <div id="sub-title"><h2>Make simple - Stay connect</h2></div>

      <form
        onSubmit={(e) => {
          handleSubmit(e);
          alert('le module a été crée')

        }}
      >

        <fieldset>
          <legend>Module :</legend>

          <div className="ch-name">
            <label className="t-label" htmlFor="nom">Nom : </label><br />
            <input
              type="text"
              name="name"
              size="35"
              placeholder="entrer le nom du module"
              onChange={(e) => {
                handleAddname(e)
              }}
              required
            />
          </div>

          <div className="ch-number">
            <label className="t-label" htmlFor="numero">Numero : </label><br />
            <input

              type="number"
              name="number"
              size="35"
              placeholder="entrer le numero du module"

              onChange={(e) => {
                handleAddnumber(e)
              }}
              required
            />
          </div>

          <div className="ch-description">
            <label className="t-label" htmlFor="description">Description : </label><br />
            <textarea

              maxLength="255"
              placeholder="entrer la description du module"
              name="description"
              onChange={(e) => {
                handleAdddescription(e)
              }}
              required
            >
            </textarea>
          </div>

          <div className="ch-type">
            <label className="t-label" htmlFor="type">Type : </label><br />
            <input

              type="text"
              name="type"
              size="35"
              placeholder="entrer le type du module"

              onChange={(e) => {
                handleAddtype(e)
              }}
              required
            />
          </div>

          <div id="grp-but">
            <input className="bt-submit" type="submit" value="Creation du Module" />
            <input className="bt-reset" type="reset" value="Reset" />
          </div>

        </fieldset>

        <hr />

        <fieldset>
          <legend>Etat du module : </legend>

          <div id="container">

            <div id="valmod">

              <p>Nom du module</p><br />
              <select
                onChange={(event) => setEtatname(event.target.value)}
              >
                {
                  modName
                    .map((modnames, i) => {
                      return (

                        <option key={i} value={modnames.id}>
                          {modnames.name}
                        </option>

                      )
                    })
                }
              </select>

              <p>temperature du module</p><br />


              <select
                onChange={(event) => setEtatTemp(event.target.value)}
              >
                {
                  modState
                    .map((modstates, i) => {
                      return (

                        <option key={i} value={modstates.id}>
                          {modstates.temperature}
                        </option>

                      )
                    })
                }
              </select>


              <p>durée de fonctionnement</p><br />
              <select
                onChange={(event) => setRunTime(event.target.value)}
              >
                {
                  modState
                    .map((modstates, i) => {
                      return (

                        <option key={i} value={modstates.id}>
                          {modstates.running_time}
                        </option>

                      )
                    })
                }
              </select>

              <p>données transmises</p><br />
              <select
                onChange={(event) => setDataSent(event.target.value)}
              >
                {
                  modState
                    .map((modstates, i) => {
                      return (

                        <option key={i} value={modstates.id}>
                          {modstates.data_sent}
                        </option>

                      )
                    })
                }
              </select>

              <p>état de fonctionnement</p><br />
              <select
                onChange={(event) => setOpCond(event.target.value)}
              >
                {
                  modState
                    .map((modstates, i) => {
                      return (

                        <option key={i} value={modstates.id}>
                          {modstates.operating_condition}
                        </option>

                      )
                    })
                }
              </select>

            </div>

            <div>
              <div id="valresult">

                
                <h3>Results</h3>
                <hr />
                <p>{etatname}</p><br />
                <p>{etatTemp}</p><br />
                <p>{etatRuntime}</p><br />
                <p>{etatDataSent}</p><br />
                <p>{etatOpCond}</p><br />

              </div>

            </div>
          </div>

        </fieldset>
      </form>

    </div >
  );
}

export default IotForm;
