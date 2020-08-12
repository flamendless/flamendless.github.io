---
title: "Lua Coding Style Guide"
description: "my preferred style guide for Lua development"
date: 2020-08-12
tags: [gamedev, personal, love, lua]
---

# Introduction

> Why Lua?

First of all, Lua is my favourite language, think of it as my PhD language.

> Why does one need a coding style guide?

The answer to that inquiry is very simple, it is for sanity. Well, atleast for me that is.

We are all aware, assuming you are a programmer as well dear reader, that whatever the case might be
every code we write with whatever perfection in style we do it with, it will all be translated/compiled
to a bunch of zeroes and ones. The computer does not appreciate the effort we put into beautifying our
codebase, but other fellow human beings will.

> But I am the only programmer, no one will see the code.

I hear you, again the purpose is for your sanity. Time will pass and so is your memory in a certain
degree. Maybe there will come a need to look back at the code you wrote many years ago to fix update it
or to fix issues and bug and so on. You have improved, right? The difference between those times probably
have resulted in your learning and growth as a developer. You realized that, *"Oh, I could have wrote this
like this instead of that"*, which is common in our field. You will probably feel disgusted at your past
self for writing a bunch of nonsensical code that even you, the original author, fail to understand and
comprehend right now.

> But coding style does not reflect to the algorithm and data structure of your code

Well, who said that coding style guide will make your code more efficient and perform better?
Certainly putting space betweem mathematical operations will not affect it, but you know what gets
affected? Your life. To be more specific, your time and mind. The nicer your codebase looks, the
easier it will be to navigate around the project and different files, it also helps your mind to
quickly recognize and understand a snippet of code you are currently looking at. The psychology behind
my point is not to be discussed in this post.

Just trust me on this one.

> Alright, I put my trust in you.

Learn from others, evaluate what makes you comfortable, review what pleases your eyes.

So for that, I propose to you, make your own coding style, stick to it, put it into your brain and heart.

Nothing beats a programmer who codes with elegance like how a musician gracefully play the instrument.

#### Warning

If you use spaces for indentation, please, just please, why?!

---
<center>
	<u><h1>LET US BEGIN!</h1></u>
</center>

**Alphabetical list:**
* [Anonymous Function](#anonymous-function)
* [Code Blocks](#code-blocks)
* [Conditionals](#conditionals)
* [File Structure](#file-structure)
* [Functions/Methods](#functionsmethods)
* [Iterators](#iterators)
* [Module vs. Class Structure](#module-vs-class-structure)
* [Operations](#operations)
* [Project Structure](#project-structure)
* [Requiring](#requiring)
* [Returning](#returning)
* [Table Access or Reference](#table-access-or-reference)
* [Table Declaration](#table-declaration)
* [Variable Declaration](#variable-declaration)
* [Variables and Filenames Notation](#variables-and-filenames-notation)

---

### Variables and Filenames Notation

* Avoid global variables as much as possible, but if you really want/need to, use all uppercase
* `CamelCase` notation for module/library/source files you require, this include classes
* `snake_case` notation for local variables and filenames
* All uppercase for constant variables
	```lua
	GLOBAL_VAR = "hello" --please avoid globals as much as possible
	local Library = require("my_library")
	local MyClass = {}
	local filename = "my_library_file_name"
	local PI = 3.4
	local foo = 1
	local foo_bar = 2
	```
---

### Requiring

* localise it for every file
* use the `.` operator as path separator instead of `/`
* use `CamelCase` notation
	```lua
	local Vector2 = require("modules.vector2")
	local State = require("src.state")

	--foo.lua
	local Foo = {}

	Foo.test = "I'm good and safe"
	local im_only_available_in_foo = true

	im_a_global = 1 --BOOOOOOOO!!!!!!! Get out of here!

	return Foo
	```
---

### Module vs. Class Structure

* use the `.` operator for modules
* use the `:` operator for classes
* both module and class should be file-scoped and free of dependencies as much as possible,
meaning every thing inside the module/class file should be inside a table or local (again, no globals!)
	```lua
	--module
	local MyModule = {
		value = 1
	}

	function MyModule.load()
		print(MyModule.value)
	end

	return MyModule

	--class
	local MyClass = {
		value = 1
	}

	function MyClass:load()
		print(self.value)
	end

	return MyClass
	```
---

## Functions/Methods

* local functions follow the format `local function <name>()` instead of `local <name> = function()`
* class methods - use `CamelCase` notation for class (see previous discussion) and `snake_case` notation for method.
* modules use the `.` operator for methods, only use `:` for classes.
	```lua
	local function sum(a, b) end
	function State:load(id, some_arg) end
	function State:do_something() end
	function Vec2.new() end
	```
---

## Anonymous Function

* passing an anonymouse function (usually as a callback) follows this format:
	* the `function` syntax should be in the same line as the function caller
	unless it has too many preceeding parameters in which case in a newline is OK.
	* the `end` syntax must match the indentation of the caller
		```lua
		function on_click(id, on_complete)
			if id == 1 then
				on_complete()
			end
		end

		--usage
		on_click(1, function()
			print("yes")
		end)
		```

---

## Returning

* prefer returning a variable (exemption is if returning explicit boolean)
	```lua
	function test(x, y, w, h)
		--instead of
		return (x < w) and (y < h)

		--prefer this
		local result = (x < w) and (y < h)

		return result

		--exemption
		--this is OK, no need to store in a variable
		return true --or false
	end
	```
* returning multiple values are separated properly, also use the previous point
	```lua
	local a = 1
	local b = a + 1 + 2
	local c = a + b + 3

	return a, b, c
	```
* if returning multiple table or data, prefer returning a table (only if all returned values
are needed)
	```lua
	--this is OK
	function read(string)
		local exists, content = read_file(string)

		return exists, content
	end

	function factory(id, id2, id3, id4, id5)
		local player = create_from_id(id)
		local enemy = create_from_id(id2)
		local wall = create_from_id(id3)
		local ground = create_from_id(id4)
		local bg = create_from_id(id5)

		--instead of this
		return player, enemy, wall, ground, bg

		--prefer this
		return {
			player = player,
			enemy = enemy,
			wall = wall,
			ground = ground,
			bg = bg
		}
	end
	```
---

## Operations

* assignment operator `=` must have spaces around it
* `+`, `-`, and `*` must have spaces around them
* For other operators like the `concat` operator which in Lua is `..`, we also put spaces around it
	```lua
	local sum = 1 + 1 --2
	local difference = 10 - 4 --6
	local product = 2 * 10 --20
	local quotient = 100/5 --20
	local hello_world = "hello " .. "world"
	```
---

## Variable Declaration

* when a local variable is declared without value, no need to assign it with `nil`
* when a variable inside a table or class, it should have the `nil` value
* multiple variables with `nil` as initial value is OK to be on the same line
* when declaring variable(s), always separate it from usage
	```lua
	--declaration
	local my_table = {
		a = 1,
		b = nil,
		c = 2
	}
	local no_value
	local i_am_nil, me_too, i_too
	local a = 1
	local b = 2
	local c = 3

	--usage
	print(a + b + c)
	print(a - b - c)
	print(a * b * c)
	```
---

## Table Declaration

* tables with few elements (especially for index-table) can be written in a single line
* tables that behaves as a dictionary (called key-pair table) must always be separated with newline.
	```lua
	local i_table = {1, 2, 3, 4, "hello", "world"}

	local kv_table = {
		a = 1,
		b = 2,
		str = "hello",
		hey = "world",
	}
	```

---

## Iterators

* using `ipairs()`, if index is not needed, use `_` variable name.
* using `pairs()`, make the `k`, `v` variables with sensical names (especially if deep
within a function or if it is nested)
	```lua
	--using the tables we have in the previous point
	for i, v in ipairs(i_table) do
		--here we need the i
		print(i .. " = " .. v)
	end

	for _, v in ipairs(i_table) do
		--here we do not need the i
		print(v)
	end

	for k, v in pairs(kv_table) do
		--here we need both k and v
		--also this is a single loop
		print(k .. " = " .. v)
	end

	local logs = {
		byron = {"what's up", "hello", "hi"},
		brandon = {"okay", "yes", "no"},
		angel = {"apple", "orange", "grapes"},
		ralyn = {"neo", "kezia"},
	}

	--here we need the user_id, also it makes sense and is easier to see what
	--the variables are and their purpose especially in nested loops
	for name, messages in ipairs(logs) do
		for _, message in ipairs(messages) do
			print(name .. ": " .. message)
		end
	end
	```

---

## Table Access or Reference

* if a table value/property is going to be accessed multiple times within a code block, it is better
to localised it within that code block
	```lua
	local my_table = {
		position = {x = 1, y = 2, z = 3}
	}

	--instead of this
	function foo()
		print(my_table.position.x)
		print(my_table.position.y)
		print(my_table.position.z)
	end

	--do this
	function bar()
		local pos = my_table.position

		print(pos.x)
		print(pos.y)
		print(pos.z)
	end
	```

---

## Conditionals

* prefer `not (variable == value)` than `variable ~= value`.
	```lua
	local a = 0

	if a ~= 0 then end --not this

	if not (a == 0) then end --prefer this

	if not a then end --be careful of this, this is very different case
	```
* if checking if a variable is boolean value
	```lua
	--instead of these:
	if correct == true then end

	if correct == false then end

	--prefer these:
	if correct then end

	if not correct then end
	```
* use `()` to group expressions for compound conditions
* prefer using of variable rather than putting long expressions in conditionals
	```lua
	local a = 1
	local result = (type(a) == "number") and (a > 0) and (a < 10)

	if result then
		print("correct!")
	end
	```

---

## Code Blocks

* function definitions should always have a newline before and after it.
	```lua
	local nothing

	function foo()
	end

	function bar()
	end
	```
* single line block of conditionals is encouraged to be in single line.
	```lua
	function foo() return 1 end

	function bar(id)
		if not id then return end

		print(id)
	end
	```
* returning a value from a function is encouraged to be separated as it is
the last (usually) line
	```lua
	--this is a stupid function I know, just for showcasing an example.
	function foo(a, b)
		if a == 1 then
			if b == 1 then
				local c = a + b

				return c
			end
			--still a newline after a conditional block
			return 0
		end
	end
	```
* conditionals statements should always have a newline before and after it.
	```lua
	local a = 10

	if a > 0 then
		print("a is positive")
	elseif a < 0 then
		print("a is negative")
	else
		print("a is zero")
	end

	print("value of a is: " .. a)
	```
* for nested conditionals like a double `for-loop` we can skip the newline before
	```lua
	local a = {1, 2, 3}
	local b = {4, 5, 6}

	for i = 1, #a do
		for j = 1, #b do
			local sum = a[i] + b[j]

			print(sum)
		end
	end
	```

---

### File Structure

* in order of priority:
	* globals (if you really want to)
	* modules
	* source files
	* localisation of standard libraries
	* local variables
	* callbacks/functions/methods

```lua
--globals
IS_DEV_MODE = true

--modules
local Class = require("modules.class.class")
local Timer = require("modules.timer.timer")
local Vec2 = require("modules.vec2.vec2")

--source files
local Color = require("src.color")
local Utils = require("src.utils")

--local standard librarie
local insert = table.insert
local floor = math.floor
local format = string.format

--local variables
local id = "game"
local version = "0.0.1"

--callbacks etc etc
function love.load() end

function love.update(dt) end

function love.draw() end
```

---

### Project Structure

* for game development using the [love framework](https://love2d.org)
	```
	--game/
	--------modules/
	------------timer/
	------------vec2/
	--------res/
	------------images/
	------------music/
	------------sfx/
	------------ui/
	--------src/
	------------classes/
	------------states/
	--------main.lua
	--------conf.lua
	```
* for projects that uses preprocessing like [luapreprocessor](https://github.com/ReFreezed/LuaPreprocess)
	```
	--game/
	--------modules/
	------------timer/
	------------vec2/
	--------res/
	------------images/
	------------music/
	------------sfx/
	------------ui/
	--------libs/
	------------x64
	------------x86
	------------luapreprocess
	--------src/
	------------components/
	------------systems/
	------------world/
	--------output/
	--------build.sh
	```
* `res` or `resources` contains assets like images, sounds, spritesheets
* `modules` for third-party modules
* `src` or `sources` contains files more-specific to your project/game
* `libs` containing libraries (.dll, .so)
* `output` where preprocessed files will be outputted
* `build.sh` example script you will use to automate building and running your project

---

# Closing

I do hope that you learned from my preference and style. But ofcourse, you are free
to make your own coding style guide, perhaps read other people's coding style guide as
well and then combine the bits that you like.

Stay tuned via RSS or follow me on
<a href="https://twitter.com/{{site.author.twitter}}">Twitter</a>
as this will get updated more over time!
