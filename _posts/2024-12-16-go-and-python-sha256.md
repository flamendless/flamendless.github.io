---
title: "Go and Python SHA-256 Challenges and Learnings"
description: "How to make Go's and Python's sha256 pass the assertion"
date: 2024-12-16
tags: [go, golang, python, sha256]
---

# Background

One of the mundane work we developers do is integrating a service into another one, seamlessly preferred.

If it is a third-party service with lacking or obscure documentation then you are in for a treat.

Fortunately, both services are written and maintained by me so I can easily integrate, test, and debug it.

I won't go into much details about the services but let's just call them `A` and `B` for the sake of simplicity.

As usual, when we write services we also provide an interface like an API (REST) and then we add layers into it especially one for security.

For these services, I went with the `hash signature` route since it is easier to do as well as provides good security.

---

Enter `sha256` which is undoubtedly more secure than typical `MD5` or plain `base64` encoding.

I won't go into too much details of course since that will defeat the purpose of security quite a bit so let's just jump straight into the intricacies of making service `A` (written in Python) produce the expected signature of service `B` (written in Go).

In Go, I have this simplified functionality (added comments for short explanations)
```go

func GetSignature(secret string, vals ...string) string {
	//Create a buffer
	buf := bytes.NewBuffer(make([]byte, 0, 128))

	//Write the values into the buffer
	for _, val := range vals {
		buf.WriteString(val)
	}

	//Create sha256
	h := sha256.New()

	//Write the buffer into the sha256 struct
	if _, err := h.Write(buf.Bytes()); err != nil {
		logger.Log().Error("GetSignature", zap.Error(err))
		return ""
	}

	//use base64 to produce url-safe encoding of the resulting hash + secret
	hashed := base64.URLEncoding.EncodeToString(h.Sum([]byte(secret)))
	return hashed
}

```

Here's the Python one (not working yet for the sake of coherence for this post):

```python
def get_signature(secret: str, vals: str) -> str:
	h = sha256()
	h.update(vals.encode())
	enc: bytes = urlsafe_b64encode(h.digest())
	return enc.decode(enc)
```

The Python code obviously does not work because the `secret` key is not even used. Looking at the `sha256` module, there is no equivalent of Go's `Sum` function.

Most `sha256` resources online show `h.Sum(nil)` usage but I decided to go for passing `[]byte(secret)`.

so I added `h.update(secret.encode())` after `h.update(vals.encode())` but to no avail.

I won't show the details but I inspected the bytes (in decimals) in both the Go and Python version and found out that everything is equal when `secret` is not in the equation.

So it is time to read what `Sum` really does.

The tricky part here was understanding the `Sum` function.

The key sentence of `Sum` functionality is `Sum appends the current hash to b and returns the resulting slice` so basically `[]byte(secret) + current hash state`

So here is the Python code after that incomplete understanding:

```python
	h = sha256()
	h.update(secret.encode())
	h.update(vals.encode())
	enc: bytes = urlsafe_b64encode(h.digest())
	return enc.decode(enc)
```

But it still yielded a different result. So I tried trying other `encoding` like `ascii`, `utf-16`, and so on.

So when dealing with such data, I decided I need to actually inspect the byte array (in numbers) of what is happening. I tried Python's `encode` and `bytearray(x)` functions but they just print the string version...

Eventually I found about `memoryview(input_str.encode()).tolist()` of the hash state. Why Python made that part harder or with simpler module/function beats me, oh well.

There was something off with the bytes... Time for matrix in the brain moment:

```python
	h = sha256()
	h.update(vals.encode())

	h2 = sha256()
	h2.update(secret.encode())
	h2.update(h.digest())

	enc: bytes = urlsafe_b64encode(h2.digest())
	return enc.decode(enc)
```

Still incorrect but my low-level programmer brain senses that I am so close...

The key phrase (uppercased) in `Sum` documentation is `appends the CURRENT HASH to B (BYTES) and returns the resulting slice` which means that `secret` is not supposed to be hashed by `sha256`.


```python
	h = sha256()
	h.update(vals.encode())

	b = bytearray()
	b.extend(secret.encode())
	b.extend(h.digest())

	enc: bytes = urlsafe_b64encode(h.digest())
	return enc.decode(enc)
```

There you go!

---

***Soli Deo Gloria***
