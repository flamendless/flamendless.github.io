---
title: "Game Development Blog #3 : Asset Bundling"
description: "experimenting with asset bundling"
date: 2019-08-01
tags: [gamedev, tutorial]
---

# BACKGROUND

There are three things you need to know about me in relevance and in context for this topic:

1. I am a self-taught programmer. I dived in the programming world without any formal education or knowledge in regards to game development and programming.
2. I really love the HandMade Hero series. I have learned so much from it than from my years (currently still) in university.
3. I hate Java. (Yes, this is out of context actually)

---

With those said, here is the event that transpired. I am currently developing my next big game, but of course I am still in the part of making my own personal engine/framework for it. I am now in the part of doing an asset management system and asynchronous asset loading system, it is working quite perfectly for my needs and I dare say that its API is really good. I planned on abstracting it a little more so that I can turn it into a library as a contribution to the löve community.

Then I happened to see a [HandMade Hero video](https://www.youtube.com/watch?v=CNTlpoYdKF8) in YouTube's home screen. After watching that, I watched the some of the vides in the [Asset Pipeline playlist](https://www.youtube.com/watch?v=USFTH9mcaKw&list=PLEMXAbCVnmY6JVkAI8elXUJ-83HY706AQ). It is really interesting. Bundling all of your assets, images and sounds, to a single binary file is a challenge first and a wonderful achievement second.

But since HandMade Hero is basically from scratch, I did a little bit of research. I have not found any article on how the whole thing works. I just know that I need to get to do the following:

* Make a new file
* Put a "magic number"
* Put some header details like tags and info
* Put the offset (pointer to the asset's data) and the size of the data
* Put the data of the assets

Now, all of the steps above seems easy, but remember that we are dealing with binary and bytes. If you look at the code Casey is writing, there are a lot of things confusing and difficult to understand. But since I am overly excited and challenged to write my own "asset bundler" in Lua and Löve, nothing can stop me!

---

# START OF THE QUEST

First of all, I need to learn how to deal with bytes in Lua. I have found these links as a guide using [normal Lua io library](https://stackoverflow.com/questions/16506683/in-lua-how-should-i-read-a-file-into-an-array-of-bytes) and [using Lua FFI to handle larger files](https://stackoverflow.com/a/36266405/9154990).

Second, I need to learn how to parse the PNG. Extract the PNG header and its actual data. I have found this [simple guide](http://lua-users.org/wiki/PortableNetworkGraphicsParser) about it.

There is a problem with the second step, gladly it does because that made me ask over the löve discord server about some typo about the modulo operation with the guide.

So one of the veterans there [@AuahDark](https://t.co/fEAptrrwAP) (the author behind the asynchronous asset loading library I use) pointed out that I could just write to a file the loaded image data so that saves me from dealing with parsing the PNG all in all.

With a long talk over the support channel and with new knowledge about the [love.data api](https://love2d.org/wiki/love.data), I am now able to make a simple (for now) asset bundler written in Lua with Löve.

---

I am going to share to you two methods on how to do it.

It is a good thing to familiarize yourself with the Lua and Löve API first.

* [File](https://love2d.org/wiki/File)
* [ImageData](https://love2d.org/wiki/ImageData)
* [FileData](https://love2d.org/wiki/FileData)
* [love.image.newImageData](https://love2d.org/wiki/love.image.newImageData)
* [love.graphics.newImage](https://love2d.org/wiki/love.graphics.newImage)
* [love.filesystem.newFile](https://love2d.org/wiki/love.filesystem.newFile)
* [love.filesystem.read](https://love2d.org/wiki/love.filesystem.read)
* [love.data.pack](https://love2d.org/wiki/love.data.pack)
* [love.data.unpack](https://love2d.org/wiki/love.data.unpack)
* [love.data.newDataView](https://love2d.org/wiki/love.data.newDataView)
* [string.pack format specifier](https://www.lua.org/manual/5.3/manual.html#6.4.2)

---

# Method I: ImageData -> Packed File

## I.a WRITING

1. Load an ImageData using
```lua
local imagedata = love.image.newImageData("path-to-image.png")
```
2. Get all the necessary details like `format`, `width`, `height`, and so on.
3. Create a new File in write mode with
```lua
local file = love.filesystem.newFile("filename", "w")
```
4. Pack data to be stored in the header:
```lua
local data_dimensions = love.data.pack("data", "<I4I4", imagedata:getDimensions())
local data_format = love.data.pack("data", "<s4", imagedata:getFormat())
--and more
```

(Disclaimer: I am not that much knowledgable about the Lua 5.3 string.pack format specifier)
The `"<I4I4"` means `set to little endian` + `unsigned integer with 4 bytes`
The `"<s4"` means `set to little endian` + `string length coded as an unsigned integer with 4 bytes`

5. Write the packed data to the file.
```lua
file:write(data_dimensions)
file:write(data_format)
```

6. Finally, write the ImageData itself to the file.
```lua
file:write(imagedata)
```

---

## I.b READING

1. Read the pack file and store it as a FileData with
```lua
local packfile = love.filesystem.newFileData("filename")
```
2. Get the header strings we stored earlier (format and dimensions).
```lua
local width, height, index = love.data.unpack("<I4I4", packfile)
local format, index2 = love.data.unpack("<s4", packfile, index)
```
3. Create a Data view with
```lua
local view = love.data.newDataView(packfile, index2 - 1, packfile:getSize() - index2 + 1)
```
(To validate that we got the proper result, check with
	```lua
	print(view:getSize(), width * height * 4)
	```
they should be the same value.)
4. Create an ImageData with
```lua
local imagedata = love.image.newImageData(width, height, format, view)
```
5. Create a Drawable Image with
```lua
local image = love.graphics.newImage(imagedata)
```
Now you can use this for displaying in the screen.

---

Let us now go with Method II.

# Method II: Image File -> Packed File

## II.a WRITING

1. Read the image file (as a whole) and store it as a data with
```lua
local data = love.filesystem.read("data", "path-to-image.png")
```
2. Create a File with write mode with
```lua
local file = love.filesystem.newFile("filename", "w")
```
3. Pack the header tags you want.
```lua
local data_name = love.data.pack("data", "<s4", "Brandon B. Lim-it")
local data_kind = love.data.pack("data", "<s4", "png")
local data_path = love.data.pack("data", "<s4", "assets/images/foo.png")
```
4. Write the packed data to the file.
```lua
file:write(data_name)
file:write(data_kind)
file:write(data_path)
```
(To validate, please open the "packfile" using a binary/hex viewer. For Linux users, you can use the `xxd -l 90 path-to-packfile` (90 is to only show the first few lines of the file). You should see the string `Brandon B. Lim-it`, `png`, `assets/images/foo.png` in it.)
5. Write the Image to the file with
```lua
file:write(data)
```

---

## II.b READING

1. Read the pack file and store it as a FileData with
```lua
local packfile = love.filesystem.newFileData("filename")
```
2. Get the header strings we stored.
```lua
local str_author, index = love.data.unpack("<s4", packfile)
local str_kind, index2 = love.data.unpack("<s4", packfile, index)
local str_path, index3 = love.data.unpack("<s4", packfile, index2)
```
3. Create a Data view with
```lua
local view = love.data.newDataView(packfile, index3 - 1, packfile:getSize() - index3 + 1)
```
4. Create the ImageData from the Data view with
```lua
local imagedata = love.image.newImageData(view)
```
5. Get the dimensions of the ImageData with
```lua
local width, height = imagedata:getDimensions()
```
6. Create a Drawable image with
```lua
local image = love.graphics.newImage(imagedata)`
```

---

Löve is really amazing, it has easily allow us to do complicated stuff with just few lines of code.

You may check the file saved in the save directory. Please see [love.filesystem.getSaveDirectory](https://love2d.org/wiki/love.filesystem.getSaveDirectory) for info on where to find it.

---

# Comparison

The problem with Method I is that we have to store data like dimensions and format and so on which could be tedious.

The problem with Method II is that we store the whole data of the file which results in bigger file size.

(I will add more as soon as I find more)

---

# Conclusion

Here is a snippet of using Method II (which I prefer). It includes some functions for ease.
```lua
--main.lua

local img

local function pack(file, format, str)
	assert(file:type() == "File", "arg1 must be a File")
	assert(type(format) == "string", "arg2 must be a string")
	assert(type(str) == "string", "arg3 must be a string")
	local data = love.data.pack("data", format, str)
	local res, err = file:write(data)
	if not res then
		error(err)
	end
end

local function pack_table(file, t)
	assert(file:type() == "File", "arg1 must be a File")
	assert(type(t) == "table", "arg2 must be a table")
	local n = 0
	for i = 1, #t do
		local format = t[i][1]
		local str = t[i][2]
		pack(file, format, str)
		n = n + 1
	end
	return n
end

local function get_headers(packdata, count, format)
	assert(packdata:type() == "FileData", "arg1 must be a FileData")
	assert(type(count) == "number", "arg2 must be a number")
	assert(type(format) == "string", "arg3 must be a string")
	local t = {}
	local prev
	for i = 1, count do
		local str, index = love.data.unpack("<s4", packdata, prev)
		t[i] = str
		prev = index
	end
	return t, prev
end

local function do_pack()
	local path = "avatar.png"

	-- WRITING
	local data = love.filesystem.read("data", path)
	local filename = "pack2"
	if love.filesystem.getInfo(filename) then
		love.filesystem.remove(filename)
	end

	local file = love.filesystem.newFile(filename, "w")

	-- Can pack individually
	-- pack(file, "<s4", "brbl")
	-- pack(file, "<s4", "png")
	-- pack(file, "<s4", path)

	-- Or use a table for ease?
	local t = {
		{ "<s4", "brbl" },
		{ "<s4", "png" },
		{ "<s4", path },
	}
	local n = pack_table(file, t)
	file:write(data)

	-- READING
	local packdata = love.filesystem.newFileData(filename)
	local headers, last = get_headers(packdata, n or 3, "<s4")

	print("Headers: " .. table.concat(headers, ", "))
	print("Last Index: " .. last)

	local view = love.data.newDataView(packdata, last - 1, packdata:getSize() - last + 1)

	local imgdata = love.image.newImageData(view)
	local w, h = imgdata:getDimensions()
	img = love.graphics.newImage(imgdata)
end

do_pack()

function love.draw()
	love.graphics.draw(img, 32, 32)
end

-- Since this main.lua file is in a folder called "temp"
-- xxd -l 90 ~/.local/share/love/temp/pack2
-- test with "love ."
```

# FUTURE

Right now this method works for a single file. Stay tuned as I test now with packing multiple PNG files to a single file.

Plans:
* As a separate library.
* As a program with GUI (drag-drop files, customize the header tags, etc)

If you have questions, follow me [@flamendless](https://twitter.com/flamendless) and message me.
