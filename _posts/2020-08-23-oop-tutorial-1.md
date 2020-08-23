---
title: "A Simple OOP Game Tutorial #1"
description: "making a simple game with OOP approach"
date: 2020-08-23
tags: [gamedev, personal, love, lua, ecs, oop, versus, tutorial]
---

> WELCOME TO THE 2ND INSTALLMENT OF ECS VS. OOP WEEKLY SERIES!

Before proceeding, if you have not read the [previous post](https://flamendless.github.io/ecs-vs-oop/),
please check that first, this post will wait for you. You will
need the information and guide provided in the previous post
for this one.

Done? Good! You may now resume your quest!

---

# DISCLAIMER

This post will not try to teach Lua coding or any programming logic. This is to focus
primarily in OOP design and pattern.

If you want to learn basic programming and game development, let me know. I will make
an in-depth guide about it for beginners if requested.

---

# INTRODUCTION

> Why OOP first? Why not straightway go to ECS?

Most of you probably has already learned or has even a vague idea and understanding with the
OOP paradigm as it is universally taught to beginners for reasons I dare not to mention for now,
and without a single idea that it is possible to even program in a non-OOP way,
in which case ECS would be a difficult topic to start with. My approach, be it
unconventional, is to remind you dear readers the concept of OOP as clear as I possibly could
by going back to the fundamentals and basics of OOP, and then applying such lessons
in making a simple game.

And as you are reminded, we will go into details the limitations and problems that the OOP
paradigm give us.

To be fair, I will not mention or make gesture regarding ECS like ***"Oh, ECS could easily do this and that"***.

> So what are we going to make?

I was thinking and looking around for a very simple and known game that could be done in
a single post that will showcase the "benefits" of OOP that will also be fitting for an
ECS approach. `Pong` would in this case be too simple for our goal, so I have decided to
make a not-too-simple yet with an interesting mechanic worthy of the time we will spend
on it.

The game would be called `Shape Clicker`, it has the following mechanics:
* Random primitive shapes will randomly spawn (circle, square, rectangle)
* Each have random color (red, green, blue)
* Each have random size
* Each will move randomly (like a floating asteroid)
* Each that will pass the screen border will be destroyed and will deduct on score
* Each is clickable:
	* highlight the shape when clicked
* Player must click on two objects
* The two clicked objects will be destroyed (a goal) if:
	* the two objects are of the same color (increase timer + 2)
	* the two objects are of the same shape (increase timer + 4)
	* the two objects are of the same shape and same color (increase timer + 8)
* Timer based game (game over if timer reaches 0)
* Score based (each goal met will increase the score)
* Play button to start the game
* Quit button to stop the game

---

# Planning

First thing we need to do of course is to `plan`, this phase is very important in OOP
because we need to have a clear knowledge about the model or structure we are going
to pursue. If there is a mistake in the plan, the implementation is affected as well.

So let us begin the planning by making a model or structure of the classes we need. How
do we know what `class` to make? Well, we need to know what `objects` do we need to make
following the mechanics of the game we discussed earlier.

### Objects:
* Red Rectangle shape
* Green Rectangle shape
* Blue Rectangle shape
* Red Square shape
* Green Square shape
* Blue Square shape
* Red Circle shape
* Green Circle shape
* Blue Circle shape
* Score UI
* Timer UI
* Play UI
* Quit UI

Next, we need to look into each of those and find what are common and of the same nature:

Here is the first abstraction:
* Red, Green, and Blue Rectangle Shape can be just `Rectangle Shape` + `color`
* Red, Green, and Blue Square Shape can be just `Square Shape` + `color`
* Red, Green, and Blue Circle Shape can be just `Circle Shape` + `color`
* Score UI and Timer UI can be just `UI` + `text`
* Play UI and Quit UI can be just `UI` + `button`

After the first abstraction, we now have the following classes:

### Classes (first abstraction):
* Rectangle shape
* Square shape
* Circle shape
* UI

If we are still going to look deeper, we can see that `Rectangle shape`, `Square shape`,
and `Circle shape` are all a subclass of `shape`. So now the classes that we need are:

### Classes (final):
* Shape
* UI

See? Planning trims down the things we need to do.

---

What else do we need as part of the plan? After determining the classes we need, we now
need to determine the subclasses or the classes that will inherit from the base class.

### Classes + Subclasses:
* Shape
	* Rectangle
	* Square
	* Circle
* UI
	* Text
	* Button

I am confident that those are the only classes and subclasses that we need. Now let us
next plan and determine the behaviors or properties of each class:

We need to determine what are the variables/properties that are most common to the class
and to its subclass(es).

### Properties:
* Shape - position, color, velocity/speed, direction, is clicked
	* Rectangle - width, height
	* Square - size
	* Circle - radius
* UI - position
	* Text - text, color
	* Button - text, size, on_click event

### Behaviors:
* Shape:
	* on creation - setup random color, position, velocity, direction
	* on click/mousepressed - show feedback
	* on destroy - destroy and remove from the game
	* moving/update - moving/floating around the screen
	* check out of bounds - check if shape is out of screen bounds
	* drawing - rendering the shape on screen
* UI:
	* on click/mousepressed - do event when clicked
	* drawing - rendering the ui on screen 

---

> Hey, we do not need those shape subclasses, we can just pass
> a size argument and let each instance handle the parameters and so on. 

Yes, that is also possible, but again, we are doing this in the most basic approach as
a beginner would think. There is nothing wrong with the method proposed but that will
involve dealing with `method overriding` which will add complexity. For advanced OOP,
yeah sure go with that.

> Square should be the same with Rectangle since the only difference is the size

Yes, that is true. Square is basically a Rectangle but with the same width and height or
vice versa. Look further down because you will see this implemented.

---

# Preparation

Let us now start by creating the files we need and properly organizing them:

* create the following files in the `game_oop/`:
	* `main.lua`
	* `conf.lua`
* create the following files in the `game_oop/classes/base/`:
	* `shape.lua`
	* `ui.lua`
* create the following files in the `game_oop/classes/`:
	* `rectangle.lua`
	* `square.lua`
	* `circle.lua`
	* `button.lua`
	* `text.lua`

Let us now open and edit first the `conf.lua` file using your preferred text editor:
(do not forget that you are free to change values, you do not have to follow blindly)
```lua
--conf.lua
function love.conf(t)
	t.window.title = "Shape Clicker OOP"
	t.window.width = 800
	t.window.height = 640
end
```

Now run the game, you should see the game window with the title `Shape Clicker OOP` and
with dimensions of `800x640`, you can play around those values if you wish to.

Open now `main.lua`:
```lua
--main.lua
function love.load()
	love.graphics.setBackgroundColor(1, 1, 1, 0.8)
end

function love.update(dt)
end

function love.draw()
end
```

Run the game again and instead of seeing a black-filled window, you should see it filled
with the white color with a little bit of transparency.

---

For now let us focus on the `Shape` class and its subclasses.

Now open `game_oop/classes/base/shape.lua`:
```lua
local class = require("modules.classic")
local Shape = class:extend()

local colors = {
	{1, 0, 0}, --red
	{0, 1, 0}, --green
	{0, 0, 1}, --blue
}

local function generate_random_color()
	local r = love.math.random(1, #colors)
	local color = colors[r]

	return {unpack(color)}
end

function Shape:new()
	local w, h = love.graphics.getDimensions()

	self.x = love.math.random(96, w - 96)
	self.y = love.math.random(96, h - 96)

 	--thanks @slime!
	self.direction = love.math.random() > 0.5 and 1 or -1

	self.speed = love.math.random(64, 320)
	self.color = generate_random_color()
	self.is_clicked = false
end

function Shape:move(dt)
	--moving
	local dx = self.x + self.speed * self.direction * dt
	local dy = self.y + self.speed * self.direction * dt

	self.x = dx
	self.y = dy
end

return Shape
```

---

Now open `game_oop/classes/rectangle.lua`:
```lua
local Shape = require("classes.base.shape")
local Rectangle = Shape:extend()

function Rectangle:new(width, height)
	Rectangle.super.new(self)
	self.width = width
	self.height = height
end

function Rectangle:update(dt)
	Rectangle.super.move(self, dt)

	--check out of bounds
	local oob_left = self.x + self.width < 0 --left edge
	local oob_right = self.x > love.graphics.getWidth() --right edge
	local oob_top = self.y + self.height < 0 --top edge
	local oob_bottom = self.y > love.graphics.getHeight() --bottom edge
end

function Rectangle:mousepressed(mx, my, mb)
	if not (mb == 1) then return end

	local is_clicked = mx >= self.x and mx <= self.x + self.width and
		my >= self.y and my <= self.y + self.height

	if is_clicked then
		self.is_clicked = true
	end
end

function Rectangle:draw()
	love.graphics.setColor(self.color)
	love.graphics.rectangle("fill", self.x, self.y, self.width, self.height)
end

return Rectangle
```

---

Now open `game_oop/classes/square.lua`:
```lua
local Shape = require("classes.rectangle")
local Square = Shape:extend()

function Square:new(size)
	Square.super.new(self, size size)
end

function Square:update(dt)
	Square.super.move(self, dt)
end

function Square:mousepressed(mx, my, mb)
	Square.super.mousepressed(self, mx, my, mb)
end

function Square:draw()
	Square.super.draw(self)
end

return Square
```

See? we subclass from `Rectangle` because logically, they can be implementd the same. Why we separate them? for the sake of mechanics and adding variations to the game.

---

Now open `game_oop/classes/rectangle.lua`:
```lua
local Shape = require("classes.base.shape")
local Circle = Shape:extend()

function Circle:new(radius)
	Circle.super.new(self)
	self.radius = radius
end

function Circle:update(dt)
	Circle.super.move(self, dt)

	--check out of bounds
	local oob_left = self.x + self.radius < 0 --left edge
	local oob_right = self.x > love.graphics.getWidth() --right edge
	local oob_top = self.y + self.radius < 0 --top edge
	local oob_bottom = self.y > love.graphics.getHeight() --bottom edge
end

function Circle:mousepressed(mx, my, mb)
	if not (mb == 1) then return end

	local is_clicked = mx >= self.x and mx <= self.x + self.radius and
		my >= self.y and my <= self.y + self.radius

	if is_clicked then
		self.is_clicked = true
	end
end

function Circle:draw()
	love.graphics.setColor(self.color)
	love.graphics.circle("fill", self.x, self.y, self.radius, self.radius)
end

return Rectangle
```

---

# Points to Ponder:

1. Each class/subclass has logic inside them
2. There is a lot of abstraction going on
3. Refactoring/Moving around functions/methods -
for example, we realized that we can abstract some methods to the parent class,
so we move the subclass' method to the parent class and modify a lot of
properties to make sure that the data needed stays within the proper scope
4. An error or miscalculation during the planning phase will lead to changes that are
more than the minimum needs.
5. You have to track the inheritance chain - this could lead to something like:
	* who is the parent class of this instance/object
	* who is the parent parent class of this instance/object
	* who has this property? The parent or the child?
6. As you go down deeper the inheritance chain, the complexity increases
7. You have to think in terms of objects and such instead of focusing on the data and processes

---

This is it for this week!

---

# Next Week's Post:

For the next post, we will continue to:
* improve the shape class by implementing the highlighting of shape when clicked
* implement the UI classes and subclasses
* possible start implementing game logic like timer, spawning of random shapes, etc.

Another thing is that we can clearly that there are even common logics happening between the
`Rectangle/Square` and `Circle` classes like the `checking for out of bounds`
and the determining whether a point is inside the shape in `mousepressed`,
those can be abstracted to the base `Shape` class if you want.

So for next week we will do that as well.

---

Stay tuned via RSS or follow me on
<a href="https://twitter.com/{{site.author.twitter}}">Twitter</a>
