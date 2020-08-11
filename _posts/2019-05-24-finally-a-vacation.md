---
title: "Finally! A Vacation!"
date: 2019-05-24
description: "more of a rant about my university"
tags: [personal]
---

This school year's second semester is now finally over! All the exams are finished as well as the projects. Honestly, this semester is very exhausting to say the least.

This blog post will tackle a lot of topics including something that I would be criticized about.

---

# 1. CvSU is lagging behind in technology education.

Let us start this post with something that is perhaps controversial, but I honestly believe that anyone who understands the context will agree.

First of all, I will clarify that CvSU (Cavite State University) is an university more and well known for its agricultural education. So technology is not its forte. But according to records, IT (information technology) course has the highest number of students, it should be trivial to improve on this aspect for a university, no?

Secondly, I do not intend to bash or discriminate, let alone defame, the university to which I am indebted to. I pray that this will shed light for improvements and actions. Take it as a constructive criticism I daresay.

I think I have made established some common ground for all readers to consider.

## Softwares used are outdated

### TASM

I will start with the tool I am really mad about with this recent semester, [TASM](https://en.wikipedia.org/wiki/Turbo_Assembler) (Turbo Assembler by Borland) was implicitly enforced for our Assembly course. Yes, the tool does not have anything to do with the application of knowledge and in learning. But seriously, teach students assembly using a very old, unsupported, and unmaintained software is not ideal (even the main website is archived). This goes with that students in the university is taught to master tools, not the knowledge.

Personally, one thing that really ruined my interest in assembly, particularly the course offered by the university, is that since I am a Linux user, I have to use [Wine](https://www.winehq.org/) to "emulate" dosbox to emulate TASM. There are modern alternatives which are not that difficult to install and learn like NASM and Notepad++. I strongly recommend to learn assembly with just a simple text editor, even plain old Notepad is enough!

What happened:

> Learn ancient technology, get ancient job.

What should happen:

> Learn ancient knowledge, get dream job.

Believe me, what I learned from the assembly course is not usable to any career or job. Here is my final saying for this matter:

> Teach me how to code and I will program different softwares. Teach me a code snippet and I will program the same software again and again.

### TurboC/TurboC++

This one is also very old software, also made by Borland. [TurboC](https://en.wikipedia.org/wiki/Borland_Turbo_C)/[TurboC++](https://en.wikipedia.org/wiki/Turbo_C%2B%2B) (I am not even sure which one we used) is also emulated using dosbox, which again hurts my Linux-y heart.

Unlike with the case of using TASM, I am not personally affected by this. Because we only used this software for our Data Structure course and only on the machines at the laboratory. For projects and homeworks, we are allowed to use any tool to our likings. I personally used vim and clang as for the compiler. This is what I mean by teach students the knowledge, not enforce the tools.

But still, just a text editor like Notepad or Notepad++ or Sublime Text + compiling and linking using the command line is more proficient and beneficial.

__(P.S - Compiling + Linking manually is taught but a little during the first year under the Programming I course, but of course got forgotten because of the Programming II course which teaches Java and the tool NetBeans, you know that IDE with a single click to build and run your project (I am speaking in behalf of other students))__

For the Data Structure course, I have improved my C/C++ knowledge exponentially. You can see my projects:

1. [Grading System (terminal)](https://github.com/flamendless/CPP-Project-GradingSystem)
2. [Quicksort Visualization (GUI)](https://github.com/flamendless/CPP-Project-Quicksort-Visualization)

I have also learned SFML, different build system, and a lot more! Great!

### Ubuntu LTS

I am always excited during the laboratory class of our Database Management System course because the machines there use Linux -- Ubuntu LTS. The joy of using Linux melts my heart everytime.

A little bit of background, I have learned and migrated to using Linux four to five years ago. The very first distribution I have used is of course, Ubuntu 16.04 LTS or something. Take note of the year passed.

Now, in 2019, the machines there run on Ubuntu 14.04 or 14.10 LTS.

Do I still need to explain this?

Oh well, Ubuntu 14.04 was released way back on 2011. The latest LTS is Ubuntu 18.04 which was released on 2018. So in the span of all those years, never did they bother to upgrade the OS.

It is free.

It is very simple, it is only around four steps according to [this site](https://www.howtoforge.com/tutorial/ubuntu-lts-update-dist-upgrade/).

No internet you say? Just download the .ISO file which is around 1.4 GB, install to a flashdrive, easier and takes shorter amount of time compared to Windows.

---

# 2. Database (MySQL) + C++ is the best project!

If you know me personally, you know that I am interested in many things like game development, software development, and more programming related stuff. Web development and networking are not one those. I really do not like how HTML looks with all those tags. I do not like CSS. I hate PHP.

Since I do not like those, it is safe to assume that I will not also like database since it is tied to those.

Oh boy, we were wrong.

After developing [Journary](https://github.com/flamendless/journary) which uses C++ and the DearImGui + SFML, I found it difficult at first to integrate querying a database and using the results so much that I have to rewrite the whole project.

Initially, I wrote Journary to use simple std::vector and array to store locally objects and data I needed. But implementing querying and building objects from data fetched from the database requires more planning. So I have to do rewrite it, which leads to the project being ugly and not the status I have planned it to be because I have to rush it to meet the deadline, and also I crammed a lot so there is that.

It is quite a disappointment for me to submit a project like that. But implementing database to a software opened my eyes and taught me a different way, or a paradigm I guess, which is the focal point of studying and learning, for me at least.

Multiplayer game development skill acquired!

---

# 3. Writing a lot of C++ projects changed me...

Are you a programmer? Did you learn a dynamic-typed language first?

Let me answer the latter question, yes, I first learned Game Maker Language and then Lua. Lua is still my favourite language because it is so simple and I understand it wholly. I love Lua with all its flaws and limitations.

Then came C++, I still love Lua, but I desire to write in C++ now. The compilation stage lessens the errors and bugs, the type, the compiler directives, the definitions, even the terribleness of it I want to embrace fully.

It is a pain to write a build system.

It is a pain to wait for compilation and linking to test the program.

It is a pain because I only know like the simplest and most basic usage of C++.

Oh well, let us see where this path will take me.

Oh, I still love Lua. I still löve lua.

---

# 4. I can now continue with Game Development

I have now a lot of free time since it is vacation, that means I have a lot of time to continue game projects like [Purrr](https://github.com/flamendless/Purrr), [Going Home Revisited](https://github.com/flamendless/GoingHomeRevisited), and **Remembering Home**.

But, it is not only time which I face against. There are also:

* The desire to write my own game framework
* Continue my event-handler lua library
* ECS tutorial (powered by [Concord](https://github.com/Tjakka5/Concord))
* Also the video tutorial of Going Home Revisited which is very time consuming though not production-quality.
* Laziness

But I promise to finish Purrr this vacation!
