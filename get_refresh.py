# First just go to this url in a browser (while running the website locally)
url = "https://accounts.spotify.com/authorize?response_type=code&client_id=8f81405b8d764a89849403cf4f30c625&scope=user-read-recently-played&redirect_uri=http%3A%2F%2Flocalhost:3000%2Ftest"

# Then it will take you to the callback, you just care about the code in the URL (looks like below)
code = "AQBEc-ffGhWDosVjpEpnuPNPBF08UuTXmbkYwKvo9oMCTUtBKOtrC4C4PjVP8mQy7FIRxR-0T7iM6P0dCIVn9vjqEPtJPpKObe3aqmuJorz-ylzCy5NMPEknL8HkSu27t6A8yvSpVG6KC2T7SM7YxIpk2UohJPeOgbeWPY-gn6XsUevlQc4hFqGEVWDVX9l7woaqN1c6Uzg5"

# Then cURL it
# curl -d client_id=8f81405b8d764a89849403cf4f30c625 -d client_secret=155e00d113994cdcb75ff18b7d993213 -d grant_type=authorization_code -d code=AQBEc-ffGhWDosVjpEpnuPNPBF08UuTXmbkYwKvo9oMCTUtBKOtrC4C4PjVP8mQy7FIRxR-0T7iM6P0dCIVn9vjqEPtJPpKObe3aqmuJorz-ylzCy5NMPEknL8HkSu27t6A8yvSpVG6KC2T7SM7YxIpk2UohJPeOgbeWPY-gn6XsUevlQc4hFqGEVWDVX9l7woaqN1c6Uzg5 -d redirect_uri=http://localhost:3000/test https://accounts.spotify.com/api/token
# Then just snipe the refresh token from there
