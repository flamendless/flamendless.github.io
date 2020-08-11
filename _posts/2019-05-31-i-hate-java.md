---
title: "I Hate Java!"
date: 2019-05-31
description: "why I am proud to be a Java hater"
tags: [personal]
---

# Here we go, again.

By this time you probably know that I am a huge fan of hating Java.

I do not care about the facts that Java people say about how awesome and useful Java is.

Things like:

> Java is the leading programming language used in industry.

Ranking number 1 does not mean anything to me

> Java is high-paying.

10, 000 php a day programming with Java vs. 500 php a day programming with C/C++, Lua, Javascript, etc etc.
No doubt, I will choose the latter!

> Java can run in every platform without hassle.

Very slow. Client needs the big Java installed though.

No. Java sucks. Period.

Yes. It is extreme.

---

# Why do you hate Java this much?

Without any IDE, it is near impossible to program with Java.

IDE (Integrated Development Environment) like Netbeans, Visual Studio, etc etc. are very useful and powerful. They make programmer's life easier to the point that new programmers are very dependent to them. This is strongly the case with Java.

Let me first list down why IDE is useful for languages like Java, C/C++, and C#.

* Refactoring is easy - Since Java, C/C++, and C# are statically-typed languages, changing one data type affects a lot of things. Example, if you rename a file, changing all files that depend and/or refer to it is very easy with an IDE, just select the file, then click __Refactor__ (Ctrl + R usually). Without an IDE, you have to manually go over each of your file and change it there. (NOTE: __Find and Replace All__ is not good since it will also change a variable with the same name (ofcourse) even though it is a different type)
* Hints, warnings, and errors - See those squiggly underlines that are either yellow or red? They are useful especially for beginners in programming since they will tell you a lot of things you should be aware while typing before running the code.
* Intellisense and Autocompletion - If you are going to type the same variable over and over again, why not let the IDE autocomplete it for you? Useful right! Also, have you forgotten what this function needs for its parameters? No problem, IDE got it for you! Do not know or remember what the parameter means? IDE will tell you its description!
* Easy build and run - Who wants to manually compile and run the project using the command line? With just a single click on a button at the top bar, IDE has it for you, no sweat!

There are more, but I wont list all for brevity's sake.

So, IDE is good, can you please relate it to hating Java?

My pleasure.

If you watch the development of Handmade Hero, you know that programming a game (mind you, from scratch!) with the C language, without any IDE telling, hinting, and showing you errors and warnings is possible.

Also, C (not C++) is more barebones than Java. Java has a lot of libraries that are indeed useful compared in C where you have to make those functions/methods yourself.

Doing the same thing with Java is insane!

The Java, along with other stuff like JDK, JRE, and more that I do not bother to look up, is very big in size.

If you are going to develop using Java, you will need an IDE which is also big. Yes, there are lightweight Java IDE, but let us face it, you will still need the big IDE at some point if the project is big.

Also, in a sense, I agree that too much reliance with IDE treats the user like a baby that can not live alone. One of the reasons why I depend on an IDE when I am coding in Java is the __build and run__ button. I mean, there is a reason why there is a flame war between C++ build systems, ever heard of CMake vs. Makefile vs. Premake vs. Mesonbuild? Of course you did! But have you ever heard of Maven vs. Ant vs. Gradle (I assume they are build systems)? No? Oh well.

---

# So what brought this up?

There must be something that occured that made me __*\*ahem\**__ stop in the middle of project __*\*ahem\**__ to make a post about it __*\*ahem\**__.

Yes, I am currently, and should be, finishing this simple and basic Java game project for a client, but instead I switched to writing this blog post out of frustration.

I am using Netbeans as my IDE by the way. Why Netbeans? Because its sole purpose is for Java development. If I am certain that there will be no subject that requires Java as programming language in school, I would quickly remove it. It is not that I hate Netbeans, there is just no more purpose for it anymore on my machine. Also, I am very storage space conscious.

Basically what happened is, Java (Netbeans shows a red warning meaning error), that a `private final` variable __"may not be initialized"__ and thus I can not build and run the project. So I have remove the `final` keyword. Not that much of a big deal you say?

I am many more times certain that *that* variable will be initialized at runtime. Why? Because I am the programmer!

I program to tell the machine what to do, not the other way around!

C/C++ handles this correctly because by logic, the case is runtime error. But with Java, it is compiler error. Again, no sense at all.

I hate Java because it thinks I am a stupid programmer who does not know what I am doing.

> The best way to handle errors is to not have them...

> -Casey Muratori said in once of his streams:

(It would be very long if I am going to discuss this, just watch his [video](https://www.youtube.com/watch?v=gc22dd2qFPg) for better explanations)

I would have accepted it if it is a warning, but it is an error which makes absolutely no sense!

That what triggered this blog post.
