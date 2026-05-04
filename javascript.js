function switchScreen(screen) {
    document.getElementById('inicial-screen').classList.add('hidden');
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('signup-screen').classList.add('hidden');
    document.getElementById('welcome-screen').classList.add('hidden');
    
    
    document.getElementById(`${screen}-screen`).classList.remove('hidden');

    document.getElementById('login-msg').style.display = 'none';
    document.getElementById('signup-msg').style.display = 'none';
}

// CORRIGIDO
function showMessage(id, text, type) {
    const msgBox = document.getElementById(id);
    msgBox.textContent = text;
    msgBox.style.display = 'block';
    msgBox.className = `message-box ${type === 'error' ? 'msg-error' : 'msg-success'}`;
}

// Cadastro
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const user = document.getElementById('signup-user').value.trim();
    const pass = document.getElementById('signup-pass').value;
    const nome = document.getElementById('signup-name').value;

    if (pass.length < 4) {
        showMessage('signup-msg', 'A senha deve ter pelo menos 4 caracteres.', 'error');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(u => u.username === user)) {
        showMessage('signup-msg', 'Este nome de usuário já está em uso.', 'error');
        return;
    }

    users.push({ username: user, password: pass });
    localStorage.setItem('users', JSON.stringify(users));

    showMessage('signup-msg', 'Cadastro realizado com sucesso!', 'success');

    setTimeout(() => {
        document.getElementById('signup-form').reset();
        switchScreen('login');
        showMessage('login-msg', 'Conta criada! Faça seu login.', 'success');
    }, 1500);
});

// Login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;
    

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(u => u.username === user && u.password === pass);

    if (foundUser) {
        document.getElementById('display-user').textContent = user;
        switchScreen('welcome');
    } else {
        showMessage('login-msg', 'Usuário ou senha incorretos.', 'error');
    }
});

// Logout
function logout() {
    document.getElementById('login-form').reset();
    switchScreen('login');
}

//acessar

function accessar(){
    document.getElementById('login-form').reset();
    switchScreen('login')

}


//  CEP
function mascaraCEP(campo) {
  let valor = campo.value.replace(/\D/g, '');

  if (valor.length > 5) {
    valor = valor.substring(0, 5) + '-' + valor.substring(5, 8);
  }

  campo.value = valor;
}

function pesquisacep(valor) {
  let cep = valor.replace(/\D/g, '');

  if (cep.length !== 8) {
    alert("CEP inválido!");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(dados => {
      document.getElementById("signup-address").value = dados.logradouro;
      document.getElementById("signup-UF").value = dados.uf;
      document.getElementById("signup-bairro").value = dados.bairro
      document.getElementById("signup-complemento").value = dados.complemento


    });
}


