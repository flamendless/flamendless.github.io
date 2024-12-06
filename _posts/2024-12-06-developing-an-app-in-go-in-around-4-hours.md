---
title: "Developing an app in Go in around 4 hours"
description: "My experiences with using Go"
date: 2024-12-06
tags: [go, golang, tailwind, web, quiz, church]
---

# Sample Demo

Here is the website hosted [online](https://flamendless.xyz/youth-summit-2024-quiz/)

---

# Short Story

We were about to have our annual [Youth Summit](https://www.facebook.com/share/p/18BjDVhG2r/) event for the tech committee in our church.

The theme is "Karerun" (in English it's a word play for "career" and "run").

I was tasked with leading the Bible Quiz. I planned to make it interesting by integrating the theme in the mechanics as well as the usual track and field terminologies.

Basically, I set to create questions for A to Z (26) with each letter with up to 3 types of questions.

1. Sprint: easy
2. Marathon: medium
3. Hurdle: hard

You can check the mechanics, as well as all the questions and answers in markdown format written in [Obsidian](https://github.com/flamendless/youth-summit-quiz-2024/blob/master/data/questions.md).

After making the questions, it was time to create the visuals because it will be projected for everyone to see.

The typical approach would be to make it in slides like PowerPoint or look for an online quiz maker app...

But as a programmer, I do not really want to work on it using the mouse a lot. Also, I decided to challenge myself and to prove how easy and faster it is to use Go than, let's say, Python or Javascript.

Also, as a programmer, I was ~~cramming~~ busy with other project(s) that it took the night before the event to complete it. Anyone can relate?

---

# Stack, Tech Stack:

1. [Go](http://go.dev/) - includes router. I wish I have used [Chi](https://go-chi.io) instead.
2. [Tailwind](https://tailwindcss.com) - For styling.
3. [Templ](https://templ.guide) - Serverside rendering and templating.
4. [HTMX](https://htmx.org) - Actually not used YET because of the small and simple scope but will be utilized on further enhancements and features of the quiz app.

For the third-party libraries with Go, you can easily check the `go.mod`.

If you will look at the codebase, you will notice that it is not good because it was actually stripped from my other [project](https://github.com/flamendless/cchoice) which I am developing while learning Go, SSR, GRPC, HTMX, and more.

---

# Structure of the Project

Here is the project structure when running `exa -T -L 2 -I tmp .`

```
├── client
│  ├── components
│  ├── handlers
│  ├── middlewares
│  ├── server.go
│  └── static
├── cmd
│  ├── root.go
│  └── serve_client.go
├── data
│  └── questions.md
├── go.mod
├── go.sum
├── internal
│  ├── constants
│  ├── ctx
│  ├── logs
│  ├── models
│  └── utils
├── main.go
├── run.sh
└── tailwind.config.js
```
---

# Strengths

The fact that I already envisioned the quiz to follow a finite design and template makes it more doable and practical.

I would like to insert that the statically-typed nature of Go helped a lot; the compiler and tooling (LSP) are so fast that the developer <-> test feedback loop is a breeze...

Now imagine if I were to use Rust, 3 hours spent only on recompiling.

Now imagine if I were to use Javascript/Typescript, 3 hours spent only on setting up the dependencies, bundler, and so on.

Now imagine if I were to use Python, 3 hours spent only on probably chasing bugs and developer mistakes.

Now imagine if I were to use X, 3 hours spent on Y and Z.

I'm not saying Go is perfect, but it is too good and almost as perfect for me.

This part of the Go ecosystem is personally experienced and proven to be better than working with Node and Python.

- Reusability. Easy setup of a new project from just copy-pasting files from another.
- Simplicity. Easy setup of a project no need for a virtual environment.
- Standalone. Easy setup of dependencies. No need for third-party package manager like `npm` or `pip`.
- Safe. Easy to bootstrap/configure since you can't run the application until you fix all issues that the compiler reports, which makes it safer and surer.

---

# Struggles

Unsurprisingly, there are only small challenges that I faced, and the majority of it is not really due to Go programming (DEFINITELY DUE TO HTML/CSS).

Most of the time was spent on making the site look good and ready. This means tailwind classes concoction.

I spent some time parsing the questions from the markdown file (terrible approach). I should have just spent time upfront on rewriting the data source to `json` or something using Vim macros or a simple Python script. But at least I sharpened my file parsing and processing skills.

The issue with this is that I have to make deliberate structure to a format that does not really enforce said structure.

Yes, as a person with slight OCD when it comes to symmetry and style conformity in code/file, it is a good thing that I followed and set a simple structure when making the questions and answers, so parsing it was easier.

Still, making changes to the markdown file will require more and unsafe changes to the Go code.

---

# Shortcomings

Here are the limitations since the scopes have to be trimmed down to meet time constraints.

1. No database.
2. No rate limiting (please do not DDOS. I'm using the cheapest Linode instance).
3. No actual input box for entering answers.
4. Not mobile-friendly. Not a CSS media-query expert.
5. Background image is loading per page change. I have yet to implement something like caching for SSR. Tips?
6. No animation. No fancy thing. Very barebone.
7. Quiz without score tracking? What?!

---

# Soon, Improvements

Thought of, nothing final.

1. Of course, rate limiting based on IP?
2. I'm thinking of auth and user profile for tracking scores.
3. Database to support the points above.
4. Mobile-friendly.
5. More optimization!
6. Better data source for questions and answers.
7. HTMX - for better and easier web stuff like saving bandwidth since this is an SSR app.

What do you think? Any suggestion? Reach out in [X](https://twitter.com/flamendless)

Oh, and I will replace `npx` for using `tailwind` with a smaller one because apparently `npx` is also `npm` which, when I deploy it in a `Linode` instance (I will write a blog post about the deployment soon), takes more storage than the whole Go + project.

---

***Soli Deo Gloria***
