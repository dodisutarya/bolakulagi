const base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}


// Blok kode untuk melakukan request data json
function getTeams() {

  if ('caches' in window) {
    caches.match(base_url + "teams").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let teamsHTML = "";
          data.teams.forEach(function (team) {
            teamsHTML += `
                  <div class="card ">
                    <a href="./team.html?id=${team.id}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="${team.crestUrl}" />
                      </div>
                    </a>
                    <div class="card-content center-align">
                      <span class="card-title truncate">${team.name}</span>
                      <p>${team.address}</p>
                      <p>${team.phone}</p>
                      <p>${team.website}</p>
                      <p>${team.email}</p>
                      <p>${team.venue}</p>
                    </div>
                  </div>
                `;
          });

          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("teams").innerHTML = teamsHTML;

        })
      }
    })
  }



  fetch(base_url + "teams", {
    mode: 'cors',
    method: 'GET',
    headers: {
      'X-Auth-Token': '6d8933480de240d781d7edeafc54d302',
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      let teamsHTML = "";
      data.teams.forEach(function (team) {
        teamsHTML += `
              <div class="card ">
                <a href="./team.html?id=${team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl}" />
                  </div>
                </a>
                <div class="card-content center-align">
                  <span class="card-title truncate">${team.name}</span>
                  <p>${team.address}</p>
                  <p>${team.phone}</p>
                  <p>${team.website}</p>
                  <p>${team.email}</p>
                  <p>${team.venue}</p>
                </div>
              </div>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}


function getTeamById() {

  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ('caches' in window) {
      caches.match(base_url + "/teams" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            const squadHTML = "";

            data.squad.forEach(function (squads) {
              const dateBirth = new Date(squads.dateOfBirth);

              squadHTML += `                                                         
                <tr>
                  <td>${squads.name}</td>                
                  <td>${squads.nationality}</td>
                  <td>${dateBirth.getDate() + '-' + dateBirth.getMonth() + '-' + dateBirth.getFullYear()}</td>
                  <td>${squads.position}</td>
                  <td>${squads.role}</td>               
                </tr>                        
            `;
            })

            let teamHTML = `
            <div class="card center-align">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" width="50px" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                    <p>${data.address}</p>
                    <p>${data.phone}</p>
                    <p>${data.website}</p>
                    <p>${data.email}</p>
                    <p>${data.venue}</p>                 
              </div>
            </div>
            <h4 class="center-align">DAFTAR SQUAD</h4>
            <table class="striped responsive-table">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Kebangsaan</th>
                  <th>Tanggal Lahir</th>
                  <th>Posisi</th>
                  <th>Role</th>
              </tr>
            </thead>
            <tbody>
            ${squadHTML}
            </tbody>
            </table>          
          `;

            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);

          })
        }
      })
    }


    fetch(base_url + "teams/" + idParam, {
      mode: 'cors',
      method: 'GET',
      headers: {
        'X-Auth-Token': '6d8933480de240d781d7edeafc54d302',
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.    
        // Menyusun komponen card artikel secara dinamis
        let squadHTML = "";

        data.squad.forEach(function (squads) {
          let dateBirth = new Date(squads.dateOfBirth);

          squadHTML += `                                                         
                <tr>
                  <td>${squads.name}</td>                
                  <td>${squads.nationality}</td>
                  <td>${dateBirth.getDate() + '-' + dateBirth.getMonth() + '-' + dateBirth.getFullYear()}</td>
                  <td>${squads.position}</td>
                  <td>${squads.role}</td>               
                </tr>                        
            `;
        })

        let teamHTML = `
            <div class="card center-align">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" width="50px" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                    <p>${data.address}</p>
                    <p>${data.phone}</p>
                    <p>${data.website}</p>
                    <p>${data.email}</p>
                    <p>${data.venue}</p>                 
              </div>
            </div>
            <h4 class="center-align">DAFTAR SQUAD</h4>
            <table class="striped responsive-table">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Kebangsaan</th>
                  <th>Tanggal Lahir</th>
                  <th>Posisi</th>
                  <th>Role</th>
              </tr>
            </thead>
            <tbody>
            ${squadHTML}
            </tbody>
            </table>          
          `;

        // Sisipkan komponen card ke dalam elemen dengan id #content
        document.getElementById("body-content").innerHTML = teamHTML;

        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  })
}

function getStandings() {

  if ('caches' in window) {
    caches.match(base_url + "teams/").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          let standingsTotalHTML = "";
          data.standings.forEach(function (standing) {
            // console.log(standing);
            if (standing.type == "TOTAL") {
              standing.table.forEach(teamInfo => {
                standingsTotalHTML += `        
            <tr>
              <td>${teamInfo.position}</td>
              <td><img src="${teamInfo.team.crestUrl}" height="50px" width="50px"></td>
              <td>${teamInfo.team.name}</td>
              <td>${teamInfo.playedGames}</td>
              <td>${teamInfo.goalDifference}</td>
              <td>${teamInfo.goalsAgainst}</td>
              <td>${teamInfo.goalsFor}</td>
              <td>${teamInfo.won}</td>              
              <td>${teamInfo.draw}</td>
              <td>${teamInfo.lost}</td>
              <td>${teamInfo.points}</td>                
            </tr>
              `;
              })
            }
          });

          let standingsHTML = `
          <table class="striped bordered responsive-table">
          <thead>
            <tr>
              <th>Position</th>  
              <th>Logo</th>
              <th>Name</th>    
              <th>Play</th>
              <th>GD</th>
              <th>GA</th>
              <th>GF</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>Pts</th>                   
            </tr> 
          </thead>            
            ${standingsTotalHTML}                         
            </table>
      `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standing").innerHTML = standingsHTML;




        })
      }
    })
  }





  fetch(base_url + "competitions/2021/standings", {
    mode: 'cors',
    method: 'GET',
    headers: {
      'X-Auth-Token': '6d8933480de240d781d7edeafc54d302',
    }
  })
    .then(status)
    .then(json)
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card standing secara dinamis
      let standingsTotalHTML = "";
      data.standings.forEach(function (standing) {
        // console.log(standing);
        if (standing.type == "TOTAL") {
          standing.table.forEach(teamInfo => {
            standingsTotalHTML += `        
            <tr>
              <td>${teamInfo.position}</td>
              <td><img src="${teamInfo.team.crestUrl}" height="50px" width="50px"></td>
              <td>${teamInfo.team.name}</td>
              <td>${teamInfo.playedGames}</td>
              <td>${teamInfo.goalDifference}</td>
              <td>${teamInfo.goalsAgainst}</td>
              <td>${teamInfo.goalsFor}</td>
              <td>${teamInfo.won}</td>              
              <td>${teamInfo.draw}</td>
              <td>${teamInfo.lost}</td>
              <td>${teamInfo.points}</td>                
            </tr>
              `;
          })
        }
      });

      let standingsHTML = `
          <table class="striped bordered responsive-table">
          <thead>
            <tr>
              <th>Position</th>  
              <th>Logo</th>
              <th>Name</th>    
              <th>Play</th>
              <th>GD</th>
              <th>GA</th>
              <th>GF</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>Pts</th>                   
            </tr> 
          </thead>            
            ${standingsTotalHTML}                         
            </table>
      `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standing").innerHTML = standingsHTML;
    })
    .catch(error);
}

function getSavedTeams() {
  getAll().then(function (teams) {
    console.log(teams);
    // Menyusun komponen card artikel secara dinamis
    let teamsHTML = "";
    teams.forEach(function (team) {

      teamsHTML += `
              <div class="card ">
                <a href="./teamsaved.html?id=${team.id}&saved=true">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl}" />
                  </div>
                </a>
                <div class="card-content center-align">
                  <span class="card-title truncate">${team.name}</span>
                  <p>${team.address}</p>
                  <p>${team.phone}</p>
                  <p>${team.website}</p>
                  <p>${team.email}</p>
                  <p>${team.venue}</p>
                  
                </div>
              </div>
            `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function getSavedTeamById() {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  console.log(getById(idParam));

  getById(Number(idParam)).then(function (data) {

    console.log(data);

    let squadHTML = "";

    data.squad.forEach(function (squads) {
      let dateBirth = new Date(squads.dateOfBirth);

      squadHTML += `                                                         
                <tr>
                  <td>${squads.name}</td>                
                  <td>${squads.nationality}</td>
                  <td>${dateBirth.getDate() + '-' + dateBirth.getMonth() + '-' + dateBirth.getFullYear()}</td>
                  <td>${squads.position}</td>
                  <td>${squads.role}</td>               
                </tr>                        
            `;
    })

    let teamHTML = `
            <div class="card center-align">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${data.crestUrl}" width="50px" />
              </div>
              <div class="card-content">
                <span class="card-title">${data.name}</span>
                    <p>${data.address}</p>
                    <p>${data.phone}</p>
                    <p>${data.website}</p>
                    <p>${data.email}</p>
                    <p>${data.venue}</p>                 
              </div>
            </div>
            <h4 class="center-align">DAFTAR SQUAD</h4>
            <table class="striped responsive-table">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Kebangsaan</th>
                  <th>Tanggal Lahir</th>
                  <th>Posisi</th>
                  <th>Role</th>
              </tr>
            </thead>
            <tbody>
            ${squadHTML}
            </tbody>
            </table>          
          `;

    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;


  });
}


function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.get(parseInt(id));
        //Disini seharusnya kamu konversi terlebih dahulu parameter id menjadi int sesuai dengan tipe data id yang tersimpan pada indexedDb.
      })
      .then(function (team) {
        resolve(team);
      });
  });
}