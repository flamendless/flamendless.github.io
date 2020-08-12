---
title: "DevBlog #1 : Introduction to Lua Preprocessing"
date: 2019-06-11
description: "using LuaPreprocess for game development"
tags: [gamedev, tutorial]
---

# OVERVIEW

(Project in discussion: [Purrr](https://github.com/flamendless/Purrr))

This blog post will talk about the following:

* Why I am restructuring/refactoring my project
* Using [Luapreprocess](https://github.com/ReFreezed/LuaPreprocess/) + a build system

---

# 1. Why restructure/refactor?

A little bit of background to set the context, this game was supposed to be a submission for a local mobile technology contest. It was a struggle back then because of the schedule. I only have around a month to do everything because of school. Also, because I am me, I did the least practical and efficient way during the development of the game (I ended up not submitting one because it is unfinished), which are:

## A. Learn and apply the ECS paradigm instead of the usual and familiar OOP paradigm.

With new knowledge and my desire to apply it, I have to learn and use new tools and libraries for the project. Gladly, there is a very good ECS library called [Concord](https://github.com/Tjakka5/Concord) for [löve](https://love2d.org).

Moving to a new programming paradigm is like moving to a new house, there are things I need to bring with me, as well as things I must not bring with me (trash). Also, the fact that everyone who is aware and familiar of the ECS paradigm disagree with one another. Users over at the discord server have varying beliefs about ECS, so when I ask a question there, I get different answers (then they start a flame war).

And since I am learning, I am also committing mistakes and errors that require me to refactor a lot of codes during development time. That happened very often.

## B. The framework I use is not *that* on the Android side.

Yes, many will argue that the framework I use is poor and trashy and not suited for big games. Though it supports many platforms like any other game engine/framework there, developing and testing is not just a single click of a button. Compared to Godot or Unity which have a great support for mobile platforms, löve is not like such. I remember the inefficient and time wasting process I did for [Going Home](https://gamejolt.com/games/goinghome/237280) when I was supporting it for the Android platform:

* Make changes to code.
* Zip the project as a .love file
* Copy the .love file to the love-android-sdl/assets folder
* Build/compile using with android-ndk
* Sign and zipalign the .apk
* Copy to phone
* Install
* Test

Even though I was already using Linux before with knowledge of command lines to make some of the steps above easier, it is still tedious. There are times when I forgot what is the next step because of too long compilation time.

But of course, that was like two years ago, by now I already know more Linux-y stuff such as `Makefile` and `shell scripts` so I have made the process easier.

I have made a Makefile which does all of the above with just a single command: `make android`

I spent like a couple of nights to make such script. If you want to see the script, here you [go](https://github.com/flamendless/Purrr/blob/baa0fa54b0b17b74f7e3f5e1da546f9d061203b9/Makefile)

(P.S., I am refactoring it, I have separated the Makefile for Android deployment to [this one](https://github.com/flamendless/Purrr/blob/restructure/MakefileAndroid))

---

Woah, that is quite the background, now let us continue again with the main point of why I restructure/refactor everything now.

So there were a lot of other projects during the school semester, the main and essential factor that affected it is using C/C++ for three school projects, time and memory, DearImGUI (debugging), and no solid plan.


### C/C++

In C/C++, we use build system to make compilation and linking easier, that means we have to think and plan the structure of the project beforehand. In my case: source codes should be inside a folder called `src`, third-party codes or libraries should be inside another folder called `vendors`, header files should be inside another folder called `includes`, compiled codes should be outputted to another folder called `bin`, executables should be generated to another folder called `exe` or `build`, and so on, you get the idea.

But, it is pleasing to have a clean and nice project structure (more that it appeals to my code OCD).

Another thing I really like about languages like C/C++ that I wish Lua has is the `preprocessor`, it is very powerful. You can just google that, I wont talk about C/C++ preprocessor here for the sake of brevity.

### Time and Memory

I have not looked at the game's code for like six months. That is a very long time indeed. Obviously by now I have acquired a lot of knowledge and skills that I would like to include with my projects, but since I have forgotten what __this__ and __that__ codes do, I have decided to refactor everything like froms scratch, but keeping files like `assets to preload for each state`, `shaders`, `some components`, and such.

To be safe of course (also after learning about git branches), I have created a suitable and appropriate branch called [restructure](https://github.com/flamendless/Purrr/tree/restructure).

### DearImGUI (debugging)

This wonderful tool is so powerful that I am taking the negative edge of it to the heart. Since I can just write very less amount of code to display something fancy and __useful__, I have abused it and have wasted development time on making things I really do not need like `media player`, `image viewer`, `components list`, and more. But hey, at least the project looks fancy and very professional!

The debugging part will be explained along the luapreprocess part.

### No Solid Plan

If you saw the initial game I have pre-released in the playstore, it looks promising and good, but it lacks the main gameplay. Now, I am talking with my friend who is also the artist of the game about what genre and gameplay mechanics to go with now. There were many games that I have played in Android during the hiatus period that inspired me for this game, but with many choices, I can not fully decide. (Maybe that is why I am stuck with making a lot of in-game gui tools which are debatable if useless or just over usefull?)

---

# 2. Using Luapreprocess + a build system

Remember what I have said about how I wish Lua has preprocessor like C/C++? A bad and good news for you. Bad news is that Lua still has no preprocessor. Good news is that Lua is simply very powerful that someone made a library to do provide that preprocessor power!

Yes, I am aware that there are many preprocessor library made for Lua, but none comes close to [ReFreezed's Luapreprocessor library](https://github.com/ReFreezed/LuaPreprocess/)!

And yes, I have utilized such power for my project like a mad scientist.

## Why do you need preprocessor for a scripting language?

Before, I have a single file named `debug.lua` that handles all DearImGUI rendering and more. As I continue to have more and more components, I was bothered by a single file to be that very long.

A mentor over at the Discord server told me that I can put functions in a component (which others refute, because components should not have any logic, just data, or so they claim. I am still in the middle ground, i.e, neutral). So instead of each component's dearimgui logic inside the `debug.lua`, I move the logic to the component's file as a function and just call that function (if that exists) inside the `debug.lua`.

To make things easier to understand, here is an example (in pseudo code):

Initial:
```lua
--src/debug.lua
if (selected entity has transform component) then
	imgui.Text("Transform")
	local new_x, status_x = imgui.SliderInt("x", transform component.pos.x)
	--and so on for each data of a component
end

--to above check for every component we wish to use with dearimgui
```

Now:
```lua
--ecs/components/transform.lua
local Transform = Component(function(e, x, y)
	e.pos = vec2(x or 0, y or 0)
end)

function Transform:debug()
	imgui.Text("Transform")
	local new_x, status_x = imgui.SliderInt("x", transform component.pos.x)
	--and so on for each data of a component
end

--in src.debug.lua
for every components in selected entity do
  component:debug()
end
```

As you can see, it is easier to manage and read the second one.

Now, the problem is, in the `initial` way, since everything is contained in a single file, it is easy for us to remove everything if we are going to release the game with the variable `debug_mode` set to `false`.

This is not the same with the `second` way, technically we could, just have the `debug_mode` as a global variable and do something like this:
```lua
--ecs/components/transform.lua
--stuff

if DEBUG_MODE then
	function Transform:debug()
		--and so
	end
end
```

Which is OKAY. But, I do not want to waste storage, imagine if I have a hundred component files, each with such function, it is not optimized since a function is an additional memory, which defeats the purpose of using ECS. (In my opinion!)

You know what would be nice? To have some preprocessor!

In C/C++, here is how it looks
```cpp
//ecs/components/transform.lua
//stuff

#if DEBUG_MODE
	void Transform::debug()
	{
		--and so
	}
#endif
```

If we set `DEBUG_MODE` to false as a compilation flag, all of the codes inside the `preprocessor block` will be not be processed and thus will save us memory, storage size, and more.

Cool right? Now let us implement the luapreprocessor library to our project!

So the code will now look like:
```lua
--ecs/components/transform.lua
--stuff

!if DEBUG_MODE then
	function Transform:debug()
		--and so
	end
!end
```

That is it! Now when we compile that, you will in the outputted file that if we set `DEBUG_MODE` to false, the `debug` function will not be included in the component!

We can also use luapreprocess to, example, for logging.

For example let us say I have this code before:
```lua
local log
if LOGGING then
	log = require("modules.log.log")
end

--in some function
if log then
	log.trace("Hey!")
end
```

The above code is safe even if we set the `LOGGING` variable to false, but still, the program will do the `if log then` checks which is a waste, a micro-waste perse.

Here is the code after using luapreprocess
```lua
!if LOGGING then
local log = require("modules.log.log")
!end

--in some function
!if LOGGING then
	log.trace("Hey!")
!end
```

The output file will be (LOGGING = false):
```lua
--blank
```

Now, if we turn off the `LOGGING` variable, we will create a `local` variable, we will not `require` a module, and we will not do any `if` checks. Pretty sweet, right! My OCD brain is very pleased.

I do not know how many storage, memory, and process we just saved. Sorry for being a huge conservative when it comes to optimization!

Another thing we could save using preprocessor is if the executable is for desktop version, do not bother using events for mobile version like `touchpressed`, `touchreleased`, `touchmoved`, and so on.

---

This has become a very lengthy post, I will explain how to setup luapreprocessor and use it for your projects (the build system) in the next blog post! Stay tuned!
