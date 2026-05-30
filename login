Command:
curl.exe -s -X POST http://127.0.0.1:5000/customer/login -H "Content-Type: application/json" -d "{\"username\":\"testuser\",\"password\":\"testpass\"}"

Output:
{"message":"Login successful!","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzgwMDc1OTUxLCJleHAiOjE3ODAwNzk1NTF9.EXyHcRw9GGKL05NSc6wcHR5PB3-24bpDw3pu8YlSjyQ"}

