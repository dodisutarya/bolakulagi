var base_url = "https://api.football-data.org/v2/";
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
      var teamsHTML = "";
      data.teams.forEach(function (team) {
        teamsHTML += `
              <div class="card">
                <a href="./team.html?id=${team.id}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl}" />
                  </div>
                </a>
                <div class="card-content">
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
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
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
      console.log(data.squad);
      console.log(data.squad.length);
      // Menyusun komponen card artikel secara dinamis

      var squadHTML ="";

        data.squad.forEach(function(squads, index, array){
          var dateBirth = new Date(squads.dateOfBirth);

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


      var teamHTML = `
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
      // document.getElementById("body-content-squad").innerHTML = squadHTML;
    });
}


function getStandings() {
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
      //console.log(data.standings);
      
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      var standingstdHTML = "";

      var standingsHTML = `
          <table class="responsive-table highlight">
            <tr>
              <th rowspan="2">Position</th>    
              <th colspan="2">Team</th>
              <th colspan="4">Klasmen</th>
            </tr>
            <tr>
              <th>Logo</th>
              <th>Nama</th>    
              <th>Menang</th>
              <th>Seri</th>
              <th>Kalah</th>
              <th>Point</th>              
            </tr>      
      `;
      


      data.standings.forEach(function (standing, index, array) {
        console.log(standing.table);
        console.log(standing.team[index]);
        standingstdHTML += `
        
          <tr>
            <td>1</td>
            <td><img src="${data.crestUrl}" height="50px" width="50px"></td>
            <td>${ team[index] }</td>
            <td>8</td>
            <td>9</td>
            <td>0</td>
            <td>20</td>
          </tr>
        
      </table>
            `;
      });
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standing").innerHTML = standingsHTML;
    })
    .catch(error);
}