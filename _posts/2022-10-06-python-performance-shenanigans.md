---
title: "Python Performance Testing Shenanigans"
description: "testing out Python's performance for some cases"
date: 2022-10-06
tags: [python, work, test, performance, optimization]
---

# 2 List Comprehensions vs Single-pass

* List comprehension is preferred most of the time as it performs much faster
  and efficient because the `append` instruction is not loaded in the stack

* In this particular case, perhaps single-pass iteration and building two lists
  from a large dataset will perform faster and better?


```python
import random, time

data = [random.randrange(100) for i in range(1000000)]
limit = 1000

def test1(): # 2 list comprehensions
    sum = 0
    for _ in range(limit):
        start = time.perf_counter()
        _a = [i for i in data if i >= 50]
        _b = [i for i in data if i < 50]
        end = time.perf_counter()
        sum += (end - start)
    print(f"Test 1. limit = {limit}. n = {sum/limit}")

def test2(): # single-pass iteration
    sum = 0
    for _ in range(limit):
        start = time.perf_counter()
        _a, _b = [], []
        for i in data:
            if i >= 50:
                _a.append(i)
            elif i < 50:
                _b.append(i)
        end = time.perf_counter()
        sum += (end - start)
    print(f"Test 2. limit = {limit}. n = {sum/limit}")
```

---

## Results

* NOTE: lower is better
* in testing this, the order of running the functions are randomized to avoid caching

| Test Run     | 2 List Comprehensions     | Singe-pass              |
|--------------|---------------------------|-------------------------|
| 1            | 0.18813625255553051       | 0.17321713546628598     |
| 2            | 0.17929821243864716       | 0.23278189841780114     |
| 3            | 0.1843499925005599        | 0.23758876197517384     |

---
