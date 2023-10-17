import pyrebase 

config = {
  'apiKey': "AIzaSyBbY3mR_FrGR70807_x2GQ21UHyu3WqQ5I",
  'authDomain': "gestechdb.firebaseapp.com",
  'databaseURL': "https://gestechdb-default-rtdb.firebaseio.com",
  'projectId': "gestechdb",
  'storageBucket': "gestechdb.appspot.com",
  'messagingSenderId': "299154456680",
  'appId': "1:299154456680:web:5d1c16fb4f8cf518e57bdd",
  'measurementId': "G-0306LTT302"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
results = db.child("users").get()

print(results)
