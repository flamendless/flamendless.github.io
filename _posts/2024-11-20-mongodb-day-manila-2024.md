---
title: "Experince with MongoDB Day Manila 2024"
description: ""
date: 2024-11-20
tags: [event, database, nosql, mongodb]
---

MongoDB just launched their first conference in Manila, Philippines called MongoDB Day. As someone who has not been to too much software or technical conferences, here are some of my experiences and learnings which either support or correct my previous claims from my [blog](https://flamendless.github.io/nosql/).

First of all, let me just say props to the MongoDB team for hosting their event completely for, well atleast, for us. I have expected that from a "no registration fee" event to be minimal with what they will give for free but boy, oh boy, they provided free refreshments, free lunch, and free merch!

Let us proceed, the event is just a single day (9am to 4pm) which looks long but for conferences and learnings, it's too short. Commendable are they for being strict with time (because most of them are not Filipinos, *wink* if you know what I mean *wink*). The talks do not exceed the allotted time. The talks are however, lacking in time for the subject or topic they present. This may be subjective perhaps to the topics which I am interested in.

I have not included other sessions/talks because I have no stark thing to commend or criticize.

---

## RDBMS to NoSQL

This should be one of the main topics because in the Philippines, part of the database subject in college/university curriculum is RDBMS. How we innately design database schemas is with normalization in mind as second nature. I know that one of the purpose of the event is to get people to try NoSQL that will result in more customers opting for the premium plans so breaking this barrier would have been wiser?

These were briefly discussed but not objectively presented, again, because of the short time (30 minutes only!)

### Denormalized schema

The example of RDBMS vs NoSQL schema was somewhat dishonest for me because I do not see or know of any RDBMS schema for products (book, movie, cloth, etc.) that follow that kind of tagged union schema.

### Performance vs Cost

I am somewhat convinced that storage is far cheaper than processing power so it makes more sense to compromise on that cost with duplicated/embedded data that NoSQL encourages. But, agian, lacking with practical and concrete data. I was expecting something like:

- RDBMS with 5 tables with 1 million rows each = What's the speed for querying all with joins and its processing cost. What's the size in storage and its cost.
- NoSQL with 2 or 3 collections with 1 million documents each = What's the speed for querying all with lookup and its processing cost. What's the size in storage and its cost.

---

## AI

*sigh* Expected of course *sigh*. I am both excited and afraid at the pace we are going with this AI/ML revolution but somehow, eerily, this is looking like the craptocurrency bubble recently. I do know that businesses and companies have to get on this AI/ML thing because of investors and the future market but it's becoming redundant.

### MongoDB Generative AI Application Stack

The title is misleading in a very good way. What I really liked and consider to be the "better way" to teach, discuss, and present AI technology is what happened with this session. This session talked about foundational, deeper, more technical, and more practical way on building and developing AI with MongoDB not as the focused, but presented as a good investment for storage and bridge for the different components needed for an AI software. I would like to talk more about this but I failed to take notes because I was "in the zone" listening with this session. Kudos to the speaker!

I have learned more about AI with this 30 minutes session compared to the numerous hours from SoftCon 2024.


### AWS: Accelerate Building GenAI Applications with AWS

This one is okay-ish for me, maybe because the bar has been set too high by the previous point...

Anyway, AWS is one of the sponsors of this event so shoutout to AWS for supporting what I consider to be minor competition because AWS has their own NoSQL storage and AI/ML services as well.

I do like the system architecture design. *This is how you SHOULD do a proper and understandable architecture diagram!*.
I can not stress this enough, please do not pollute the whole architecture with hundreds of services and components. You are building a working and functioning house, not a whole country.

---

### Customer Sessions

This is another way of acquiring new clients and customers. Let the testimonies of your current users do the talking and convincing.

Security Bank and ABS-CBN were those two out of the many customers in the country that spoke in the event.

First of all, the Security Bank showed promising changes and improvements with their system as they showed how MongoDB helped them.

I can not say the same for ABS-CBN, the short portion that showed MongoDB in their system is a short and confusing moment. Maybe the elements in the diagram they made is incorrect or not checked properly because it showed a terrible technical use of MongoDB and it does not highlight MongoDB. I will not go on with more details because I am also very confused on the design...


---

### Beyond the Search Bar

This one is interesting because this is more technical and developer-friendly session as it shows code snippets on how to do pagination, filtering, and sorting the traditional way and the Atlas Search feature. However, just one thing to criticize of future improvement, please lessen the indentation of the code shown on the screen.

The slides were divided into two. Right half is for showing the result or keypoints. Left half is showing code snippet. The left half already does word wrapping (meaning line is too liong) on just the 2 level of nesting.

Imagine this (I hope my website shows the code properly and as I intended though):

```javascript
db.Query({
			"$find": {
						"id": "test",
			}
})
```

So much waste of space!

---

### MongoDB Performance: Patterns and Best Practices

This one is what I am looking and waiting out for ever since I saw the agenda. As a programmer with performance and optimization at my heart and soul, I am satisfied with the points given on this session. I think the only thing I would ask for future sessions like this is to show and be more technical since these things are done at the low-level by low-level people.

---


All in all the whole event is worthwhile and commendable. Looking forward to next year's MongoDB Day Manila!
