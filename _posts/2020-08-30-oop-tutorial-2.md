---
title: "A Simple OOP Game Tutorial #2"
description: "making a simple game with OOP approach"
date: 2020-08-30
tags: [gamedev, personal, love, lua, ecs, oop, versus, tutorial]
---

> WELCOME TO THE 3RD INSTALLMENT OF ECS VS. OOP WEEKLY SERIES!

Before proceeding, if you have not read the [previous post](https://flamendless.github.io/ecs-vs-oop/)
and [previous part](https://flamendless.github.io/oop-tutorial-1/),
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

So far, we implemented the basic classes, base and subclasses, that we need for the game.
But, to properly see if all that we did is working, let us write a simple test to see
if all the shapes are indeed working.

Write the following so that your `main.lua` file will look like this:
```lua
local Shapes = {
	Rectangle = require("classes.rectangle"),
	Circle = require("classes.circle"),
	Square = require("classes.square"),
}

local rectangle, square, circle

function love.load()
	love.graphics.setBackgroundColor(1, 1, 1, 0.8)

	rectangle = Shapes.Rectangle(128, 64)
	square = Shapes.Square(128)
	circle = Shapes.Circle(96)
end

function love.update(dt)
	rectangle:update(dt)
	square:update(dt)
	circle:update(dt)
end

function love.draw()
	rectangle:draw()
	square:draw()
	circle:draw()
end

function love.keypressed(key)
	if key == "r" then
		love.event.quit("restart")
	end
end
```

With that code, you should see three shapes drawn on screen and they are moving.
Press `r` to restart the game and you should see that they spawn in random place with
random color. Neat!

The above is just for testing the progress so far. You may now safely clean the file again
as we are going to change a lot later on.

---

# Implementing Clicking

It would not be a game if there is no interaction, right? So let us implement `mouseclick`.
In the previous post, we already did the logic for checking for `mousepressed` event, now let
us do the highlighting part.

> Why not implement the method in the base class (shape)?

That is possible and without question an okay thing to do, but my reasoning is that, the
`circle` shape will not inherit that since the algorithm for checking point-to-box is
a little bit different than point-to-circle. So instead of the `circle` shape modifying
the method of the base class, for me that is a waste, implement it directly in the `circle`
shape. The `rectangle` and the `square` classes would share the same method though.

The algorithm for the highlighting is:
* Check if the property `is_clicked` is `true`.
* If `true`, draw another shape behind the original shape with the following property:
	* bigger size
	* offset the position
	* pure black color

This is a quick-and-dirty method to implement a somewhat outline look.

First of all, add this property to `shape.lua`:
```lua
--inside the Shape:new() method
self.outline_color = {0, 0, 0, 1} --black color
self.offset = 4
```

For the `rectangle.lua`:
```lua
function Rectangle:draw()
	if self.is_clicked then
		love.graphics.setColor(self.outline_color)
		love.graphics.rectangle("fill",
			self.x - self.offset,
			self.y - self.offset,
			self.width + self.offset * 2,
			self.height + self.offset * 2)
	end

	love.graphics.setColor(self.color)
	love.graphics.rectangle("fill", self.x, self.y, self.width, self.height)
end
```

For the `circle.lua`:
```lua
function circle:draw()
	if self.is_clicked then
		love.graphics.setcolor(self.outline_color)
		love.graphics.circle("fill",
			self.x, self.y,
			self.radius + self.offset,
			self.radius)
	end

	love.graphics.setcolor(self.color)
	love.graphics.circle("fill", self.x, self.y, self.radius, self.radius)
end
```

To test if it is working, your `main.lua` (testing) should look like this:
```lua
local Shapes = {
	Rectangle = require("classes.rectangle"),
	Circle = require("classes.circle"),
	Square = require("classes.square"),
}

local rectangle, square, circle

function love.load()
	love.graphics.setBackgroundColor(1, 1, 1, 0.8)

	rectangle = Shapes.Rectangle(128, 64)
	square = Shapes.Square(128)
	circle = Shapes.Circle(96)
end

function love.update(dt)
	--stop moving so we can click on them
	-- rectangle:update(dt)
	-- square:update(dt)
	-- circle:update(dt)
end

function love.draw()
	rectangle:draw()
	square:draw()
	circle:draw()
end

function love.mousepressed(mx, my, mb)
	rectangle:mousepressed(mx, my, mb)
	square:mousepressed(mx, my, mb)
	circle:mousepressed(mx, my, mb)
end

function love.keypressed(key)
	if key == "r" then
		love.event.quit("restart")
	end
end
```

Click inside the shapes, they should be highlighted/outlined.

Awesome?!

---

# Implementing Unclicking

> So how do we un-outline the same when we click on them again (unclicking mechanics)?

Very simple! Go to the `rectangle` and `circle` classes and modify:

```lua
--mousepressed() method
if is_clicked then
	self.is_clicked = not self.is_clicked --this
end
```

Basically it just flips the property when we clicked on it.

---

# Implementing Spawner

Now, we will go to the interesting part. It's time to create another class called `spawner`.

But what does the `spawner` class do? Basically, it just runs an internal timer, every time
we hit the max timer, we reset it to zero, and then spawn a shape. That's it!

So head over to the `classes/` directory and create a file there named `spawner.lua` and
code the following:
```lua
local class = require("modules.classic")
local Spawner = class:extend()

function Spawner:new(spawn_time, spawn)
	self.spawn_time = spawn_time
	self.spawn = spawn

	self.timer = 0
end

function Spawner:update(dt)
	self.timer = self.timer + dt

	if self.timer >= self.spawn_time then
		self.timer = 0
		self:spawn()
	end
end

return Spawner
```

Basically it is just an interface where we can put callbacks (spawn method) for each of
the shape classes.

Here's how we are going to use it:
```lua
local Shapes = {
	Rectangle = require("classes.rectangle"),
	Square = require("classes.square"),
	Circle = require("classes.circle"),
}

local Spawner = require("classes.spawner")

local rect = Shapes.Rectangle(64, 64)
local rectangle_spawner = Spawner(3, function()
	rect = Shapes.Rectangle(64, 64)
end)

local square = Shapes.Square(48)
local square_spawner = Spawner(3, function()
	square = Shapes.Square(48)
end)

local circle = Shapes.Circle(32)
local circle_spawner = Spawner(3, function()
	circle = Shapes.Circle(32)
end)

function love.load()
	love.graphics.setBackgroundColor(1, 1, 1, 0.8)
end

function love.update(dt)
	rectangle_spawner:update(dt)
	square_spawner:update(dt)
	circle_spawner:update(dt)
end

function love.draw()
	rect:draw()
	square:draw()
	circle:draw()
end
```

Now when you run this game, wait for every `3` seconds, and then the shape instances should
move to another place randomly!

---

# Implementing Containers

Ofcourse, we do not want to only have `3` instances, we also do not want to create a lot
of named variables and manually add them to the needed methods. To make everything dynamic,
we will implement containers for each shape using Lua tables.

Here's the `main.lua` file now:
```lua
local Shapes = {
	Rectangle = require("classes.rectangle"),
	Square = require("classes.square"),
	Circle = require("classes.circle"),
}

local shapes = {}

local Spawner = require("classes.spawner")

local rectangle_spawner = Spawner(3, function()
	local rectangle = Shapes.Rectangle(64, 64)

	table.insert(shapes, rectangle)
end)

local square_spawner = Spawner(3, function()
	local square = Shapes.Square(48)

	table.insert(shapes, square)
end)

local circle_spawner = Spawner(3, function()
	local circle = Shapes.Circle(32)

	table.insert(shapes, circle)
end)

function love.load()
	love.graphics.setBackgroundColor(1, 1, 1, 0.8)
end

function love.update(dt)
	rectangle_spawner:update(dt)
	square_spawner:update(dt)
	circle_spawner:update(dt)
end

function love.draw()
	for i, obj in ipairs(shapes) do
		obj:draw()
	end
end
```

As you can see, every 3 seconds, a rectangle, square, and circle shape instance will
appear. But the problem is, there is no way right now to limit or have constraints to
when should an instance be inserted to the container. So if you run the game for a very
long time, it should eat a lot of memory of your machine and thus at a certain time will
hang your machine.

> Can we implement containers for spawner instances?

Sure! That will save a lot of lines and give us more flexibility.

Here's how it should look now:
```lua
local Shapes = {
	Rectangle = require("classes.rectangle"),
	Square = require("classes.square"),
	Circle = require("classes.circle"),
}
local Spawner = require("classes.spawner")

local spawners = {}
local shapes = {}

local rectangle_spawner = Spawner(3, function()
	local rectangle = Shapes.Rectangle(64, 64)

	table.insert(shapes, rectangle)
end)

local square_spawner = Spawner(3, function()
	local square = Shapes.Square(48)

	table.insert(shapes, square)
end)

local circle_spawner = Spawner(3, function()
	local circle = Shapes.Circle(32)

	table.insert(shapes, circle)
end)

table.insert(spawners, rectangle_spawner)
table.insert(spawners, square_spawner)
table.insert(spawners, circle_spawner)

function love.load()
	love.graphics.setBackgroundColor(1, 1, 1, 0.8)
end

function love.update(dt)
	for i, spawner in ipairs(spawners) do
		spawner:update(dt)
	end
end

function love.draw()
	for i, obj in ipairs(shapes) do
		obj:draw()
	end
end

function love.keypressed(key)
	if key == "r" then
		love.event.quit("restart")
	end
end
```

For now it does not look clean, we will fix that soon when we have our gameplay logic
implemented by using states.

---

# Next Week's Post:

For the next post, we will continue to:
* implement destruction of shapes (scoring system)
* implement the UI classes and subclasses
* implement state classes and gameplay logic

So for next week we will do that as well.

---

Stay tuned via RSS or follow me on
<a href="https://twitter.com/{{site.author.twitter}}">Twitter</a>
