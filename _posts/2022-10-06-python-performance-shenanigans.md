---
title: "Python Performance Testing Shenanigans"
description: "testing out Python's performance for some cases"
date: 2022-10-06
tags: [python, work, test, performance, optimization]
---

> This post will get updated many times as to include more content

---

# Python In General

## 2 List Comprehensions vs Single-pass

* List comprehension is preferred most of the time as it performs much faster
  and efficient because the `append` instruction is not loaded in the stack
* In this particular case, perhaps single-pass iteration and building two lists
  from a large dataset will perform faster and better?


```python
import random, time

data = [random.randrange(100) for i in range(1000000)]
limit = 1000

def test1(): # 2 list comprehensions
    total = 0
    for _ in range(limit):
        start = time.perf_counter()
        _a = [i for i in data if i >= 50]
        _b = [i for i in data if i < 50]
        end = time.perf_counter()
        total += (end - start)
    print(f"Test 1. limit = {limit}. n = {total/limit}")

def test2(): # single-pass iteration
    total = 0
    for _ in range(limit):
        start = time.perf_counter()
        _a, _b = [], []
        for i in data:
            if i >= 50:
                _a.append(i)
            elif i < 50:
                _b.append(i)
        end = time.perf_counter()
        total += (end - start)
    print(f"Test 2. limit = {limit}. n = {total/limit}")
```

---

### Results

* Queryset data is 100,000
* NOTE: lower is better
* in testing this, the order of running the functions are randomized to avoid caching

| Test Run     | 2 List Comprehensions     | Singe-pass              |
|--------------|---------------------------|-------------------------|
| 1            | 0.18813625255553051       | 0.17321713546628598     |
| 2            | 0.17929821243864716       | 0.23278189841780114     |
| 3            | 0.1843499925005599        | 0.23758876197517384     |

---

## List + Set vs Dict - List Comprehension

```python
import time

limit = 10000

def test1(): # List + Set
    total = 0
    for _ in range(limit):
        start = time.perf_counter()
        ids = {category.id for tree in categories for category in tree}
        end = time.perf_counter()
        total += (end - start)
    print(f"Test 1. limit = {limit}. n = {total/limit}")

def test2(): # Dict
    total = 0
    for _ in range(limit):
        start = time.perf_counter()
        ids = list(set(category.id for tree in categories for category in tree))
        end = time.perf_counter()
        total += (end - start)
    print(f"Test 2. limit = {limit}. n = {total/limit}")
```

---

### Results

* NOTE: lower is better

| Test Run     | List + Set                   | Dict                    |
|--------------|------------------------------|-------------------------|
| 1            | 1.0207993909716605e-09       | 6.737012881785631e-10   |
| 2            | 1.6323989257216453e-09       | 1.0202988050878048e-09  |
| 3            | 1.5440979041159153e-09       | 9.007984772324562e-10   |

---

# Django specifics

## Complex ORM vs For-loop

* It is known that in ORMs, for-looping (which is to actually fetch data in the
  database) is to be avoided as much as possible especially with multiple data
* It is also known that creating complex logic with ORM can be tedious and difficult


```python
# For-loop
qs = Model.objects.filter() # some filters
l: List = []

for i in qs:
  # do some logic like append ID to `l`

qs = qs.filter(field__in=l) # final filter

# Complex ORM (maybe in this sample it's simple)
qs = (Model.objects
  .filter() # some filters
  .annotate(
    # some annotations
    # example of ORM logic
    a=Case(
        When(
            Q(id__in=a),
            then=Value(True)
        ),
        default=Value(False)
    ),
    b=Case(
        When(
            Q(id__in=b),
            then=Value(False)
        ),
        default=Value(True)
    ),
  )
  .exclude() # probably use the `a` annotation
  .filter() # probably use the `b` annotation
)
```

> I lost the actual test code :(

---

### Results

* Queryset data is 100,000
* Randomly distributed (to ensure no caching is done) samples of 5000 queries
  show the following results:

| Test Run     | For-Loop                   | ORM                     |
|--------------|----------------------------|-------------------------|
| 1            | 0.07486701965187677        | 0.06850977081921883     |
| 2            | 0.08062036872766912        | 0.07487364947465248     |
| 3            | 0.07310039575556293        | 0.0669569082101807      |
| 4            | 0.08089369648019783        | 0.07472086069546639     |


---


## Building Q vs Building List

* `Q` objects can be combined like with `|` and `&`
* The goal is to use the final list/Q to filter down the queryset
* In the `Building List` code, you may want to use list comprehension to make
  it faster, but in this case the context can be a much complex for-loop and
  logic that can't be done with list comprehension
* It's possible that the only reason the `Building List` performs worse in a
  minor way is due to the `append` instruction.
* It's faster for computers to do bitwise operation (I assume that this is what
  `Q` objects in Django does)

```python
# Building Q
q = Q()
for id in ids:
  # complex logic to determine whether to add or not the `id`
  q = q | Q(id=id)
qs.filter(q)

# vs

# Building List
ids: List = []
for id in some_list:
  # complex logic to determine whether to add or not the `id`
  ids.append(id)
qs.filter(id__in=ids)
```

---

### Results

* Queryset data is 100,000
* Testing shows (1000 samples) the following result (lower is better):

| Test Run     | Building List             | Building Q              |
|--------------|---------------------------|-------------------------|
| 1            | 0.0879093942514155        | 0.07333762165158987     |
| 2            | 0.0828009122532113        | 0.05329912134122331     |

---


## Aggregate vs For-Loop Increment

* This falls to the "for-loop-ing a queryset is bad" knowledge

```python
# Aggregate
total: int = qs.aggregate(Sum("count")).get("count__sum") or 0

# vs

# For-Loop Increment
total: int = 0
for count in qs:
    total += count
```

---

### Results:

* Queryset data is 100,000

| Test Run     | For-Loop Increment         | Aggregate              |
|--------------|----------------------------|------------------------|
| 1            | 4.2209844104945657e-07     | 0.000729216638370417   |
| 2            | 9.428325574845075e-07      | 0.007795811454532668   |


* As you can see, the for-loop is really slow

---

## For-Loop with Removal vs Filter

```python
import time
import random

count = 1000

def a():
    orig = [1000] * count
    total = 0

    for i in range(count):
        test = orig.copy()
        start = time.perf_counter()
        for t in test:
            if (i % 2) == 0:
                # NOTE: this is bad, do not remove element in a list while iterating
                # this is just for this test case
                test.pop(random.randint(0, len(test) - 1))
        end = time.perf_counter()
        total += (end - start)

    print(f"a: {total / count}")


def b():
    orig = [1000] * count
    total = 0

    for i in range(count):
        test = orig.copy()
        start = time.perf_counter()

        _ = filter(lambda x: (i % 2) == 0, test)

        end = time.perf_counter()
        total += (end - start)

    print(f"b: {total / count}")


# The order is also reversed at other runs to avoid caching.
a()
b()
```

---

### Results:

| Test Run     | For-Loop with Removal     | Filter                  |
|--------------|---------------------------|-------------------------|
| 1            | 0.00023961162311024963    | 2.1601941552944483e-06  |
| 2            | 0.00022506073210388423    | 2.134903275873512e-06   |
| 3            | 0.00023982634584535846    | 2.482539915945381e-06   |
| 4            | 0.0002623469726240728     | 1.2303730705752969e-05  |
| 5            | 0.00022321201750310138    | 2.569707517977804e-06   |
