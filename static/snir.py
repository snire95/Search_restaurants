import collections

def finder(arr1, arr2):
    d = collections.defaultdict(int)
    print(d)
    for num in arr2:
        d[num] += 1
    for num in arr1:
        if d[num] == 0:
            return num
        else:
            d[num] -= 1 


arr1 = [5,5,7,7]
arr2 = [5,7,7]

print(finder(arr1,arr2))
