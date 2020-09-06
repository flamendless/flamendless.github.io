---
title: "A Simple OOP Game Tutorial #3"
description: "making a simple game with OOP approach"
date: 2020-09-06
tags: [gamedev, personal, love, lua, ecs, oop, versus, tutorial]
---

> WELCOME TO THE 4th INSTALLMENT OF ECS VS. OOP WEEKLY SERIES!

Before proceeding, if you have not read the [previous post](https://flamendless.github.io/ecs-vs-oop/)
and [previous part](https://flamendless.github.io/oop-tutorial-2/),
please check those first, this post will wait for you. You will
need the information and guide provided in the previous posts
for this one.

Done? Good! You may now resume your quest!

---

# UPDATES

Source code is now available [here](https://github.com/flamendless/ECSvsOOPTutorial)

---

# DISCLAIMER

This post will not try to teach Lua coding or any programming logic. This is to focus
primarily in OOP design and pattern.

If you want to learn basic programming and game development, let me know. I will make
an in-depth guide about it for beginners if requested.

---

# INTRODUCTION

Last time we did a lot of things! Now our simple project is becoming more and more
like an actual game, though very simple. But what is a game without score or achievement?
What is a game if there is no goal or no way to end the game?

Surely we do not want the player to keep playing a session forever, we want some way
to make the player stop like through the concept of virtual death or game over.

But before that, let us add a snippet to the classes we have previously made that will
be used for the scoring, namely, we need to be able to get the shape and color field of
the instance.

We could easily do this just by accessing the field since there is `private` syntax in
Lua, we could implement that but that would be out of scope. So in the spirit of OOP,
we will do this using `getters`.

For `classes/base/shape.lua`:
```lua

function Shape:new(shape_type)
	self.shape_type = shape_type
	self.alive = true
end

function Shape:getShapeType() return self.shape_type end
function Shape:getColor() return self.color end
function Shape:isDestroyed() return self.alive == false end
function Shape:isClicked() return self.is_clicked end
function Shape:destroy()
	self.alive = false
	self.is_clicked = false
end
```

Also for the following subclasses:
```lua
--circle.lua
Circle.super.new(self, "circle") --in the Circle:new

--rectangle.lua
function Rectangle:new(width, height, shape_type)
	Rectangle.super.new(self, shape_type or "rectangle")
end

--square.lua
Square.super.new(self, size, size, "square")
```

---

# Implementing Scoring

Taking a peak at this [post](https://flamendless.github.io/oop-tutorial-1/), we stated
the following for scoring when shapes are destroyed:
* The two clicked objects will be destroyed (a goal) if:
	* the two objects are of the same color (increase timer + 2)
	* the two objects are of the same shape (increase timer + 4)
	* the two objects are of the same shape and same color (increase timer + 8)

In OOP, it will be hard for an instance of a shape to have knowledge or reference about
the other *clicked* instance. So we can not put that logic in the shape class and its
subclasses. If you remember the spawner class which we used as part of the general
gameplay logic, we will also make that logic a sepate class.

Make a new file called `classes/score.lua` and write the following:
```lua
local Class = require("modules.classic")
local Score = Class:extend()

local function compare_color(a, b)
	return a[1] == b[1] and
		a[2] == b[2] and
		a[3] == b[3]
end

function Score:new(color_score, shape_score, both_score)
	self.color_score = color_score
	self.shape_score = shape_score
	self.both_score = both_score
	self.score = 0
end

function Score:update_clicked(obj)
	if self.clicked1 and self.clicked1 ~= obj then
		self.clicked2 = obj
		self:check_score()
	else
		self.clicked1 = obj
	end
end

function Score:check_score()
	if self.clicked1 and self.clicked2 then
		local shape1 = self.clicked1:getShapeType()
		local shape2 = self.clicked2:getShapeType()
		local color1 = self.clicked1:getColor()
		local color2 = self.clicked2:getColor()

		local same_color = false
		local same_shape = false

		if compare_color(color1, color2) then
			self.score = self.score + self.color_score
			same_color = true
		end

		if shape1 == shape2 then
			self.score = self.score + self.shape_score
			same_shape = true
		end

		if same_color and same_shape then
			self.score = self.score + self.both_score
		end

		self.clicked1:destroy()
		self.clicked2:destroy()

		self.clicked1 = nil
		self.clicked2 = nil
	end
end

function Score:draw()
	love.graphics.setColor(1, 0, 0, 1)
	love.graphics.print("Score: " .. self.score, 8, 8)
end

return Score
```

Now let us implement it into our `main.lua` file (I will only show the new lines):
```lua
local Score = require("classes.score")
local score = Score(2, 4, 8)

function love.update(dt)
	for i, obj in ipairs(shapes) do
		if obj:isClicked() then
			score:update_clicked(obj)
		end
	end

	--checking for destroyed shapes
	for i = #shapes, 1, -1 do
		local shape = shapes[i]

		if shape:isDestroyed() then
			table.remove(shapes, i)
		end
	end
end

function love.draw()
	score:draw()
end
```

Now test the game, you should see a score text in the upper left corner of the screen,
that is just a prototype, we will use a proper UI class for that next time.

Clicking on two shapes will yield score, for now there is no feedback to the user about
what just happened, again, we will improve it next time when we add those juicy effects.

---

I am sorry that this week's post is very short! To make up for it, I will add images
to the posts so readers can see what we are building and the progress so far.

---

# Next Week's Post:

For the next post, we will continue to:
* implement the UI classes and subclasses
* implement state classes and gameplay logic

---

Stay tuned via RSS or follow me on
<a href="https://twitter.com/{{site.author.twitter}}">Twitter</a>
