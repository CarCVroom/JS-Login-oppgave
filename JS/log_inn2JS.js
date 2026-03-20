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
        password = document.getElementById('input2').value;
        username = document.getElementById('input1').value;

        fetch('http://localhost:3000/get_password', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                        username: username,
                        password: password
                })
        })
        .then(res => {
                if (res.status === 200) {
                        window.open('./bruker.html');
                } else if (res.status === 201) {
                        window.open('./admin.html');
                } else {
                        alert("Wrong password or username")
                }
        }
        ) // Henter data fra sever på localhost
        .catch(err => console.log(err));
};