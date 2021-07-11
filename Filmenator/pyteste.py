# http://api.tvmaze.com/search/shows?q=${query}


import requests
import json
import pprint

url = "http://api.tvmaze.com/search/shows"
params = {"q": "batman"}

response = requests.get(url, params)


def jprint(obj):
    texto = json.dumbs(bane)
    print(texto)


jprint(response.json())
