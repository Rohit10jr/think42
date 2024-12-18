import random
print(str(random.randint(100000, 999999))
)


https://: 127:0.0.0.1.5000/api/job_post/1/
https://: 127:0.0.0.1.5000/api/users/profile/,




method: put
{
        "id": "1"
        "title": "backend internship", 
        "job_description": "backend internship at google", 
        "epiry": 10000, 
        "status: "open"
}




{
    job_postings: [{
        "id": "1"
        "title": "backend internship", 
        "job_description": "backend internship at fyle", 
        "epiry": 10000, 
        "status: "open"
    }, 

    {
        "id": "2"
        "title": "backend fulltime", 
        "job_description": "backend fulltime at fyle", 
        "epiry": 10000, 
        "status: "open"
    },
    {
        "id": "3"
        "title": "backend internship", 
        "job_description": "backend internship at fyle", 
        "epiry": 10000, 
        "status: "open"
    }]
}


{
"title": "backend internship", 
"job_description": "backend internship at fyle", 
"epiry": 10000, 
"status: "open"
}


{
"status": 400,
"response":"job is not created"
}