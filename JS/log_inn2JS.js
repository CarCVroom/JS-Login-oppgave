let password = ""
let username = ""

let usernames = ['',''];
let passwords = ['',''];

function lag_nytt_passord() {
        password = document.getElementById('input2').value;
        username = document.getElementById('input1').value;

        if (password == '' || username == '') {
                alert(`You can't have it be empty`);
        } else {
                fetch('http://localhost:3000/new_password', { // Kobler til server på localhost
                        method: 'POST', 
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                        username: username,
                        password: password // Sender disse dataene
                        })
                }).then(() => {
                        window.open('./log_inn2.html', "_self")
                })
        };
};

function log_inn() {
        fetch('http://localhost:3000/get_password') // Henter data fra sever på localhost
        .then(res => res.json())
        .then(data => {
                usernames[0] = data[0].username; // Data
                passwords[0] = data[0].password;
                usernames[1] = data[0].ADMINUSERNAME;
                passwords[1] = data[0].ADMINPASSWORD;

                if (document.getElementById('input1').value == usernames[0] && // Log in delen
                        document.getElementById('input2').value == passwords[0]) {
                        window.open('./bruker.html')
                } else if (document.getElementById('input1').value == usernames[1] &&
                           document.getElementById('input2').value == passwords[1]) {
                        
                        window.open('./admin.html');
                } else {
                        alert(`Wrong password or username`);
                };
        })
        .catch(err => console.log(err));
};