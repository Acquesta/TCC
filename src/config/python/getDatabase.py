import requests

link = 'https://gestechdb-default-rtdb.firebaseio.com/'

r = requests.get(f'{link}.json', verify=False)

print(r.text)

