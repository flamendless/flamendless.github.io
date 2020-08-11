---
title: "A Last Glance On Yester-Year"
date: 2020-01-01
description: "looking back at year 2019"
tags: [personal]
---

2019 has ended. What a rollercoaster ride!

Let me share my 2019 experience in academical and personal.

# INTRODUCTION

First of all, let me be just apologize for not keeping up with the supposedly monthly schedule of blog posting due to lack of motivation. I may name many reasons that seem to be valid and will do justice for my absence, but of course they are not valid. Bottom line is that I think I have lost that motivation and passion when it comes to programming.

With that said, I am about to clarify that I did a lot of programming work as required academically which I will talk about in this post.

---

# Academics: A Tour On Hell Semester

I can finally claim and prove that this recenter semester is to be considered as not only a hell week, but a hell semester. Multiple major projects that have little to none schedule gap for us to work on. Actually, to be fair, it is very the type of activities expected in college level which is normal and common, but of course, I procrastinate a lot so I bestowed most of the pain and hardship on myself.

Let me start with the first project:

### CMS Website

[CMS](https://kinsta.com/knowledgebase/content-management-system/) (content management system) website was our project for the Advanced Database Management System course. It was really awesome and fair to say that I enjoy querying databases with MySQL. The project is a breeze, that was my assumption as I have already thought of the whole plan in my mind the moment the project was announced. The thing is, I did not consider the terribleness of PHP and JavaScript.

PHP and Javascript are such terrible languages. HTML is also a terrible markup language (TAKE THAT YOU PEOPLE WHO CLAIM THAT HTML IS A PROGRAMMING LANGUAGE!). A project that could have been finished in two weeks turned out to be much worse and longer, not because of the scope of the project, but because of the design of the languages. Seriously, it took more debugging work.

I was supposed to write a separate blog post about PHP, but I have deleted it because why bother ranting about a piece of crappy language when you can just search ["why php sucks"](https://duckduckgo.com/?q=why+php+sucks&atb=v138-3__&ia=web) and duckduckgo will give you so many links that you will throw up upon reading a couple of rants.

JavaScript? Ugh! I hate JavaScript so much that I do not want any involvement with frontend development. Seriously, if any of you publish a JS plugin or library, please do not just say `npm install xxxxxx`. I do not want to use any package manager. Yes, it is a common practice to use NPM as the defacto standard when it comes to web development, but there are still some of us who do not really want to use NPM. Please, include a simple snippet or instruction in the README of your plugin's repository how to include it withot any package manager!

Also, who thought that `"1" == 1` is `true`? Who designed that? That is absolutely a crap logic for a programming language! Okay, I am gonna stop now with the whole JS rant. I just threw up.

Final note on this sub-topic, my gratitute towards the [Vanilla Framework](https://vanillaframework.io) for making such a simple web framework! Oh, and here is the repository of the CMS project [BlogZone](https:://github.com/flamendless/BlogZone).

### Batch Files

Ah, Batch files (.bat). The once heralded hacking tool. I miss the good old days I run batch scripts in my Windows XP desktop machine. There are flaws with this language, but considering that is very old and that PowerShell replaced it, I will no more rant about it.

Let me just say that, it is very powerful for Windows OS, but is very limiting as a language.

Moving on...

### 3D Graphics

The 3D modeling and animation video project for the Computer Graphics course gave me three days of poor sleep. But hey, thanks to that, I learned how to use Blender! This is the most challenging project I daresay, yet it is very satisfying in the end.

I want to say that, props to Blender 2.79 for giving me hope. The project required us to only use Google SketchUp, but since my personal laptop is purely running Linux, safe to say that I got my very kind professor's consideration and mercy to let me use Blender in the condition that the 3D files must be import-able to Google SketchUp. I was about to lose hope when I first tried Blender 2.8, it run on my laptop but it was very sluggish and making a project in it is just not feasible. Then came Blender 2.79! It perfectly works on my machine. Very stable and fast!

Let me just ask this, how come a much more complicated 3D modeling software can be opened within 2 seconds compared to Google Chrome which takes about 17 seconds on my old machine. Of course I know the reason, Blender is written in C/C++! Hooray for native code! Boo for Electron!

This is why programmers should be taught with hardware performance in mind. *cough* Java sucks *cough*

Oh, watch my 3D video [here](https://www.youtube.com/watch?v=7hwespbuzTI)

(P.S, it is kind of cool when my project was a reminiscing of my Resident Evil passion when the announcement for Resident Evil 3 Remake came out)

### Systems Development and Design

You know, I am a programmer by heart, making documentation is really not my forte. *sob* *sob* This is the other most hellish project.

The topic given to us was "Pre-Registration System". If we were given a choice, to develop a system or to document the whole system, I would happily choose the first one. Documentation is really hard.

At the very least, I have learned a lot about planning and designing a system, properly.

That is the only thing I can rant about this course.

---

# Personal: From Heaven to Earth

### Twitter?

~~Oh, yeah, I have deleted my Twitter account by the way. Why? It is very toxic now. I created it for game development news and feeds, but even then it is full of politics and unnecessary stuff. To all my Twitter followers, sorry. Perhaps when I successfully made another game that will be famous, I may create one again. Who knows.~~

### flamengine / flamwork

Over the past year, I failed multiple times on making my own game framework/engine called `flamegine` (or `flamwork` if it is a pure framework). The `flamengine` went over numerous iterations and complete rewrite.

First, I tried making one using Löve and DearImGui, it was promising and almost in beta, but the fact that it is written in Lua and löve itself to output another löve project is kind of confusing for me design-wise. I am not a good planner when it comes to development during that time. I lived by the rule "Live, Think, Code, Rewrite, Optimize".

Since the first version of the flamengine was written alongside my other secret game, it was hard to decouple the engine from the game, so I have started rewriting it as another separate project. Again, it was limiting as I can only use löve native capabilities and features, that is a problem when it comes to filesystems (i.e, can not write files in other folders outside the project).

So, I rewrite again the engine using C/C++ this time. I have a fair share of experiences with C/C++ with previous school projects so I am competent with what knowledge I have with the language (that is evolving to a poor and badly designed modern language). But since I was in C/C++ environment, I thought "hey, why not use SFML or SDL?", which is at first a good idea, but then again, I was bad with desigin and solid plan during that time so I faced the "decoupling" problem again.

Finally, November of 2019, I rewrite again the flamengine, this time it may seems like a weird design but my plan is to write an engine using C/C++ (C11) and DearImGui that outputs a completely separate löve project. Weird, right?

Why is it a terrible idea? Well, because instead of using löve's C++ codebase to interact with the engine to make a game, I am purely going to output (write) .lua files and run that with löve.

But, here is my valid case for that terrible design, I can completely decouple the engine with the game. That is it.

Another thing, I was tempted to use another language instead of C/C++ as it is becoming too modern-y and bloated with features and new syntax that is very complicated. I was tempted to use Haxe or Rust.

Considering my dangerous perfection mentality when it comes to code, I may rewrite it again. Who knows?

(P.S. more info about the flamengine will come in later when I made more progress in it)

### Achievements?

Another thing that came out good about this semester is that I have learned C# within a day for a contest in University of Makati. The contest my friend I have participated is "DOT NET PROGRAMMING". Knowing me, you will think that I will hate C# because it looks awfully very similar to Java. I do not feel the same hate for C# though. Weird.

Anyways, we won 2nd place in that category consist of around 20 other universities. Safe to say, a day of studying a completely new language for me paid off good.

Oh, let me just give you an idea about the contest. You know how easy it is to code with an IDE? Well, the only thing allowed to use is

NOTE - wait for it because it is going to be legen - wait for it again - dary! - PAD! (I hope you get the reference)

Yes, Notepad and CMD only. I was really relying on intellisense for most of the methods. Yes, it was my fault to not read the contest guideline.

Does this mean I am going to use C# now for my projects? Nope. Not today, Microsoft!

Here are the questions and solutions I have made post-contest. [Source](https://github.com/flamendless/ITOlympics2019-CSharp). Try solving the following using only Notepad and your pure knowledge with C#.

---

Another achievement to brag, I started playing Mobile Legends, I have made it to Mythic Rank within my very first season. Cheers.

---
---

There you go. I hope you enjoyed reading this lenghty post. I will try my best to make more post for this year. More devblogs I guess? Anyways, stay tune!
