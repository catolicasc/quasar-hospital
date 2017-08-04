import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyC7Adfv1OZIf7XVxdvdgFa7iRe8n1FK00A',
  authDomain: 'gerenciador-enfermagem.firebaseapp.com',
  databaseURL: 'https://gerenciador-enfermagem.firebaseio.com',
  storageBucket: 'gerenciador-enfermagem.appspot.com',
  messagingSenderId: '6bfdd23a-a9e3-4c7b-88a2-212015cbfb13'
})

function getErrorMessage (code) {
  const errorMessages = {
    'auth/too-many-requests': 'Você inseriu incorretamente seus dados por muitas vezes, tente novamente dentro de alguns minutos.',
    'auth/invalid-email': 'E-mail inválido.',
    'auth/wrong-password': 'Usuário encontrado, porém a senha digitada está incorreta.',
    'auth/user-not-found': 'Usuário não encontrado.',
    'auth/weak-password': 'Senha fraca. A senha usada deve ter no mínimo 6 caracteres.',
    'auth/email-already-in-use': 'Este e-mail já está cadastrado, tente usá-lo para entrar.',
    'auth/account-exists-with-different-credential': 'Você já está cadastrado porém em um tipo diferente de conta. Tente entrar com seu e-mail e senha abaixo.',
    'auth/network-request-failed': 'Houve um erro de conexão.'
  }

  if (errorMessages[code]) {
    return errorMessages[code]
  }
  return 'Houve um erro ao entrar.'
}

export default {
  Firebase: Firebase,
  FirebaseDatabase: firebaseApp.database(),
  FirebaseAuth: firebaseApp.auth(),
  getErrorMessage: getErrorMessage
}
